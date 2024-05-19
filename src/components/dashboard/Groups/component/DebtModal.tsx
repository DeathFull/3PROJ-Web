import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../context/AuthContext.tsx";
import instance from "../../../../api/ApiConfig.tsx";
import {
    Table, TableContainer,
    Tbody,
    Td, Th, Thead,
    Tr
} from "@chakra-ui/react";


function DebtModal() {   interface User {
        email: string;
    }

    interface Debt {
        _id: string;
        receiverId: string;
        refunderId: string;
        idUser: User;
        amount: number;
    }

    const {id} = useParams<{ id: string }>();
    const [debts, setDebts] = useState<Debt[]>([]);
    const authContext = useContext(AuthContext);

    const getGroupDebts = async () => {
        try {
            const response = await instance.get(`/debts/${id}`, {
                headers: {
                    Authorization: `Bearer ${authContext.getToken()}`,
                },
            });
            setDebts(response.data);
            console.log(debts)
        } catch (error) {
            console.error("Erreur lors de la récupération des remboursements :", error);
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
                        </Tr>
                    </Thead>
                    <Tbody>
                        {debts.map((debt) => debt.idUser !== null && (
                            <Tr key={debt._id}>
                                <Td>{debt.receiverId}</Td>
                                <Td>{debt.refunderId}</Td>
                                <Td isNumeric>{debt.amount} €</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}


export default DebtModal;