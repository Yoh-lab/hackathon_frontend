import { Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { useCurrentPoseName } from '../app/contexts/currentPoseNameContext';


// ポーズ名と画像のURLの配列
const poseImages = [
    {name: 'ポーズA', src: 'URL'},
    {name: 'ポーズB', src: 'URL'},
    {name: 'ポーズC', src: 'URL'},
    {name: 'ポーズD', src: 'URL'},
];

//ルーレットで当たったポーズの画像を描画する
export const ShowPose = () => {
    // ルーレットで当たったポーズ
    const { currentPoseName } = useCurrentPoseName();
    console.log({currentPoseName})
    // ポーズ名に一致する要素を探す
    const currentPoseImage = poseImages.find((item) => item.name === currentPoseName)
    // ポーズ名に一致する要素があれば、その画像を表示する
    if (currentPoseImage) {
        return (
            <Image src={currentPoseImage.src} alt={currentPoseName} />
        );
    } else {
        // ポーズ名に一致する要素がない場合は何も表示しない
        return null;
    }
};