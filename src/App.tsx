import { useCallback, useState, useMemo } from "react";
import "./App.css";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";

function App() {
  const [target, setTarget] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [hideAddr, setHideAddr] = useState(false);
  const [num, setNum] = useState(4);

  const onClickSearchAddress = useCallback(async () => {
    setHideAddr(true);
    const r = await axios.get("/api/search", {
      params: {
        zipcode: zipcode,
      },
    });
    console.log(r.data);
    if (!r.data.results) {
      alert("該当する住所はありません");
      return;
    }
    setAddress(
      r.data.results[0].address1 +
        r.data.results[0].address2 +
        r.data.results[0].address3
    );
    setHideAddr(false);
  }, [zipcode, setAddress]);

  const validateZipcode = useCallback((): boolean => {
    const pattern = /^[0-9]{3}-[0-9]{4}$/;
    return pattern.test(zipcode);
  }, [zipcode]);

  const zip = useMemo(() => {
    if (zipcode.length > 0) {
      return <Text>〒{zipcode}</Text>;
    } else {
      return <Text></Text>;
    }
  }, [zipcode]);

  const items = useMemo(() => {
    const h = 100 / (num / 2);
    return [...Array(num)].map(() => {
      return (
        <Box
          style={{
            width: "50%",
            height: `${h}%`,
            borderRight: "1px solid #CCC",
          }}
        >
          <Box m={4}>{zip}</Box>
          <Box ml={4}>
            <Text>{address}</Text>
          </Box>
          <Box m={6} align="right">
            <Text fontSize={20}>{target}</Text>
          </Box>
          <Divider />
        </Box>
      );
    });
  }, [num, target, address, zipcode]);

  return (
    <Box className="App">
      <Box className="Form">
        <FormControl isRequired>
          <FormLabel>宛名</FormLabel>
          <Input
            type="text"
            placeholder="○○株式会社 ○○様"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </FormControl>
        <FormControl
          id="zipcode"
          isRequired
          isInvalid={zipcode.length > 0 && !validateZipcode()}
        >
          <FormLabel mt={5}>郵便番号</FormLabel>
          <Input
            type="text"
            placeholder="163-8001"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <FormErrorMessage>000-0000の形式で入力してください</FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel mt={5}>住所</FormLabel>
          <Flex>
            <Input
              className={hideAddr ? "" : "hide"}
              type="text"
              placeholder="東京都新宿区西新宿２丁目８−１"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              ml={5}
              leftIcon={<SearchIcon />}
              onClick={onClickSearchAddress}
              isDisabled={!validateZipcode()}
            >
              郵便番号から検索
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel mt={5}>個数</FormLabel>
          <Input
            type="number"
            placeholder="8"
            value={num}
            min={2}
            max={8}
            step="2"
            onChange={(e) => setNum(parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FormHelperText>
            入力内容がサーバ等に保存されることはありません。
          </FormHelperText>
        </FormControl>
      </Box>
      <Divider mt={5} />
      <Text>プレビュー</Text>
      <Box className="Preview">
        <Flex wrap="wrap">{items}</Flex>
      </Box>
    </Box>
  );
}

export default App;
