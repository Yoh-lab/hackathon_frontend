"use client";

import Image from "next/image";
import { WebCam_Window } from "../../components/webcam";

export default function Home() {
  const i = 1
  return (
    <div>
      <WebCam_Window />
    </div>
  );
}