import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export const WebCam_Window = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
    }
  }, [webcamRef]);

  const invertColors = (image: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // 赤
        data[i + 1] = 255 - data[i + 1]; // 緑
        data[i + 2] = 255 - data[i + 2]; // 青
      }

      ctx.putImageData(imageData, 0, 0);

      return canvas.toDataURL();
    }
    return null;
  };

  useEffect(() => {
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const invertedImage = invertColors(image);
        setProcessedImage(invertedImage);
      };
    }
  }, [imageSrc]);

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
          <div>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={capture}>キャプチャ</button>
        </>
      )}
      {processedImage && (
        <>
          <div>
            <button onClick={() => setProcessedImage(null)}>削除</button>
          </div>
          <div>
            <img src={processedImage} alt="Processed Screenshot" />
          </div>
        </>
      )}
    </div>
  );
};
