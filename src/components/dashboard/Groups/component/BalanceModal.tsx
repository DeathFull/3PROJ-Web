import instance from "../../../../api/ApiConfig.tsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext.tsx";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function BalanceModal() {
  interface User {
    email: string;
  }

  interface Balance {
    _id: string;
    balance: number;
    idUser: User;
  }

  const { id } = useParams<{ id: string }>();
  const [balances, setBalances] = useState<Balance[]>([]);
  const authContext = useContext(AuthContext);

  const getBalanceUser = async () => {
    try {
      const response = await instance.get(`/balances/group/${id}`, {
        headers: {
          Authorization: `Bearer ${authContext.getToken()}`,
        },
      });
      setBalances(response.data);
      console.log(balances);
    } catch (error) {
      console.error("Erreur lors de la récupération des soldes :", error);
    }
  };

  useEffect(() => {
    getBalanceUser().then();
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Utilisateur</Th>
              <Th isNumeric>Solde</Th>
            </Tr>
          </Thead>
          <Tbody>
            {balances.map(
              (balance) =>
                balance.idUser !== null && (
                  <Tr key={balance._id}>
                    <Td>{balance.idUser.email}</Td>
                    <Td isNumeric>{balance.balance} €</Td>
                  </Tr>
                ),
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BalanceModal;
