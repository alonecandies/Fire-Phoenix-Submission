import { useCallback } from "react";
import { RenderProps, useToast, UseToastOptions } from "@chakra-ui/toast";
import type { AlertStatus } from "@chakra-ui/alert";
import { Flex, Text } from "@chakra-ui/layout";
import { CloseIcon } from "@chakra-ui/icons";

export default function useCustomToast() {
  const toast = useToast();

  const toastWrap = useCallback(
    ({
      status = "success",
      title,
      options,
    }: {
      status: AlertStatus;
      title: React.ReactNode | string;
      options?: UseToastOptions;
    }) => {
      let color = "primary.200";
      switch (status) {
        case "error": {
          color = "red.300";
          break;
        }
        case "info": {
          color = "whiteAlpha.700";
          break;
        }
      }

      toast({
        title,
        status,
        duration: 3000,
        position: "top-right",
        containerStyle:{
          display: "flex",
          justifyContent: "flex-end"
        },
        render: (props: RenderProps) => {
          return (
            <Flex
              p={3}
              bg="blue.500"
              borderRadius="12"
              backgroundColor="gray.600"
              alignItems="center"
              position="relative"
              top="40px"
              m={[0, 3]}
              display={{ base: "flex" }}
              flexDirection={{ base: "row-reverse" }}
              boxShadow="4px 4px 4px 4px rgba(0, 0, 0, 0.25)"
              width="fit-content"
            >
              <CloseIcon
                width="3"
                height="3"
                cursor="pointer"
                onClick={props.onClose}
                ml={{ base: "2", xl: "2" }}
              />
              {/* {status === "success" && <CheckCircleIcon color={color} marginRight="1" />}
              {status === "error" && <WarningIcon color={color} marginRight="1" />} */}
              <Text color={color}>{title}</Text>
            </Flex>
          );
        },
        ...options,
      });
    },
    [toast],
  );

  return toastWrap;
}
