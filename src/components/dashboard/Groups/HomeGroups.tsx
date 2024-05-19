import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
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
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import instance from "../../../api/ApiConfig.tsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.tsx";
import { useParams } from "react-router-dom";
import { Bounce } from "react-awesome-reveal";
import BalanceModal from "./component/BalanceModal.tsx";
import ExpensesModal from "./component/ExpensesModal.tsx";
import UserType from "../../../types/UserType.tsx";
import DebtModal from "./component/DebtModal.tsx";
import GroupType from "../../../types/GroupType.tsx";
import RefundModal from "./component/RefundModal.tsx";

function HomeGroups() {
  const authContext = useContext(AuthContext);
  const { id } = useParams();
  const [group, setGroup] = useState<GroupType>({} as GroupType);
  const [members, setMembers] = useState("");
  const [tags, setTags] = useState([] as string[]);
  const [error, setError] = useBoolean();
  const [user, setUser] = useState<UserType>({} as UserType);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    getUserLogin();
    getGroup();
  }, []);

  const getGroup = () => {
    instance
      .get(`/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${authContext.getToken()}`,
        },
      })
      .then((response) => {
        setGroup(response.data);
      })
      .catch((error) => {
        console.error("N'arrive pas à charger la data:", error);
      });
  };

  const handleInputChange = (e: any) => {
    setMembers(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const newTag = members.trim();
      if (newTag && newTag !== user.email) {
        getUserByEmail(newTag).then((v) => {
          if (v && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setMembers("");
          }
        });
      }
    }
  };

  const getUserLogin = () => {
    instance
      .get(`/users`, {
        headers: {
          Authorization: `Bearer ${authContext.getToken()}`,
        },
      })
      .then((r) => {
        setUser(r.data);
      })
      .catch((error) => {
        console.error("échec de la récupération du compte", error);
      });
  };

  const getUserByEmail = async (email: string) => {
    try {
      const r = await instance.get(`users/email/${email}`);
      const userEmail = r.data;
      return userEmail;
    } catch (error) {
      console.error("échec du getUserByEmail", error);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddMembers = async () => {
    const newMembers: string[] = [];
    for (const element of tags) {
      newMembers.push((await getUserByEmail(element))._id);
    }
    if (newMembers.length > 0) {
      await instance
        .put(
          `/groups/${id}/addUser`,
          { members: newMembers },
          {
            headers: {
              Authorization: `Bearer ${authContext.getToken()}`,
            },
          },
        )
        .then((response) => {
          console.log("Ajouter", response);
          setError.off();
          onClose();
        })
        .catch((error) => {
          console.error("Membre pas ajouter dans le groupe", error);
        });
    } else {
      setError.on();
      setErrorCount(errorCount + 1);
    }
  };

  const handleQuitGroup = () => {
    instance
      .put(
        `/groups/${id}/removeUser`,
        { id: user._id },
        {
          headers: {
            Authorization: `Bearer ${authContext.getToken()}`,
          },
        },
      )
      .then((response) => {
        console.log("supprimer", response);
        window.location.href = "http://localhost:5173/dashboard";
      })
      .catch((error) => {
        console.error("Marche pas", error);
      });
  };

  const exportExpensesRefund = (format) => {
    instance.get(`groups/export/${id}?format=${format}`, {
      headers: {
        Authorization: `Bearer ${authContext.getToken()}`,
      },
      responseType: 'blob'
    })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('téléchargement', `expenses.${format}`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .catch((error) => {
          console.error("échec de l'export", error)
        });
  }

  return (
    <>
      <Box alignItems={"center"} flexDir={"column"} display={"flex"} w={"80%"}>
        {group ? (
          <Heading mb={8}>Bienvenue sur le Groupe : {group.name}</Heading>
        ) : (
          <Heading mb={8}>Chargement...</Heading>
        )}
        <Stack w={"100%"} maxW={"75%"} spacing={6}>
          <Box p={5} borderWidth="1px" shadow="md">
            <Heading mb={4} size="md">
              Solde du groupe
            </Heading>
            {<BalanceModal />}
          </Box>
          <Box p={5} borderWidth="1px" shadow="md">
            <Heading mb={4} size="md">
              Dépenses
            </Heading>
            {<ExpensesModal user={user} group={group}/>
               }
          </Box>
          <Box p={5} borderWidth="1px" shadow="md">
            <Heading mb={4} size="md">
              Remboursements à effectuer
            </Heading>
            {<DebtModal/>}
          </Box>
          <Box p={5} borderWidth="1px" shadow="md">
            <Heading mb={4} size="md">
              Remboursements effectuer
            </Heading>
            {<RefundModal/>}
          </Box>
        </Stack>
        <Button mt={4} color="white" bg="#D27E00" onClick={onOpen}>
          Ajouter un membre
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Ajouter des membres</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="" isRequired>
                <FormLabel>Entrez les adresses email des membres :</FormLabel>
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
                      <TagCloseButton onClick={() => handleTagRemove(tag)} />
                    </Tag>
                  ))}
                </Flex>
                {error && (
                  <Bounce>
                    <Alert mt={2} status="error">
                      <AlertIcon />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>
                        Échec de l'ajout des membres
                      </AlertDescription>
                    </Alert>
                  </Bounce>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button color="white" bg="#D27E00" onClick={handleAddMembers}>
                Ajouter
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button mt={2} color="white" bg="#D27E00" onClick={handleQuitGroup}>
          {" "}
          Quitter le groupe{" "}
        </Button>
        <Button mt={2} color="white" bg="#D27E00" onClick={() => exportExpensesRefund('pdf')}>Exporter en PDF</Button>
        <Button mt={2} color="white" bg="#D27E00" onClick={() => exportExpensesRefund('csv')}>Exporter en CSV</Button>
      </Box>
    </>
  );
}

export default HomeGroups;
