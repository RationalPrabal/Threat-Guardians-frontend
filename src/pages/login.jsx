import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [cred, setCred] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const nav = useNavigate();

  const loginFunction = async () => {
    try {
      let response = await axios.post(
        "http://localhost:4500/users/login",
        cred
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      if (error.response.status === 401) {
        toast({
          title: "Invalid password",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else
        toast({
          title: "Can not Login",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
    }
  };

  return (
    <Flex
      className="italic"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setCred({ ...cred, email: e.target.value })}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setCred({ ...cred, password: e.target.value })}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              {!loading ? (
                <Button
                  onClick={loginFunction}
                  bg={"pink.400"}
                  color={"white"}
                  _hover={{
                    bg: "pink.500",
                  }}
                >
                  Sign in
                </Button>
              ) : (
                <Button
                  bg={"pink.400"}
                  color={"white"}
                  _hover={{
                    bg: "pink.500",
                  }}
                >
                  Please Wait....
                </Button>
              )}
              <p>
                Don't have an account? SignUP from{" "}
                <span
                  onClick={() => {
                    nav("/signup");
                  }}
                  className="text-blue-600 underline font-bold "
                >
                  Here
                </span>
              </p>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}