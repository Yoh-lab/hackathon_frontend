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
        {name: 'なんちゃってヨガ', imageSrc: '/images/original/No2.jpg', boneImageSrc: '/images/bone/No2_a.jpg'},
        {name: 'さかな~', imageSrc: '/images/original/No3.jpg', boneImageSrc: '/images/bone/No3_a.jpg'},
        {name: 'コナン', imageSrc: '/images/original/No1.jpg', boneImageSrc: '/images/bone/No1_a.jpg'},
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