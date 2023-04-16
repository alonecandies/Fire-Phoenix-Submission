import { Box, BoxProps, extendTheme, Flex, FlexProps } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { transparentize } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  xs: "",
  sm: "540px",
  md: "720px",
  lg: "960px",
  xl: "1140px",
});

const components = {
  Skeleton: {
    baseStyle: {
      borderRadius: "16px",
      mt: 8,
    },
  },
  Button: {
    baseStyle: {
      // outline: "none",
      borderRadius: "16px",
    },
    sizes: {
      sm: {
        px: 7,
        h: "38px",
      },
    },
    defaultProps: {
      size: "sm",
    },
  },
  Input: {
    // variants: {
    //   custom: {
    //     field: {
    //       bg: "gray.900",
    //       borderColor: "gray.900",
    //       borderRadius: "16px",
    //       fontSize: "sm",
    //       _placeholder: { color: "whiteAlpha.500" },
    //       _focus: {
    //         border: "1px solid",
    //         borderColor: "primary.300",
    //       },
    //     },
    //   },
    // },
    // defaultProps: {
    //   variant: "custom", // null here
    // },
  },
  Modal: {
    baseStyle: {
      dialog: {
        borderRadius: "0px",
        bg: "gray.700",
      },
    },
  },
  Link: {
    baseStyle: {
      _focus: {
        // boxShadow: "none",
      },
    },
  },
  Tooltip: {
    baseStyle: {
      bg: "gray.700",
      color: "whiteAlpha.700",
    },
  },
};

const theme = extendTheme({
  fonts: {
    heading: '"Karla", sans-serif',
    body: '"Karla", sans-serif',
  },
  colors: {
    primary: {
      100: "#b9f5df",
      200: "#28A745",
      300: "#00e2a4",
      400: "#00e2a4",
      500: "#00da93",
      600: "#09c986",
      700: "#06b476",
      800: "#00a368",
      900: "#05814f",
    },
    secondary: {
      100: "#ffcbbb",
      200: "#ffa98f",
      300: "#fe8663",
      400: "#fe6d40",
      500: "#ff511f",
      600: "#f54c19",
      700: "#e64514",
      800: "#d73d12",
      900: "#bf3007",
    },
    orange: {
      200: "#fe6d40",
      300: "#bb5735",
    },
    gray: {
      500: "#3b3e3c",
      600: "#292d2c",
      700: "#1b1d1c",
      800: "#0f0f0f",
      900: "#010101",
    },
    red: {
      800: "#CC0000",
    },
  },
  sizes: {
    xs: "180px",
  },
  breakpoints,
  components,
  config: {
    initialColorMode: "light",
  },
  styles: {
    global: {
      body: {
        position: "relative",
        mx: "auto",
        fontSize: "100%",
      },
      "#root": {
        display: "flex",
        flexDir: "column",
        overflowX: "hidden",
        w: "325px",
        minH: "365px",
      },
      ".root-options": {
        w: "100% !important",
        h: "100vh !important",
      },
      "&::-webkit-calendar-picker-indicator": {
        filter: "invert(1)",
      },
      /* width */
      "&::-webkit-scrollbar": {
        width: 2,
        display: "none",
      },

      /* Track */
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f11a",
        borderRadius: 1,
      },

      /* Handle */
      "&::-webkit-scrollbar-thumb": {
        background: "#ffffff2b",
        borderRadius: 1,
      },

      /* Handle on hover */
      "&::-webkit-scrollbar-thumb:hover": {
        borderRadius: 2,
        background: "#ffffff2b",
      },
      button: {
        // _focus: { boxShadow: "none!important" },
      },
    },
  },
});

export const Card = (props: BoxProps) => (
  <Box bg="gray.100" borderRadius="16px" overflow="hidden" px={9} pt={8} pb={10} {...props} />
);

export const TextDeep = (props: BoxProps) => <Box opacity="0.5" {...props} />;

export const Tag = (props: FlexProps) => (
  <Flex
    bg="gray.500"
    borderRadius="13px"
    px="2"
    h="32px"
    fontSize="sm"
    justify="space-between"
    alignItems="center"
    {...props}
  />
);

export const NiceScroll = (props: BoxProps) => (
  <Box
    overflow="auto"
    pr="5"
    maxH="310"
    {...props}
    css={{
      "&::-webkit-scrollbar": {
        width: "6px",
        display: "block",
      },
      "&::-webkit-scrollbar-track": {
        width: "6px",
        background: "#000",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#454545",
        borderRadius: "24px",
      },
    }}
  >
    {props.children}
  </Box>
);

export const BoxNote = (props: BoxProps) => (
  <Box
    minHeight="10"
    paddingY="4"
    px="6"
    borderRadius="2xl"
    marginBottom="4"
    backgroundColor={transparentize("primary.200", 0.1) as any}
  >
    <Box color="whiteAlpha.800" fontSize={{ base: "sm", md: "md" }}>
      {props.children}
    </Box>
  </Box>
);

export default theme;
