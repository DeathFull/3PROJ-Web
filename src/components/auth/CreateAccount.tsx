import {SetStateAction, useContext, useState} from "react";
import {
    Button, Center, Flex,
    FormControl,
    FormErrorMessage, Heading, Icon,
    Input,
    Stack,
} from "@chakra-ui/react";
import instance from "../../api/ApiConfig.tsx";
import {AuthContext} from "../../context/AuthContext.tsx";
import {FcGoogle} from "react-icons/fc";

function CreateAccount() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const authContext = useContext(AuthContext);

    const handlePasswordChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = () => {
        if (password.length < 8) {
            setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
        } else if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
        } else {
            instance
                .post("users/register", {firstname, lastname, email, password})
                .then((r) => {
                    const token = r.data.token;
                    authContext.setToken(token);
                })
                .catch((error) => {
                    console.error("erreur lors de l'inscription :", error);
                });
        }
    };

    return (
        <>
            <Button bg={"none"} border="solid 2px black"
                    onClick={() => window.location.href = "https://api.uni-finance.fr/users/login/google?redirectUrl=http://localhost:5173/login"}>
                <Flex align="center">
                    <Icon as={FcGoogle} boxSize={6} mr={2}/>
                    <Heading size="md">Inscrivez-vous à Google</Heading>
                </Flex>
            </Button>
            <Center>
                <Heading textColor={"darkgray"} size={"md"}>
                    ou
                </Heading>
            </Center>
            <Stack spacing={3}>
                <Input
                    mb={3}
                    textAlign={"center"}
                    border="2px solid black"
                    name="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Nom"
                    value={lastname}
                />
                <Input
                    mb={3}
                    textAlign={"center"}
                    border="2px solid black"
                    name="firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Prénom"
                    value={firstname}
                />
                <Input
                    mb={3}
                    textAlign={"center"}
                    border="2px solid black"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    value={email}
                />
                <FormControl isInvalid={errorMessage !== ""}>
                    <Input
                        mb={3}
                        textAlign={"center"}
                        border="2px solid black"
                        onChange={handlePasswordChange}
                        placeholder="Mot de passe"
                        type="password"
                        value={password}
                    />
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errorMessage !== ""}>
                    <Input
                        mb={3}
                        textAlign={"center"}
                        border="2px solid black"
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirmez votre mot de passe"
                        type="password"
                        value={confirmPassword}
                    />
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                </FormControl>
                <Button
                    mb={8}
                    color="white"
                    bg="gray.700"
                    _hover={{bg: "gray.600"}}
                    onClick={handleSubmit}
                >
                    S'inscrire
                </Button>
            </Stack>
        </>
    );
}

export default CreateAccount;
