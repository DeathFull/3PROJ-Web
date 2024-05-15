import {ChangeEvent, useContext, useEffect, useState} from "react";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Icon,
    Input, Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Stack,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    useBoolean,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {AuthContext} from "../../context/AuthContext.tsx";
import instance from "../../api/ApiConfig.tsx";
import {TiPlus} from "react-icons/ti";
import {Bounce} from "react-awesome-reveal";

function DashboardGroups() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const authContext = useContext(AuthContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [members, setMembers] = useState("");
    const [tags, setTags] = useState([] as string[]);
    const [user, setUser] = useState({
        _id: String(),
        email: String()
    });
    const [groups, setGroups] = useState([]);
    const [error, setError] = useBoolean();


    console.log(groups)

    useEffect(() => {
        getUserLogin();
        getGroups();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMembers(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
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

    const handleTagRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const getUserLogin = () => {
        instance.get(`/users`, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((r) => {
                setUser(r.data)
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
            setError.off();
            return userEmail;
        } catch (error) {
            setError.on();
            console.error("non non non2", error);
        }
    };

    const handleSubmit = async () => {
        const newMembers = [user._id];
        for (const element of tags) {
            newMembers.push((await getUserByEmail(element))._id);
        }

        instance.post("/groups", {name, members: newMembers, description}, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((response) => {
                console.log("groupe créer", response)
                console.log(user)
                onClose();
            })
            .catch((error) => {
                console.error("Marche pas:", error);
            });
    };

    const getGroups = () => {
        instance.get(`/users/groups`, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            }
        })
            .then((response) => {
                setGroups(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("non non non3", error);
            });
    }

    return (
        <>
            <Box>
                <VStack align="stretch" mt={8} ml={5} spacing={4}>
                    <Stack spacing={4}>
                        <Text fontSize={{base: "xl", md: "2xl"}}>Créer un nouveau groupe :</Text>
                        <Button
                            alignItems="flex-start"
                            justifyContent="center"
                            flexDir="column"
                            display="flex"
                            w="300px"
                            h="300px"
                            bg="#D27E00"
                            borderRadius="9"
                            onClick={onOpen}
                        >
                            <Icon
                                as={TiPlus}
                                alignSelf={"Center"}
                                boxSize={60}
                                color={"white"}
                            />
                        </Button>
                    </Stack>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalContent>
                            <ModalHeader>Créer un nouveau groupe</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Nom du Groupe</FormLabel>
                                    <Input
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Entrer le nom du groupe"
                                        type="text"
                                        value={name}
                                    />
                                </FormControl>
                                <FormControl id="description">
                                    <FormLabel>Description</FormLabel>
                                    <Input
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Entrer une description du groupe"
                                        type="text"
                                        value={description}
                                    />
                                </FormControl>
                                <FormControl id="" isRequired>
                                    <FormLabel>Ajoutez vos membres</FormLabel>
                                    <Input
                                        onChange={(e) => handleInputChange(e)}
                                        onKeyDown={handleInputKeyDown}
                                        placeholder="Entrez des mots séparés par des espaces"
                                        value={members}
                                    />
                                    <Flex mt={2}>
                                        {tags.map((tag: string, index) => (
                                            <Tag key={index} mr={1} mb={1} bg="#D27E00" variant="solid">
                                                <TagLabel>{tag}</TagLabel>
                                                <TagCloseButton onClick={() => handleTagRemove(tag)}/>
                                            </Tag>
                                        ))}
                                    </Flex>
                                    {error && (
                                        <Bounce>
                                            <Alert status="error">
                                                <AlertIcon/>
                                                <AlertTitle>Mauvaise adresse email</AlertTitle>
                                                <AlertDescription>Vérifiez l'adresse email</AlertDescription>
                                            </Alert>
                                        </Bounce>
                                    )}
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button mr={3} bg="#D27E00" onClick={handleSubmit}>
                                    Créer le groupe
                                </Button>
                                <Button onClick={onClose}>Fermer</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Stack>
                        <Text fontSize={{base: "xl", md: "2xl"}}>Liste de vos groupes :</Text>
                        <Grid gap={3} templateColumns='repeat(3, 3fr)'>
                            {groups.map((group: any) => (
                                <GridItem w="100%">
                                    <Card h={"100%"} mr={"4"}>
                                        <CardBody>
                                            <Stack mt='6' spacing='3'>
                                                <Heading size='xl'>{group.name}</Heading>
                                                <Text>
                                                    {group.description}
                                                </Text>
                                                <Text fontSize='md'>
                                                    Les Membres : {group.members.join(", ")}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                        <Divider/>
                                        <CardFooter justifyContent={"center"}>
                                            <Link href={`/dashboard/groups/${group._id}`}>
                                                <Button as="a" color="white" bg="#D27E00" variant='solid'>
                                                    Allez sur le groupe
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            ))}
                        </Grid>
                    </Stack>
                </VStack>
            </Box>
        </>
    );
}

export default DashboardGroups;
