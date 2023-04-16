import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Checkbox,
  Flex,
  Grid,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
  Textarea,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "src/hooks/useStore";
import useFetch from "use-http";
import { globalSelector } from "../../store/global";

const typeRp = ["Fake", "Scam", "Malware", "Prohibited", "Phishing", "Other"];

export default function Report() {
  const { searchKey } = useAppSelector(globalSelector);
  const [url, setUrl] = useState<string>(searchKey);
  const [description, setDescription] = useState<string>("");
  const [acceptTerm, setAcceptTerm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [type, setType] = useState<string>();
  const history = useHistory();
  const { post: sendReport } = useFetch("/feedback");

  const handleSubmit = useCallback(async () => {
    sendReport({
      url,
      content: description,
      type,
    }).then(() => {
      setSubmitted(true);
      setUrl("");
      setDescription("");
      setType("");
    });
  }, [description, sendReport, type, url]);

  return (
    <Flex direction="column" position="relative">
      <ChevronLeftIcon
        position="absolute"
        boxSize={8}
        top={3}
        left={2}
        cursor="pointer"
        onClick={() => {
          history.goBack();
        }}
      />
      <Center color="primary.200" fontWeight="semibold" mt={3} fontSize="xl">
        Report this website
      </Center>
      <InputGroup>
        <Input
          background="#F7F7F7"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          mx={4}
          mt={4}
          placeholder="Insert URL to report"
        />
      </InputGroup>
      <RadioGroup onChange={setType} value={type}>
        <Grid gridTemplateColumns="repeat(2,1fr)" mx={4}>
          {typeRp.map((item) => (
            <Radio
              value={item}
              _focus={{
                boxShadow: "none",
                outline: "none",
              }}
              size="lg"
              mt={2}
            >
              {item}
            </Radio>
          ))}
        </Grid>
      </RadioGroup>
      <Flex mx={4} mt={4} direction="column">
        <Textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Tell us why you consider this website is a phishing website"
          size="sm"
          background="#F7F7F7"
          _focus={{
            boxShadow: "none",
            outline: "none",
          }}
        />
        <Checkbox
          mt={2}
          isChecked={acceptTerm}
          onChange={(e) => {
            setAcceptTerm(e.target.checked);
          }}
        >
          I agree to the Terms of Policy
        </Checkbox>
        <Flex>
          <Button
            w="full"
            h="45px"
            borderRadius="3px"
            background="#242424"
            color="white"
            fontWeight="semibold"
            _hover={{ background: "#242424" }}
            onClick={handleSubmit}
            disabled={!acceptTerm || !url}
            mt={2}
            mb={2}
          >
            Report this website
          </Button>
        </Flex>
        {submitted && <Center color="primary.200" mb={3} fontWeight="semibold">Thank you for your report.</Center>}
      </Flex>
    </Flex>
  );
}
