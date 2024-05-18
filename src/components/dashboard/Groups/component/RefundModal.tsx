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


function RefundModal() {

    interface User {
        email: string;
    }

    interface Refund {
        _id: string;
        payerId: string;
        refunderId: string;
        idUser: User;
        amount: number;
    }

    const {id} = useParams<{ id: string }>();
    const [refunds, setRefunds] = useState<Refund[]>([]);
    const authContext = useContext(AuthContext);

    const getRefundUser = async () => {
        try {
            const response = await instance.get(`/refunds/group/${id}`, {
                headers: {
                    Authorization: `Bearer ${authContext.getToken()}`,
                },
            });
            setRefunds(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des remboursements :", error);
        }
    };

    useEffect(() => {
        getRefundUser().then();
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
                        {refunds.map((refund) => refund.idUser !== null && (
                            <Tr key={refund._id}>
                                <Td>{refund.payerId}</Td>
                                <Td>{refund.refunderId}</Td>
                                <Td isNumeric>{refund.amount} €</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}


export default RefundModal;