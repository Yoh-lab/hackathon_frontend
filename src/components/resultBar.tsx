import { useSimilarityScore } from '../app/contexts/similarityScoreContext';
import { Progress, Box, Text, Flex, Image } from "@chakra-ui/react";
import styles from '../styles/Home.module.css';

export const ResultBar = () => {
  // 類似度を示す状態
  const { similarityScore } = useSimilarityScore();

  return (
    <Flex direction="column" justify="center" align="center" height="100%" gap={10}>
      <Text className={styles.text} align="center">あなたの酔っ払い度は...{(1 - similarityScore) * 100}%</Text>
        <Box width="50%">
          <Box position="relative" display="flex" alignItems="center">
            <Image
              src="../../result_icon/smile.svg"
              alt="Left Icon"
              boxSize="64px"
              marginRight="10px"
            />
            <Box position="relative" flex="1">
              <Box
                position="absolute"
                left="0"
                top="0"
                width="100%"
                height="64px"
                borderRadius="full"
                bgGradient="linear(to-r, purple.500, pink.500)"
              />
              <Progress
                value={(1 - similarityScore)*100} // 進捗値
                bg="transparent"
                height="64px" // プログレスバーの高さ
                borderRadius="full" // 丸み
              />
            </Box>
            <Image
              src="../../result_icon/tired.svg"
              alt="Right Icon"
              boxSize="64px"
              marginLeft="10px"
            />
            </Box>
        </Box>
    </Flex>
  );
};