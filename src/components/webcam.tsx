import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

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
  // isCaptureEnable: キャプチャが有効かどうかの状態
  // setCaptureEnable: isCaptureEnableを更新するための関数
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  // useRef<型>(初期値)でconstを書き換え可能な「状態」に(useStateと違って値が変わっても再レンダリングされない)
  // Webcamコンポーネントへの参照
  const webcamRef = useRef<Webcam>(null);
  // canvas要素への参照
  // <canvas> は固定された大きさの描画可能領域（描画コンテキスト）を作成
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  // 処理された画像を保存するための状態
  // Base64形式でエンコードされた画像を表す文字列
  const [processedImage, setProcessedImage] = useState<string>('')


  //Base64形式でエンコードした画像をバックエンドに送って処理された画像Base64形式で受け取る関数
  const uploadImage = async (imageSrc: String) => {
    try {
      // Fetch APIを使ったPOSTリクエスト
      // responseはHTTPリクエストに対するサーバーからの応答されるオブジェクト
      const response = await fetch('http://localhost:8000', {
        // HTTPメソッドを指定
        method: 'POST', 
        // リクエストタイプを設定（今回はリクエストボディがJSON形式であることを明示）
        headers: {
          'Content-Type': 'application/json'
        },
        // リクエストボディとして画像データをJSON形式で送信
        body: JSON.stringify({ image: imageSrc })
      });
  
      // response.okはレスポンスが成功したかどうかを示すブール値
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // response.json();には処理された画像(processed_image)がBase64形式で返却される想定
      const data = await response.json();
      // 処理された画像を状態に反映
      setProcessedImage(data.processed_image)

      console.log('Image uploaded successfully:', data);
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
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
      const webcam = webcamRef.current.video as HTMLVideoElement;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d"); //ctxを用いて描画コンテキストにアクセス可能

      if (ctx) {
        // 仮想的に0．5秒待機する（これをコメントアウトすればスムーズに動く）
        //await new Promise((resolve) => setTimeout(resolve, 500));
        
        // 左右反転せずに画像を描画
        ctx.drawImage(webcam, 0, 0, canvas.width, canvas.height);
        // キャンバスの内容をBase64エンコードされたJPEG画像のデータURI(画像を表現する文字列)として取得
        const imageSrc = canvas.toDataURL("image/jpeg");

    
        // 画像をバックエンドに送って処理を行う
        if (imageSrc) {
          try {
            const result = await uploadImage(imageSrc);
            console.log('Upload result:', result);
          } catch (error) {
            console.error('Error during image upload:', error);
          }
        }

      }else{
        console.log("Browser does not support canvas");
      }
    }
    // requestAnimationFrameは次の再描画が行われる直前にコールバック関数（引数として渡された関数）を呼ぶ
    // 次のフレームの描画を予約
    reqIdRef.current = requestAnimationFrame(processFrame);
  };


  useEffect(() => {
    if (isCaptureEnable) {
      console.log("processTrame Changing..."); // "processTrame Changing..."をコンソールに表示

      requestAnimationFrame(processFrame);
      // ページ遷移などコンポーネントが破棄されたときにループを止めなければならない
      // useEffectのreturnはそういう時にクリーンアップ関数として一度関数を呼ぶので、ループを止める関数をreturnに渡しておく
      return () => cancelAnimationFrame(reqIdRef.current);
    }
  }, [isCaptureEnable]);


  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Text fontSize='4xl'>カメラアプリ</Text>
      {isCaptureEnable || (
        <Button colorScheme='teal' size='md' onClick={() => setCaptureEnable(true)}>撮影開始～！</Button>
      )}
      {isCaptureEnable && (
        <>
          <div>
          <Button colorScheme='teal' size='md' onClick={() => setCaptureEnable(false)}>撮影終了～！</Button>
          </div>
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
            <img // URLではなくデータURIで直接画像を埋め込む。`${変数}`はJavaScriptのテンプレートリテラルで変数を埋め込める
              src={`data:image/jpeg;base64,${processedImage}`} alt="Processed Image" 
            />
          </div>
        </>
      )}
    </div>
  );
};
