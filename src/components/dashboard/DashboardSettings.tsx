import { Box, Heading, Text, Button } from "@chakra-ui/react";
import instance from "../../api/ApiConfig.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";

function DashboardSettings() {
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState({
        _id: String(),
        email: String()
    });
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);

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
        instance.put(`/users/${user._id}`, {...user,firstname, lastname, email, avatar,}, {
            headers: {
                Authorization: `Bearer ${authContext.getToken()}`,
            },
        })
            .then((r) => {
                setUser(r.data)
            })
    }

    return (
        <Box p={4}>
            <Heading as="h1" mb={4} size="lg">Paramètres du tableau de bord</Heading>

            <Box mb={4}>
                <Heading as="h2" mb={2} size="md">Paramètre 1</Heading>
                <Text>Description du paramètre 1.</Text>
            </Box>

            <Box mb={4}>
                <Heading as="h2" mb={2} size="md">Paramètre 2</Heading>
                <Text>Description du paramètre 2.</Text>
            </Box>
            <Button colorScheme="blue">Enregistrer les modifications</Button>
        </Box>
    );
}

export default DashboardSettings;
