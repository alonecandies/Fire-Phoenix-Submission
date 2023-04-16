import { ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { isEmpty, isNumber } from "lodash";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "src/hooks/useStore";
import { sendMessage } from "src/services/extension";
import { setSearchKey } from "src/store/global";
import useFetch from "use-http";

const mappingCriteria = [
  "URL length",
  "Hostname length",
  "IP",
  "Dots (.)",
  "Exclamation (!)",
  "Equal (=)",
  "Slash (/)",
  "Www",
  "Ratio digits URL",
  "Ratio digits host",
  "Tld in subdomain",
  "(-) Prefix/suffix",
  "Shortest word host",
  "Longest words raw",
  "Longest word path",
  "Phish hints",
  "Hyperlinks",
  "Ratio internal hyperlinks",
  "Empty title",
  "Domain in title",
  "Page rank",
];

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [prediction, setPrediction] = useState<{
    phishingPercentage: number | null;
    result: string;
    url: string;
    detail: any;
  }>({
    phishingPercentage: null,
    result: "",
    url: "",
    detail: {},
  });
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { post: getPredict } = useFetch("/predict");
  const { post: getDetail } = useFetch("/detail");

  const getURL = useCallback(async () => {
    const data = await sendMessage({ type: "get_page_info" });
    setUrl(data.url || "");
    setSearch(data.url || "");
    dispatch(setSearchKey(data.url || ""));
  }, [dispatch]);

  const isNewTab = useMemo(() => url.includes("chrome://"), [url]);

  const phishingPercentage = useMemo(() => {
    if (!isNumber(prediction.phishingPercentage)) return 0;
    let result = 100 - prediction.phishingPercentage;
    return Number(result.toFixed(0));
  }, [prediction.phishingPercentage]);

  const handlePredict = useCallback(
    (url) => {
      setLoading(true);
      setError("");
      getPredict({ url })
        .then((res) => {
          if (!!res.message) {
            setError(res.message);
            setPrediction({
              phishingPercentage: null,
              result: "",
              url: "",
              detail: {},
            });
            return;
          } else {
            setPrediction(res.predictions[0]);
            if (!res.predictions[0]?.detail) {
              getDetail({ url }).then((res) => {
                setPrediction((prev) => ({
                  ...prev,
                  detail: res.detail,
                }));
              });
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [getDetail, getPredict]
  );

  useEffect(() => {
    getURL();
    if (!!url) {
      handlePredict(url);
    }
  }, [getURL, handlePredict, url]);

  if (isNewTab) return <Center>New tab</Center>;

  return (
    <Flex direction="column">
      <InputGroup>
        <Input
          background="#F7F7F7"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            dispatch(setSearchKey(e.target.value));
          }}
          mx={4}
          mt={4}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePredict(search);
            }
          }}
          placeholder="Insert URL to check"
        />
        <InputRightElement
          children={<SearchIcon />}
          mt={4}
          mr={4}
          onClick={() => {
            handlePredict(search);
          }}
          cursor="pointer"
        />
      </InputGroup>
      {!error && (
        <Flex justify="center" align="center" my={3}>
          <CircularProgress
            value={phishingPercentage}
            color={
              phishingPercentage > 65
                ? "primary.200"
                : phishingPercentage > 45
                ? "orange.200"
                : "red.800"
            }
            size="135px"
            isIndeterminate={loading}
          >
            <CircularProgressLabel
              fontSize="2xl"
              fontWeight="semibold"
              color={
                phishingPercentage > 65
                  ? "primary.200"
                  : phishingPercentage > 45
                  ? "orange.200"
                  : "red.800"
              }
            >
              {phishingPercentage}%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
      )}
      {!error && (
        <Center mb={3} fontWeight="500">
          {prediction.result}
        </Center>
      )}
      {!!error && (
        <Center mb={3} fontWeight="500" mt={2}>
          {error}
        </Center>
      )}
      {!isNewTab && (
        <Flex mx={4} mb={3}>
          <Button
            w="full"
            h="45px"
            borderRadius="3px"
            background="#242424"
            color="white"
            fontWeight="semibold"
            _hover={{ background: "#242424" }}
            onClick={() => {
              history.push("/report");
            }}
            disabled={!url && !search}
          >
            Report this website
          </Button>
        </Flex>
      )}
      <Flex mx={4}>
        <Button
          onClick={() => setIsShowDetail((prev) => !prev)}
          w="full"
          h="45px"
          borderRadius="3px"
          background={isShowDetail ? "transparent" : "primary.200"}
          color={isShowDetail ? "primary.200" : "white"}
          fontWeight="semibold"
          _hover={
            isShowDetail
              ? { background: "transparent" }
              : { background: "primary.200" }
          }
          border="2px solid"
          borderColor="primary.200"
          _focus={{
            boxShadow: "none",
            outline: "none",
          }}
          disabled={isEmpty(prediction.detail)}
        >
          Details
        </Button>
      </Flex>
      {isShowDetail && prediction.detail && (
        <Flex direction="column" justify="center" align="center" mx={2} mt={2}>
          <Flex wrap="wrap" justify="center">
            <Text
              background={
                prediction.detail["length_url"] < 54 ? "primary.200" : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[0]}
            </Text>
            <Text
              background={
                prediction.detail["length_hostname"] < 54
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[1]}
            </Text>
            <Text
              background={
                prediction.detail["ip"] === 0 ? "primary.200" : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[2]}
            </Text>
            <Text
              background={
                prediction.detail["nb_dots"] < 4 ? "primary.200" : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[3]}
            </Text>
            <Text
              background={
                prediction.detail["nb_qm"] < 3 ? "primary.200" : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[4]}
            </Text>
            <Text
              background={
                prediction.detail["nb_eq"] < 6 ? "primary.200" : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[5]}
            </Text>
            <Text
              background={
                prediction.detail["nb_slash"] < 10 ? "primary.200" : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[6]}
            </Text>
            <Text
              background={
                prediction.detail["nb_www"] < 2 ? "primary.200" : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[7]}
            </Text>
            <Text
              background={
                prediction.detail["ratio_digits_url"] < 0.65
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[8]}
            </Text>
            <Text
              background={
                prediction.detail["ratio_digits_host"] < 0.5
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[9]}
            </Text>
            <Text
              background={
                prediction.detail["tld_in_subdomain"] <= 0
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[10]}
            </Text>
            <Text
              background={
                prediction.detail["prefix_suffix"] <= 0
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[11]}
            </Text>
            <Text
              background={
                prediction.detail["shortest_word_host"] < 15
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[12]}
            </Text>
            <Text
              background={
                prediction.detail["longest_words_raw"] < 30
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[13]}
            </Text>
            <Text
              background={
                prediction.detail["longest_word_path"] < 10
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[14]}
            </Text>
            <Text
              background={
                prediction.detail["phish_hints"] < 10
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[15]}
            </Text>
            <Text
              background={
                prediction.detail["nb_hyperlinks"] < 30
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[16]}
            </Text>
            <Text
              background={
                prediction.detail["ratio_intHyperlinks"] > 0.4
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[17]}
            </Text>
            <Text
              background={
                prediction.detail["empty_title"] < 5 ? "primary.200" : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[18]}
            </Text>
            <Text
              background={
                prediction.detail["domain_in_title"] === 0
                  ? "primary.200"
                  : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[19]}
            </Text>
            <Text
              background={
                prediction.detail["page_rank"] > 0 ? "primary.200" : "red.800"
              }
              mx={2}
              my={1}
              color="white"
              py={1}
              px={2}
              borderRadius="5px"
              fontSize="sm"
            >
              {mappingCriteria[20]}
            </Text>
          </Flex>
          <ChevronUpIcon
            mt={1}
            color="#979797"
            boxSize={5}
            cursor="pointer"
            onClick={() => setIsShowDetail(false)}
          />
        </Flex>
      )}
    </Flex>
  );
}
