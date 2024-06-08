// ポーズ名と画像を示す配列をコンポーネント間で共有するコンテキスト

'use client'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState, } from 'react';

//型の宣言
interface PoseImage {
    name: string;
    imageSrc: string;
    boneImageSrc: string;
}
interface poseImagesContextType {
    poseImages: PoseImage[];
}
interface poseImagesProviderProps {
    children: ReactNode;
}

// コンテキストを作成
const poseImagesContext = createContext<poseImagesContextType>({
    poseImages: [],
});

// Providerコンポーネントの作成
export const PoseImagesProvider = ({ children }: poseImagesProviderProps) => {
    const poseImages = [
        {name: 'なんちゃってヨガ', imageSrc: 'URL', boneImageSrc: 'URL'},
        {name: 'さかな~', imageSrc: 'URL', boneImageSrc: 'URL'},
        {name: 'コナン', imageSrc: 'URL', boneImageSrc: 'URL'},
    ];

    return (
        <poseImagesContext.Provider value={{ poseImages }}>
            {children}
        </poseImagesContext.Provider>
    );
};

// コンテキストを使用するためのカスタムフック
export const usePoseImages = () => {
    const context = useContext(poseImagesContext);
    return context.poseImages;
};