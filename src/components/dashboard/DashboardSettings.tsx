import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import instance from "../../api/ApiConfig.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext.tsx";
import { Bounce } from "react-awesome-reveal";
import UserType from "../../types/UserType.tsx";

function DashboardSettings() {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({} as UserType);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [iban, setIban] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useBoolean();
  const [errorCount, setErrorCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    getUserLogin();
  }, []);

  useEffect(() => {
    setFirstname(user.firstname ?? "");
    setLastname(user.lastname ?? "");
    setIban(user.iban ?? "");
    setAvatar(user.avatar ?? "");
  }, [user]);

  const getUserLogin = () => {
    instance
      .get(`/users`, {
        headers: {
          Authorization: `Bearer ${authContext.getToken()}`,
        },
      })
      .then((r) => {
        setUser(r.data);
        console.log(r.data);
      })
      .catch((error) => {
        console.error("non non non", error);
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

    instance
      .put(
        `/users`,
        { ...user, firstname, lastname, iban },
        {
          headers: {
            Authorization: `Bearer ${authContext.getToken()}`,
          },
        },
      )
      .then((r) => {
        console.log("Utilisateur bien modifié");
        getUserLogin();
      })
      .catch((error) => {
        console.error("échec de la modification", error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
  };

  return (
    <>
      <Box
        mx="auto"
        p={6}
        bg="white"
        borderRadius="md"
        shadow="lg"
        alignContent={"center"}
      >
        <Heading as="h2" mb={6} textAlign="center" size="lg">
          Modifier votre compte
        </Heading>
        <form>
          <Stack spacing={4}>
            <Avatar
              alignSelf={"center"}
              name={
                user.firstname !== undefined &&
                user.firstname.concat(" ", user.lastname)
              }
              src={avatar !== undefined && avatar}
              size={"xl"}
            />
            <Input
              type="file"
              accept="image/*"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <Button
              colorScheme="blue"
              onClick={() => {
                inputRef.current!.click();
              }}
              mb={3}
            >
              Changer d'avatar
            </Button>
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
              <FormLabel>IBAN :</FormLabel>
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
              <Alert status="error" flexDirection="column" mt={3}>
                <AlertIcon />
                <AlertTitle>L'IBAN est incorrect !</AlertTitle>
                <AlertDescription>
                  Il doit être entre 14 et 34 caractères
                </AlertDescription>
              </Alert>
            </Bounce>
          )}
        </form>
      </Box>
    </>
  );
}

export default DashboardSettings;
