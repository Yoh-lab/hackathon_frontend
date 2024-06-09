// 類似度を示す状態をコンポーネント間で共有するコンテキスト

'use client'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState, } from 'react';

//型の宣言
interface similarityScoreContextType {
    similarityScore: number;
    setSimilarityScore: Dispatch<SetStateAction<number>>;
}
interface similarityScoreProviderProps {
    children: ReactNode;
}

// コンテキストを作成
const similarityScoreContext = createContext<similarityScoreContextType>({
    similarityScore: 0.6,
    setSimilarityScore: () => {},
});

// Providerコンポーネントの作成
export const SimilarityScoreProvider = ({ children }: similarityScoreProviderProps) => {
    // 類似度を示す状態
    const [similarityScore, setSimilarityScore] = useState(60);

    return (
        <similarityScoreContext.Provider value={{ similarityScore, setSimilarityScore}}>
            {children}
        </similarityScoreContext.Provider>
    );
};

// コンテキストを使用するためのカスタムフック
export const useSimilarityScore = () => useContext(similarityScoreContext);