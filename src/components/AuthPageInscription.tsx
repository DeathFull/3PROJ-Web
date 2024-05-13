import { Button, Center, Flex, Heading, Icon, Stack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import CreateAccount from "./auth/CreateAccount.tsx";

function AuthPage() {
    return (
        <>
            <Stack mx={"auto"}>
                <Center mb={3}>
                    <Heading size={"lg"}>Inscrivez-vous à UniFinance</Heading>
                </Center>
                <Button bg={"none"} border="solid 2px black">
                    <Flex align="center">
                        <Icon as={FcGoogle} boxSize={6} mr={2} />
                        <Heading size="md">Inscrivez-vous grâce à Google</Heading>
                    </Flex>
                </Button>
                <Center>
                    <Heading textColor={"darkgray"} size={"md"}>
                        ou
                    </Heading>
                </Center>
                <CreateAccount />
            </Stack>
        </>
    );
}

export default AuthPage;
