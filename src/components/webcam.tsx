import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Text } from '@chakra-ui/react'
import { Flex, Box } from "@chakra-ui/react";
import CustomButton from './customButton';
import { usePoseImages } from '../app/contexts/poseImagesContext';
import { useCurrentPoseName } from '../app/contexts/currentPoseNameContext';
import { useSimilarityScore } from "@/app/contexts/similarityScoreContext";

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

// 類似度計算の配列
const similarityScoreList: number[] = [];

export const WebCam_Window = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const saveCanvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImage, setProcessedImage] = useState<string>("");
  const [isCaptureFinished, setIsCaptureFinished] = useState<boolean>(false);
  // 類似度を示す状態
  const { setSimilarityScore } = useSimilarityScore();

  // 正解画像のCanvasを作る
  // // ポーズ名と画像のURLの配列をposeImagesContext.tsxから取得する
  const poseImages = usePoseImages();
  // // ルーレットで当たったポーズをcurrentPoseName.tsxから取得する
  const { currentPoseName } = useCurrentPoseName();
  // // ポーズ名に一致する要素を探す
  const currentPoseImage = poseImages.find((item) => item.name === currentPoseName)
  // // 正解画像のCanvas
  const correctCanvasRef = useRef<HTMLCanvasElement>(null);
  const correctCanvas = correctCanvasRef.current;
  // // 画像をロードしてCanvasに描画する関数
  function loadImageToCanvas(imageUrl: string, canvas: HTMLCanvasElement) {
      const ctx= canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = imageUrl;
        console.log(img.src);
        img.onload = () => {
            ctx.save();
            ctx.scale(-1, 1); // 水平方向に反転
            ctx.drawImage(img, 0, 0, -canvas.width, canvas.height);
            ctx.restore();
        };
    } 
  }
  // // 画像URLとCanvas要素を渡して関数を呼び出す
  if (currentPoseImage){
    const imageUrl = currentPoseImage.imageSrc;
    if (imageUrl && correctCanvas) {
      loadImageToCanvas(imageUrl, correctCanvas);
    }
  } 
  

  // Blobはバイナリデータを表現するためのオブジェクトで、通常画像や動画などのメディアデータを表現
  function getCanvasBlob(canvas: HTMLCanvasElement) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  }
  
  // webcamの取得画像のcanvasと正解画像のcorrectCanvasをバックエンドに渡し、処理画像と類似度の値を得る
  const uploadImage = async (canvas: HTMLCanvasElement, correctCanvas: HTMLCanvasElement) => {
    const blob = await getCanvasBlob(canvas);
    const correctBlob = await getCanvasBlob(correctCanvas);
    // FormDataは、フォームデータをキー/値のペアとしてエンコードするためのオブジェクトで、HTTPリクエストで送信する際に使用
    const formData = new FormData();
    // 第一引数にはキーを指定し、第二引数には追加する値、第三引数には、データの名前やファイル名を指定
    formData.append("data", blob as File, "canvas.png");
    formData.append("data", correctBlob as File, "correctCanvas.png");
    try {
      const response = await fetch("http://localhost:8000", {
        method: "POST",
        body: formData,
      });

      // response.okはレスポンスが成功したかどうかを示すブール値
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const image = await response.blob();
      const score = await Number(response.headers.get("score"));

      return { image: image, score: score };
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

      if (ctx && webcamCanvas && correctCanvas) {
        // 仮想的に0．5秒待機する（これをコメントアウトすればスムーズに動く）
        // await new Promise((resolve) => setTimeout(resolve, 100));
        try {
          // resultはblob(処理画像)とnumber（類似度）を返す予定
          const result = await uploadImage(webcamCanvas as HTMLCanvasElement, correctCanvas);

          // 画像処理後の画像をcanvasに描画
          const img = new Image();
          img.src = URL.createObjectURL(new Blob([result.image]));
          // img.onload: 画像のロードが完了したときに呼び出されるコールバック関数
          img.onload = () => {
            ctx.save();
            ctx.scale(-1, 1); // 水平方向に反転
            ctx.drawImage(img, 0, 0, -canvas.width, canvas.height);
            ctx.restore();
          };

          // 1フレームごとの類似度のスコアを保存
          similarityScoreList.push(result.score)

          
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
      return () => {
        cancelAnimationFrame(reqIdRef.current);

        let sum = 0;
        for (let i=0; i<similarityScoreList.length; i++) {
          sum += similarityScoreList[i];
        }

        setSimilarityScore(sum / similarityScoreList.length);
      }
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
          <Flex direction="column" align="center" justify="center" gap={20}>
            <Flex align="center" justify="center" gap={20}>
              <Webcam //以下は全部Webcamコンポーネントに渡されるprops
                audio={false}
                width={frameSize.width}
                height={frameSize.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
              <canvas
                ref={correctCanvasRef}
                width={frameSize.width}
                height={frameSize.height}
              />
            </Flex>
            <Box height="40%">
              <canvas
                ref={canvasRef}
                width={frameSize.width}
                height={frameSize.height}
              />
            </Box>
          </Flex>
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
