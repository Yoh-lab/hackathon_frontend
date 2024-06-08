import { Providers } from './providers'
import { CurrentPoseNameProvider } from './contexts/currentPoseNameContext';
import { SimilarityScoreProvider } from './contexts/similarityScoreContext';
import { PoseImagesProvider } from './contexts/poseImagesContext';

import type { Metadata } from "next";
import { RocknRoll_One } from "next/font/google";
const rocknRollOne = RocknRoll_One({ subsets: ["latin"], weight: ["400"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={rocknRollOne.className}>
        <PoseImagesProvider>
          <SimilarityScoreProvider>
            <CurrentPoseNameProvider>
              <Providers>
                {children}
              </Providers>
            </CurrentPoseNameProvider>
          </SimilarityScoreProvider>
        </PoseImagesProvider>
      </body>
    </html>
  );
}
