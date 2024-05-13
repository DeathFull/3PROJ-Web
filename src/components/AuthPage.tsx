import { Button, Center, Flex, Heading, Icon, Stack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import LoginProcess from "./auth/LoginProcess.tsx";
import { useNavigate } from "react-router-dom";
import instance from "../api/ApiConfig.tsx";
import { AuthContext } from "../context/AuthContext.tsx";
import { useContext } from "react";

function AuthPage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const request = instance.get("users", {
    headers: {
      Authorization: `Bearer ${authContext.token}`,
    },
  });

  request.then((response) => {
    if (response.status === 200) {
      navigate("/dashboard");
    }
  });

  return (
    <>
      <Stack justifyContent={"center"} mx={"auto"}>
        <Center mb={3}>
          <Heading size={"lg"}>Connectez-vous à UniFinance</Heading>
        </Center>
        <Button bg={"none"} border="solid 2px black">
          <Flex align="center">
            <Icon as={FcGoogle} boxSize={6} mr={2} />
            <Heading size="md">Connectez-vous à Google</Heading>
          </Flex>
        </Button>
        <Center>
          <Heading textColor={"darkgray"} size={"md"}>
            ou
          </Heading>
        </Center>
        <LoginProcess />
      </Stack>
    </>
  );
}

export default AuthPage;
