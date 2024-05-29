import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext.tsx";
import instance from "../../../../api/ApiConfig.tsx";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import DebtType from "../../../../types/DebtType.tsx";
import UserType from "../../../../types/UserType.tsx";

function DebtModal(props: { user: UserType }) {
  const { id } = useParams<{ id: string }>();
  const [debts, setDebts] = useState<DebtType[]>([]);
  const authContext = useContext(AuthContext);

  const getGroupDebts = async () => {
    try {
      const response = await instance.get(`/debts/${id}`, {
        headers: {
          Authorization: `Bearer ${authContext.getToken()}`,
        },
      });
      setDebts(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des remboursements :",
        error,
      );
    }
  };

  const handleDebt = async (debt) => {
    try {
      const newDebt = { refunderId: debt.receiverId._id, amount: -debt.amount };
      const newRefund = {
        payerId: debt.receiverId._id,
        refunderId: debt.refunderId._id,
        idGroup: id,
        amount: debt.amount,
        date: new Date(),
      };
      await instance.put(`/debts/${id}`, newDebt, {
        headers: {
          Authorization: `Bearer ${authContext.getToken()}`,
        },
      });

      await instance.post(`/refunds/`, newRefund, {
        headers: {
          Authorization: `Bearer ${authContext.getToken()}`,
        },
      });

      await getGroupDebts();
    } catch (error) {
      console.error("Erreur lors de la modification dce la dette :", error);
    }
  };

  useEffect(() => {
    getGroupDebts().then();
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Créditeur</Th>
              <Th>Débiteur</Th>
              <Th>Montant</Th>
              <Th>Régler la somme</Th>
            </Tr>
          </Thead>
          <Tbody>
            {debts.map(
              (debt) =>
                debt.idUser !== null &&
                debt.amount > 0 &&
                debt.refunderId._id === props.user._id && (
                  <Tr key={debt._id}>
                    <Td>{debt.receiverId.email}</Td>
                    <Td>{debt.refunderId.email}</Td>
                    <Td isNumeric>{debt.amount} €</Td>
                    <Td>
                      <Button
                        mt={2}
                        color="white"
                        bg="#D27E00"
                        onClick={() => handleDebt(debt)}
                      >
                        Régler la somme
                      </Button>
                    </Td>
                  </Tr>
                ),
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DebtModal;
