import {
    Alert, AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack, useBoolean
} from "@chakra-ui/react";
import instance from "../../api/ApiConfig.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";
import {Bounce} from "react-awesome-reveal";

function DashboardSettings() {
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState({
        _id: String(),
        email: String()
    });
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [iban, setIban] = useState('');
    const [error, setError] = useBoolean();
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        getUserLogin();
    }, [authContext]);

    const getUserLogin = () => {
        instance.get(`/users`, {
            headers: {
                Authorization: `Bearer ${authContext.getToken()}`,
            },
        })
            .then((r) => {
                setUser(r.data)
                console.log(r.data)
            })
            .catch((error) => {
                console.error("non non non", error)
            });
    };

    const handleUpdateUsers = () => {
        if (iban.length < 14) {
            setError.on();
            setErrorCount(errorCount + 1);
            return;
        } else if (iban.length > 34) {
            setError.on();
            setErrorCount(errorCount + 1);
            return;
        }

        instance.put(`/users`, {...user, firstname, lastname, iban}, {
            headers: {
                Authorization: `Bearer ${authContext.getToken()}`,
            },
        })
            .then((r) => {
                console.log("Utilisateur bien modifié")
                setUser(r.data)
            })
            .catch((error) => {
                console.error("échec de la modification", error)
            });
    }

    return (
        <>
            <Box maxW="500px" mx="auto" p={6} bg="white" borderRadius="md" shadow="lg">
                <Heading as="h2" mb={6} textAlign="center" size="lg">
                    Modifiez votre compte
                </Heading>
                <form>
                    <Stack spacing={4}>
                        <FormControl id="lastname">
                            <FormLabel>Nom :</FormLabel>
                            <Input
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Entrez votre nom"
                                type="text"
                                value={lastname}
                            />
                        </FormControl>
                        <FormControl id="firstname">
                            <FormLabel>Prénom :</FormLabel>
                            <Input
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="Entrez votre prénom"
                                type="text"
                                value={firstname}
                            />
                        </FormControl>
                        <FormControl id="iban">
                            <FormLabel>Ajoutez un Iban :</FormLabel>
                            <Input
                                onChange={(e) => setIban(e.target.value)}
                                placeholder="Entrez votre IBAN"
                                type="text"
                                value={iban}
                            />
                        </FormControl>
                    </Stack>
                    <Button
                        w="100%"
                        mt={6}
                        colorScheme="orange"
                        onClick={handleUpdateUsers}
                        variant="solid"
                    >
                        Appliquer
                    </Button>
                    {error && (
                        <Bounce key={errorCount}>
                            <Alert status="error">
                                <AlertIcon/>
                                <AlertTitle>L'Iban n'est pas de la bonne taille</AlertTitle>
                                <AlertDescription>Il doit être entre 14 et 34 caractères</AlertDescription>
                            </Alert>
                        </Bounce>
                    )}
                </form>
            </Box>
        </>
    );
}

export default DashboardSettings;
