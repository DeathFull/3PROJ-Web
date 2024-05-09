import {useContext, useState} from 'react';
import { Button, Input, Stack } from "@chakra-ui/react";
import instance from "../../api/ApiConfig.tsx";
import {AuthContext} from "../../context/AuthContext.tsx";

function LoginProcess() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext)
    const handleLogin = () => {
        instance.post('users/login', { email, password })
            .then(response => {
                const token = response.data.token
                authContext.setToken(token);
            })
            .catch(error => {
                console.log(error.data)
            });
    };

    return (
        <>
            <Stack>
                <Input
                    mb={3}
                    border="solid 2px black"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    value={email}
                />
                <Input
                    mb={8}
                    border="solid 2px black"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                />
                <Button
                    textColor={"white"}
                    bg={"gray.700"}
                    _hover={{ bg: "gray.600" }}
                    onClick={handleLogin}
                >
                    Se connecter
                </Button>
            </Stack>
        </>
    );
}

export default LoginProcess;
