import { Box, Center, FlexProps } from "@chakra-ui/layout";

const LoadingPage = (props: FlexProps) => {
  return (
    <>
      <Center minH="calc(100vh - 74px - 80px)" flexDir="column" {...props}>
        <Box mt={5}/>
      </Center>
    </>
  );
};

export default LoadingPage;
