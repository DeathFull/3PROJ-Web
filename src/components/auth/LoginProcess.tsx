import { Button, Input, Stack } from "@chakra-ui/react";

function LoginProcess() {
  //TODO get api avec instance

  return (
    <>
      <Stack>
        <Input mb={3} border="solid 2px black" placeholder="Email" />
        <Input mb={8} border="solid 2px black" placeholder="Mot de passe" />
        <Button textColor={"white"} bg={"gray.700"} _hover={{ bg: "gray.600" }}>
          Se connecter
        </Button>
      </Stack>
    </>
  );
}

export default LoginProcess;
