import { useCallback, useState, useEffect } from 'react';
import './App.css';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Flex,
  Input,
  Button,
  Box,
  Divider
} from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import axios from 'axios';


function App() {

  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');

  const onClickSearchAddress = useCallback(() => {
      console.log("foo");
  }, []);

  const validateZipcode = useCallback(():boolean => {
    const pattern = /^[0-9]{3}-[0-9]{4}$/;
    return pattern.test(zipcode);
  }, [zipcode]);

  return (
      <Box className="App">
          <FormControl isRequired>
              <FormLabel>宛名</FormLabel>
              <Input
                  type="text"
                  placeholder="○○株式会社 ○○様"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} />
          </FormControl>
          <FormControl id="zipcode" isRequired isInvalid={zipcode.length > 0 && !validateZipcode()}>
              <FormLabel mt={5}>郵便番号</FormLabel>
              <Input
                  type="text"
                  placeholder="163-8001"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)} />
              <FormErrorMessage>000-0000の形式で入力してください</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
              <FormLabel mt={5}>住所</FormLabel>
              <Flex>
                  <Input type="text" placeholder="東京都新宿区西新宿２丁目８−１" />
                  <Button
                      ml={5}
                      leftIcon={<SearchIcon />}
                      onClick={onClickSearchAddress}>郵便番号から検索</Button>
              </Flex>
          </FormControl>
          <FormControl>
              <FormHelperText>入力内容がサーバ等に保存されることはありません。</FormHelperText>
          </FormControl>
          <Divider mt={5} />
          <Box>Preview</Box>
      </Box>
  );
}

export default App;
