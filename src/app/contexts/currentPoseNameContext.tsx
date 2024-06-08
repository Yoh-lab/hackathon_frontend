// 現在ルーレット画面で表示されているポーズ名を示す状態をコンポーネント間で共有するコンテキスト

'use client'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState, } from 'react';

//型の宣言
interface currentPoseNameContextType {
    currentPoseName: string;
    setCurrentPoseName: Dispatch<SetStateAction<string>>;
}
interface currentPoseNameProviderProps {
    children: ReactNode;
}

// コンテキストを作成
const currentPoseNameContext = createContext<currentPoseNameContextType>({
    currentPoseName: '',
    setCurrentPoseName: () => {},
});

// Providerコンポーネントの作成
export const CurrentPoseNameProvider = ({ children }: currentPoseNameProviderProps) => {
    // 現在表示されているポーズを示す状態
    const [currentPoseName, setCurrentPoseName] = useState('');

    return (
        <currentPoseNameContext.Provider value={{ currentPoseName, setCurrentPoseName}}>
            {children}
        </currentPoseNameContext.Provider>
    );
};

// コンテキストを使用するためのカスタムフック
export const useCurrentPoseName = () => useContext(currentPoseNameContext);