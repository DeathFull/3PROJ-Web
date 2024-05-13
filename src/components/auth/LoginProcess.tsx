import { useContext, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Input,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import instance from "../../api/ApiConfig.tsx";
import { AuthContext } from "../../context/AuthContext.tsx";
import { Bounce } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <Stack onKeyDown={(e) => e.key === "Enter" && handleLogin()}>
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
