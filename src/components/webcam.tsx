import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import CustomButton from './customButton';

// Webカメラの設定（解像度やカメラの向き）
const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

// 描画フレームのサイズ
const frameSize = {
  width: 720,
  height: 360,
};

export const WebCam_Window = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const saveCanvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImage, setProcessedImage] = useState<string>("");
    const [isCaptureFinished, setIsCaptureFinished] = useState<boolean>(false);

  function getCanvasBlob(canvas: HTMLCanvasElement) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  }
  
  const uploadImage = async (canvas: HTMLCanvasElement) => {
    const blob = await getCanvasBlob(canvas);
    const formData = new FormData();
    formData.append("data", blob as File, "canvas.png");
    try {
      const response = await fetch("http://localhost:8000", {
        method: "POST",
        body: formData,
      });

      // response.okはレスポンスが成功したかどうかを示すブール値
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.blob();
      // 処理された画像を状態に反映
      // setProcessedImage(data);
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Webcamの毎フレームに対してバックエンド処理を行う関数
  const reqIdRef = useRef<number>(0); // 無限ループを止めるcancelAnimationFrameのためのrequestID
  // async()はコードの中で後回しにしていいよ（画像処理とか重いやつ）の明示
  // async()の理由がawaitのところの処理
  // await以降の処理はawaitのところが終わってから
  const processFrame = async () => {
    if (webcamRef.current && canvasRef.current) {
      // const webcam = webcamRef.current.video as HTMLVideoElement;
      const webcamCanvas = webcamRef.current.getCanvas();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d"); //ctxを用いて描画コンテキストにアクセス可能

      if (ctx && webcamCanvas) {
        // 仮想的に0．5秒待機する（これをコメントアウトすればスムーズに動く）
        // await new Promise((resolve) => setTimeout(resolve, 100));
        try {
          const result = await uploadImage(webcamCanvas as HTMLCanvasElement);
          // 画像処理後の画像をcanvasに描画
          const img = new Image();
          img.src = URL.createObjectURL(new Blob([result]));
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
          //resultは画像処理後の画像．これをcanvasに描画
        } catch (error) {
          console.error("Error during image upload:", error);
        }
      } else {
        console.log("Browser does not support canvas");
      }
    }
    // requestAnimationFrameは次の再描画が行われる直前にコールバック関数（引数として渡された関数）を呼ぶ
    // 次のフレームの描画を予約
    reqIdRef.current = requestAnimationFrame(processFrame);
  };

  useEffect(() => {
    if (isCaptureEnable) {
      console.log("processFrame Changing..."); // "processFrame Changing..."をコンソールに表示

      requestAnimationFrame(processFrame);
      // ページ遷移などコンポーネントが破棄されたときにループを止めなければならない
      // useEffectのreturnはそういう時にクリーンアップ関数として一度関数を呼ぶので、ループを止める関数をreturnに渡しておく
      return () => cancelAnimationFrame(reqIdRef.current);
    }
  }, [isCaptureEnable]);


  // 撮影止めたとき
  const stopCapture = () => {
    setCaptureEnable(false);
    setIsCaptureFinished(true)
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >

      {isCaptureFinished || isCaptureEnable || (
        <>
          <Text fontSize='4xl'>準備OK？？</Text>
          <CustomButton
            width="450px"
            height="65px"
            fontSize="30px"
            padding="1.5rem"
            buttonColor="#F6F9F4" // ボタンの背景色
            textColor="#7648ec" // 文字の色
            iconSize="20px" // アイコンのサイズ
            onClick={() => setCaptureEnable(true)}
          >
            撮影開始～！
          </CustomButton>
        </>
      )}
      {isCaptureEnable && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Webcam //以下は全部Webcamコンポーネントに渡されるprops
              audio={false}
              width={frameSize.width}
              height={frameSize.height}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            {/* <img // URLではなくデータURIで直接画像を埋め込む。`${変数}`はJavaScriptのテンプレートリテラルで変数を埋め込める
              src={`data:image/jpeg;base64,${processedImage}`} alt="Processed Image" 
            /> */}
            <canvas
              ref={canvasRef}
              width={frameSize.width}
              height={frameSize.height}
            />
          </div>
          <div>
            <CustomButton
              width="450px"
              height="65px"
              fontSize="30px"
              padding="1.5rem"
              buttonColor="#F6F9F4" // ボタンの背景色
              textColor="#7648ec" // 文字の色
              iconSize="20px" // アイコンのサイズ
              onClick={stopCapture}
            >
              撮影終了～！
            </CustomButton>
          </div>
        </>
      )}
      {isCaptureFinished &&(
        <CustomButton
          to="/result-screen"
          width="450px"
          height="75px"
          fontSize="40px"
          padding="1.5rem"
          buttonColor="#F6F9F4" // ボタンの背景色
          textColor="#7648ec" // 文字の色
          iconSize="30px" // アイコンのサイズ
        >
          診断結果は～？
        </CustomButton>
      )}
    </div>
  );
};
