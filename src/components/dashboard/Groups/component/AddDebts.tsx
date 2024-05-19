import { useContext, useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import instance from "../../../../api/ApiConfig.tsx";
import UserType from "../../../../types/UserType.tsx";
import { AuthContext } from "../../../../context/AuthContext.tsx";
import GroupType from "../../../../types/GroupType.tsx";

function AddDebts(props: {
  payerId: string;
  group: GroupType;
  amount: number;
}) {
  const authContext = useContext(AuthContext);
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserType>({} as UserType);
  const [refunderInput, setRefunderInput] = useState("");
  const [addedDebts, setAddedDebts] = useState(
    [] as { email: string; percentage: number; amount: number }[],
  );

  useEffect(() => {
    getUserLogin();
  }, []);

  const handleInputChange = (event: any) => {
    setRefunderInput(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    setError("");
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
        console.error("Erreur lors de la récupération de l'utilisateur", error);
      });
  };

  const handleAddUserDebts = async () => {
    if (percentage <= 0 || percentage > 100) {
      setError("Le pourcentage doit être compris entre 1 et 100.");
      return;
    }

    if (refunderInput.length === 0) {
      setError("Utilisateur non spécifié.");
      return;
    }

    if (refunderInput === user.email) {
      setError("Vous ne pouvez pas vous rembourser vous-même.");
      return;
    }

    const refunder = props.group.members.filter((v) => {
      console.log(v);
      return v.email === refunderInput;
    });

    console.log(refunder);

    if (refunder.length === 0) {
      setError("L'utilisateur n'est pas membre du groupe.");
      return;
    }

    const debt = {
      payerId: props.payerId,
      refunderId: refunder[0]._id,
      idGroup: props.group._id,
      amount: props.amount * (percentage / 100),
    };

    const newRefund = {
      email: refunder[0].email,
      percentage: percentage,
      amount: debt.amount,
    };

    console.log(debt);
    console.log(authContext.getToken());
    await instance
      .put(`/debts/${props.group._id}`, debt, {
        headers: {
          Authorization: `Bearer ${authContext.getToken()}`,
        },
      })
      .then((r) => {
        console.log("marche", r);
        setAddedDebts([...addedDebts, newRefund]);
        console.log(addedDebts);
        setPercentage(0);
        setError("");
      })
      .catch((error) => {
        console.error("marche pas", error);
      });
  };

  return (
    <>
      <Stack spacing={4}>
        <FormControl id="">
          <FormLabel>Entrez l'adresse mail d'un membre</FormLabel>
          <Input
            onChange={(e) => handleInputChange(e)}
            onKeyDown={handleInputKeyDown}
            placeholder="Entrez une adresse email"
            value={refunderInput}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Pourcentage de Remboursement :</FormLabel>
          <Input
            onChange={(e) => setPercentage(Number(e.target.value))}
            placeholder="Entrez le pourcentage"
            type="number"
            value={percentage}
          />
        </FormControl>
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="orange" onClick={handleAddUserDebts}>
          Ajouter
        </Button>
      </Stack>
      <Stack mt={4} spacing={4}>
        <Text>Liste des remboursements ajoutés :</Text>
        {addedDebts.map((debt, index) => (
          <Flex key={index} align="center">
            <Text>
              {debt.email} - Pourcentage: {debt.percentage}%, Montant:{" "}
              {debt.amount}
            </Text>
          </Flex>
        ))}
      </Stack>
    </>
  );
}

export default AddDebts;
