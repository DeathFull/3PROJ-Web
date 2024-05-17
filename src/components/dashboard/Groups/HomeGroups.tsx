import {
    Alert, AlertDescription, AlertIcon, AlertTitle,
    Box, Button, Flex, FormControl, FormLabel,
    Heading, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, Stack, Tag,
    TagCloseButton, TagLabel, useBoolean, useDisclosure
} from "@chakra-ui/react";
import instance from "../../../api/ApiConfig.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.tsx";
import {useParams} from "react-router-dom";
import {Bounce} from "react-awesome-reveal";

function HomeGroups() {
    const authContext = useContext(AuthContext);
    const {id} = useParams();
    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState("");
    const [tags, setTags] = useState([] as string[]);
    const [error, setError] = useBoolean();
    const [user, setUser] = useState({
        _id: String(),
        email: String()
    });
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        getUserLogin();
        getGroup()
    }, [id]);

    const getGroup = () => {
        instance.get(`/groups/${id}`, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            }
        })
            .then((response) => {
                setGroup(response.data);
            })
            .catch((error) => {
                console.error("Error fetching group data:", error);
            });
    }

    const handleInputChange = (e: any) => {
        setMembers(e.target.value);
    }

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const newTag = members.trim();
            if (newTag && newTag !== user.email) {
                getUserByEmail(newTag).then((v) => {
                    if (v && !tags.includes(newTag)) {
                        setTags([...tags, newTag]);
                        setMembers('');
                    }
                });
            }
        }
    };

    const getUserLogin = () => {
        instance.get(`/users`, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
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

    const getUserByEmail = async (email: string) => {
        try {
            const r = await instance.get(`users/email/${email}`);
            const userEmail = r.data;
            console.log("test2", userEmail);
            return userEmail;
        } catch (error) {
            console.error("non non non2", error);
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    const handleAddMembers = async () => {
        const newMembers: string[] = [];
        for (const element of tags) {
            newMembers.push((await getUserByEmail(element))._id);
        }
        if (newMembers.length > 0) {
            await instance.put(`/groups/${id}/addUser`, {members: newMembers}, {
                headers: {
                    Authorization: `Bearer ${authContext.token}`,
                }
            })
                .then((response) => {
                    console.log("Ajouter", response);
                    console.log(newMembers)
                    setError.off();
                    onClose();
                })
                .catch((error) => {
                    console.error("Marche pas", error);
                });
        } else {
            setError.on();
            setErrorCount(errorCount + 1);
        }
    }

    const handleQuitGroup = () => {
        instance.put(`/groups/${id}/removeUser`, {id : user._id},{
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            }
        })
            .then((response) => {
                console.log("supprimer", response)
            })
            .catch((error) => {
                console.error("Marche pas2", error);
            });
    }

        return (
            <>
                <Box
                    alignItems={"center"}
                    flexDir={"column"}
                    display={"flex"}
                    w={"100%"}
                >
                    {group ? (
                        <Heading mb={8}>Bienvenue sur le Groupe : {group.name}</Heading>
                    ) : (
                        <Heading mb={8}>Loading...</Heading>
                    )}
                    <Stack w={"100%"} maxW={"600px"} spacing={6}>
                        <Box p={5} borderWidth="1px" shadow="md">
                            <Heading fontSize="xl">Bloc 1</Heading>
                            <Button mt={4} colorScheme="teal">Voir les soldes</Button>
                        </Box>
                        <Box p={5} borderWidth="1px" shadow="md">
                            <Heading fontSize="xl">Bloc 2</Heading>
                            <Button mt={4} colorScheme="teal">Ajouter une dépense</Button>
                        </Box>
                        <Box p={5} borderWidth="1px" shadow="md">
                            <Heading fontSize="xl">Bloc 2</Heading>
                            <Button mt={4} colorScheme="teal">Faire un Remboursement</Button>
                        </Box>
                    </Stack>
                    <Button mt={4} colorScheme="teal" onClick={onOpen}>Ajouter un membre</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalContent>
                            <ModalHeader>Ajouter des membres</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <FormControl id="" isRequired>
                                    <FormLabel>Entrez les adresses email des membres</FormLabel>
                                    <Input
                                        onChange={(e) => handleInputChange(e)}
                                        onKeyDown={handleInputKeyDown}
                                        placeholder="Entrez des adresses email"
                                        value={members}
                                    />
                                    <Flex mt={2}>
                                        {tags.map((tag, index) => (
                                            <Tag key={index} mr={1} mb={1} bg="#D27E00" variant="solid">
                                                <TagLabel>{tag}</TagLabel>
                                                <TagCloseButton onClick={() => handleTagRemove(tag)}/>
                                            </Tag>
                                        ))}
                                    </Flex>
                                    {error && (
                                        <Bounce>
                                            <Alert mt={2} status="error">
                                                <AlertIcon/>
                                                <AlertTitle>Erreur</AlertTitle>
                                                <AlertDescription>Échec de l'ajout des membres</AlertDescription>
                                            </Alert>
                                        </Bounce>
                                    )}
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="teal" onClick={handleAddMembers}>Ajouter</Button>
                                <Button onClick={onClose}>Annuler</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Button mt={2} colorScheme={"teal"} onClick={handleQuitGroup}> Quitter le groupe </Button>
                </Box>
            </>
        );
    }

    export default HomeGroups;