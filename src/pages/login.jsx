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
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.Context";

export default function Login() {
  const [cred, setCred] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const { setAuth, isAuth, setUser } = useContext(AuthContext);
  const toast = useToast();
  const nav = useNavigate();
  if (localStorage.getItem("token")) {
    setAuth(true);
  }
  const loginFunction = async () => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        cred
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      setUser(response.data.user);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 4000,
        position: "bottom-left",
        isClosable: true,
      });
      nav("/");
      setAuth(true);
    } catch (error) {
      if (error.response.status === 403) {
        toast({
          title: "Access Denied",
          description: "Contact the institute",
          status: "error",
          duration: 4000,
          position: "bottom-left",
          isClosable: true,
        });
      } else if (error.response.status === 401) {
        toast({
          title: "Invalid password",
          status: "error",
          duration: 4000,
          position: "bottom-left",
          isClosable: true,
        });
      } else
        toast({
          title: "Can not Login",
          status: "error",
          duration: 4000,
          position: "bottom-left",
          isClosable: true,
        });
    }
  };

  if (isAuth) {
    nav("/");
  } else
    return (
      <Flex
        className="italic"
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        //  bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            // bg={useColorModeValue("white", "gray.700")}
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
                  onChange={(e) =>
                    setCred({ ...cred, password: e.target.value })
                  }
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
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}
