import {useContext, useState} from "react";
import {
    VStack,
    Stack,
    Text,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure, Icon,
} from "@chakra-ui/react";
import {AuthContext} from "../../context/AuthContext.tsx";
import instance from "../../api/ApiConfig.tsx";
import {TiPlus} from "react-icons/ti";

function DashboardGroups() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const authContext = useContext(AuthContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        instance.post("/groups", {name, description}, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((response) => {
                console.log("groupe créer")
                onClose();
            })
            .catch((error) => {
                console.error("Marche pas:", error);
            });
    };

    return (
        <>
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
                        borderRadius="25"
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
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Entrer l'adresse email de vos amis"
                                    type="text"
                                    value={description}
                                />
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
                </Stack>
            </VStack>
        </>
    );
}

export default DashboardGroups;
