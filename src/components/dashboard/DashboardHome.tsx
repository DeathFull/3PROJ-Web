import {Box, Center, Heading, Stack, Text} from "@chakra-ui/react";
import instance from "../../api/ApiConfig.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";
import UserType from "../../types/UserType.tsx";
import { Pie } from 'react-chartjs-2';

function DashboardHome() {

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

    const authContext = useContext(AuthContext);
    const [user, setUser] = useState<UserType>({} as UserType);
    const [totalBalance, setTotalbalance] = useState(0)
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [groups, setGroups] = useState({});


    useEffect(() => {
        getUser();
        getBalance();
        getUserExpenses().then();
    }, []);


    const getUser = () => {
        instance.get(`/users`, {
            headers: {
                Authorization: `Bearer ${authContext.getToken()}`,
            },
        })
            .then((r) => {
                setUser(r.data)
                console.log(r.data)
            })
            .catch((error) => {
                console.error("non non non", error)
            });
    };

    const getBalance = () => {
        instance.get(`/balances/user`, {
            headers: {
                Authorization: `Bearer ${authContext.getToken()}`,
            },
        })
            .then((r) => {
                let totalBalance = 0;
                r.data.forEach((balance) => {
                    totalBalance += balance.balance;
                });
                console.log("Solde total :", totalBalance);
                setTotalbalance(totalBalance);
            })
            .catch((error) => {
                console.error("nononono", error)
            })
    }
    const getUserExpenses = async () => {
        try {
            const response = await instance.get(`/expenses/user`, {
                headers: {
                    Authorization: `Bearer ${authContext.getToken()}`,
                },
            })
            const sortedExpenses = response.data.sort((a, b) => b.date - a.date);
            const latestExpenses = sortedExpenses.slice(0, 10);
            setExpenses(latestExpenses);
            console.log(expenses)

            const groupIds = [...new Set(latestExpenses.map(expense => expense.idGroup))];
            console.log(groupIds)
            const groupResponses = await Promise.all(groupIds.map(idGroup =>
                instance.get(`/groups/${idGroup}`, {
                    headers: {
                        Authorization: `Bearer ${authContext.getToken()}`,
                    },
                })
            ));

            const groups = {};
            groupResponses.forEach(response => {
                groups[response.data._id] = response.data.name;

            });
            setGroups(groups);
        }catch(error)  {
                console.error("nononono", error)
            }
    }


    return (
        <>
            <Box flexDir={"column"} display={"flex"} w={"100%"} p={6}>
                <Center>
                    <Stack w={"100%"} maxW={"75%"} spacing={6}>
                        <Box p={6} bg="gray.100" borderRadius="xl">
                            <Heading mb={4} size="lg">Bienvenue sur votre compte, {user.firstname}</Heading>
                            <Box p={6} bg="white">
                                <Heading mb={2} size="md">Votre Solde :</Heading>
                                <Heading size="2xl">{totalBalance} €</Heading>
                            </Box>
                            <Box p={6} bg="white" >
                                <Heading mb={2} size="md">Vos dernières dépenses :</Heading>
                                {expenses.map((expense) => (
                                    <Box key={expense._id} mb={2} p={4} bg="gray.200" borderRadius="xl">
                                        <Text fontWeight="bold">{expense.name}</Text>
                                        <Text>{expense.description}</Text>
                                        <Text>{expense.amount} €</Text>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Stack>
                </Center>
            </Box>
        </>
    );
}

export default DashboardHome;
