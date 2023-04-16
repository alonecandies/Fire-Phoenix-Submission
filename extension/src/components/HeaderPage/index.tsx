import { Flex, Heading } from "@chakra-ui/layout";
import React from "react";

type Props = {
  title: string | React.ReactElement;
  isShowButtonGoBack?: boolean;
  children?: React.ReactElement;
  props?: any;
};

const HeaderPage = ({ title, isShowButtonGoBack = true, children, props }: Props) => {
  return (
    <Flex justifyContent="left" pos="relative" mb="5" {...props}>
      <Heading as="h2" fontSize="xl" pl="10">
        {title}
      </Heading>
      {children}
    </Flex>
  );
};

export default HeaderPage;
