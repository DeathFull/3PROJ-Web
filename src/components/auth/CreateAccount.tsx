import { SetStateAction, useState} from "react";
import {Button, FormControl, FormErrorMessage, Input, Stack} from "@chakra-ui/react";

function CreateAccount() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = () => {
        if (password.length < 8) {
            setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
        } else if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
        } else {
            console.log("Inscription réussie !");
        }
    };

    return (
        <Stack spacing={3}>
            <Input mb={3} border="2px solid black" placeholder="Nom" />
            <Input mb={3} border="2px solid black" placeholder="Prénom" />
            <Input mb={3} border="2px solid black" placeholder="Email" />
            <FormControl isInvalid={errorMessage !== ""}>
                <Input
                    mb={3}
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
                _hover={{ bg: "gray.600" }}
                onClick={handleSubmit}
            >
                S'inscrire
            </Button>
        </Stack>
    );
}

export default CreateAccount;
