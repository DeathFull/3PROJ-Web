import { useContext, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Input,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import instance from "../../api/ApiConfig.tsx";
import { AuthContext } from "../../context/AuthContext.tsx";
import { Bounce } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function LoginProcess() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useBoolean();
  const [errorCount, setErrorCount] = useState(0);

  const [success, setSuccess] = useBoolean();
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const handleLogin = () => {
    instance
      .post("users/login", { email, password })
      .then((response) => {
        const token = response.data.token;
        authContext.setToken(token);
        setError.off();
        setSuccess.on();
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      })
      .catch(() => {
        setError.on();
        setErrorCount(errorCount + 1);
      });
  };

  function checkForTokenInUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      instance
        .get(`/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          authContext.setToken(token);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("token invalid", error);
        });
    }
  }

  checkForTokenInUrl();
  return (
    <>
      <Stack onKeyDown={(e) => e.key === "Enter" && handleLogin()}>
        <Button
          bg={"none"}
          border="solid 2px black"
          onClick={() =>
            (window.location.href = `https://api.uni-finance.fr/users/login/google?redirectUrl=${window.location.origin}/login`)
          }
        >
          <Flex align="center">
            <Icon as={FcGoogle} boxSize={6} mr={2} />
            <Heading size="md">Connectez-vous à Google</Heading>
          </Flex>
        </Button>
        <Center>
          <Heading textColor={"darkgray"} size={"md"}>
            ou
          </Heading>
        </Center>
        <Input
          mb={3}
          textAlign={"center"}
          border="solid 2px black"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <Input
          mb={8}
          textAlign={"center"}
          border="solid 2px black"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          type="password"
          value={password}
        />
        <Button
          mb={5}
          textColor={"white"}
          bg={"gray.700"}
          _hover={{ bg: "gray.600" }}
          onClick={handleLogin}
        >
          Se connecter
        </Button>
        {error && (
          <Bounce key={errorCount}>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Connexion échouée !</AlertTitle>
              <AlertDescription>Vérifiez vos identifiants.</AlertDescription>
            </Alert>
          </Bounce>
        )}
        {success && (
          <Bounce>
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Connexion réussie !</AlertTitle>
              <AlertDescription>Redirection en cours...</AlertDescription>
            </Alert>
          </Bounce>
        )}
      </Stack>
    </>
  );
}

export default LoginProcess;
