import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../context/AuthContext.tsx";
import instance from "../../../../api/ApiConfig.tsx";
import {
    Button, FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Stack,
    Table, TableContainer,
    Tbody,
    Td, Th, Thead,
    Tr
} from "@chakra-ui/react";
import UserType from "../../../../types/UserType.tsx";

function ExpensesModal(props: { user: UserType }) {
    interface User {
        email: string;
    }

    interface Expense {
        _id: string;
        name: string;
        description: string;
        amount: number;
        date: string;
        justification: string;
        category: string;
        idUser: User;
    }

    const {id} = useParams<{ id: string }>();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const authContext = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [justification, setJustification] = useState("");
    const [category, setCategory] = useState("");


    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setName("");
        setDescription("");
        setAmount(0);
        setDate("");
        setJustification("");
        setCategory("");
        setIsOpen(false);
    };

    const getExpensesUser = async () => {
        try {
            const response = await instance.get(`/expenses/group/${id}`, {
                headers: {
                    Authorization: `Bearer ${authContext.getToken()}`,
                },
            });
            setExpenses(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des dépenses :", error);
        }
    };

    useEffect(() => {
        getExpensesUser().then();
    }, []);

    const handleSubmitExpenses = (user = props.user) => {
        const User = user._id;
        instance.post(`/expenses/`, {
            idGroup: id,
            idUser: User,
            name,
            description,
            amount,
            date,
            justification,
            category
        }, {
            headers: {
                Authorization: `Bearer ${authContext.getToken()}`,
            },
        }).then((r) => {
            console.log("dépense créer", r);
            getExpensesUser().then();
            handleCloseModal();
        }).catch((error) => {
            console.error("Marche pas:", error);
        });
    }

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Utilisateur</Th>
                            <Th>Nom</Th>
                            <Th >Description</Th>
                            <Th isNumeric>Montant</Th>
                            <Th>Date</Th>
                            <Th>Justification</Th>
                            <Th>Catégorie</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {expenses.map((expense) => expense.idUser !== null && (
                            <Tr key={expense._id}>
                                <Td>{expense.idUser.email}</Td>
                                <Td>{expense.name}</Td>
                                <Td>{expense.description}</Td>
                                <Td isNumeric>{expense.amount} €</Td>
                                <Td>{expense.date}</Td>
                                <Td>{expense.justification}</Td>
                                <Td>{expense.category}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Button color="white" bg="#D27E00" onClick={handleOpenModal}>Ajouter une dépense</Button>
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Ajouter une dépense</ModalHeader>
                    <ModalBody>
                        <form>
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel>Nom :</FormLabel>
                                    <Input onChange={(e) => setName(e.target.value)} type="text" value={name}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description :</FormLabel>
                                    <Input onChange={(e) => setDescription(e.target.value)} type="text"
                                           value={description}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Montant :</FormLabel>
                                    <Input onChange={(e) => setAmount(Number(e.target.value))} type="number"
                                           value={amount}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Date :</FormLabel>
                                    <Input onChange={(e) => setDate(e.target.value)} type="date" value={date}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Justification :</FormLabel>
                                    <Input onChange={(e) => setJustification(e.target.value)} type="text"
                                           value={justification}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Catégorie :</FormLabel>
                                    <Input onChange={(e) => setCategory(e.target.value)} type="text" value={category}/>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} bg="#D27E00" onClick={handleCloseModal}>
                            Fermer
                        </Button>
                        <Button bg="#D27E00" onClick={() => handleSubmitExpenses()} variant="ghost">Ajouter</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default ExpensesModal;