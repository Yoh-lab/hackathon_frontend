import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

const frameSize = {
  width: 720,
  height: 360,
};

export const WebCam_Window = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //画像反転関数
  const invertColors = async (imageData: ImageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]; // 赤
      data[i + 1] = 255 - data[i + 1]; // 緑
      data[i + 2] = 255 - data[i + 2]; // 青
    }
    return imageData;
  };

  const processFrame = async () => {
    if (webcamRef.current && canvasRef.current) {
      const webcam = webcamRef.current.video as HTMLVideoElement;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // 仮想的に0．5秒待機する（これをコメントアウトすればスムーズに動く）
        await new Promise((resolve) => setTimeout(resolve, 500));
        // 画像をキャンバスに描画する前に左右反転を適用
        ctx.save();
        ctx.scale(-1, 1); // 水平方向に反転
        ctx.drawImage(webcam, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
        // 色反転を適用
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const invertedData = await invertColors(imageData);
        ctx.putImageData(invertedData, 0, 0);
      }
    }
    // 再起的に次のフレームを処理
    requestAnimationFrame(processFrame);
  };

  useEffect(() => {
    if (isCaptureEnable) {
      console.log("processTrame Changing..."); // "processTrame Changing..."をコンソールに表示
      requestAnimationFrame(processFrame);
    }
  }, [isCaptureEnable]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>カメラアプリ</h1>
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>開始</button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>終了</button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Webcam
              audio={false}
              width={frameSize.width}
              height={frameSize.height}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            <canvas
              ref={canvasRef}
              width={frameSize.width}
              height={frameSize.height}
            />
          </div>
        </>
      )}
    </div>
  );
};
