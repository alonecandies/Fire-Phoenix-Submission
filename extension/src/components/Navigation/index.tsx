import { Center, Flex } from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";
import { ReactComponent as SwapSvg } from "../../assets/images/icons/swap.svg";
import { ReactComponent as SummarySvg } from "../../assets/images/icons/summary.svg";
import { ReactComponent as ExploreSvg } from "../../assets/images/icons/explore.svg";
import { ReactComponent as SettingSvg } from "../../assets/images/icons/setting.svg";

const Navigation = () => {
  return (
    <Flex
      pos="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="gray.600"
      w="100%"
      justifyContent="space-evenly"
      h="60px"
      alignItems="center"
      _notFirst={{
        a: {
          ":hover , &.active": {
            color: "primary.300",
            stroke: "primary.300",
            svg: { stroke: "primary.300" },
          },
        },
      }}
    >
      <Center as={NavLink} to="/summary" py="3" w="50px">
        <SummarySvg width="30" stroke="#ffffff" />
      </Center>
      <Center as={NavLink} to="/swap" py="3" w="50px">
        <SwapSvg width="30" stroke="#ffffff" />
      </Center>
      <Center as={NavLink} to="/explore" py="3" w="50px">
        <ExploreSvg width="30" stroke="#ffffff" />
      </Center>
      <Center as={NavLink} to="/settings" py="3" w="50px">
        <SettingSvg width="30" stroke="#ffffff" />
      </Center>
    </Flex>
  );
};

export default Navigation;
