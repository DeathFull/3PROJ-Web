import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import instance from "../../api/ApiConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserType from "../../types/UserType";
import ExpensesChart from "../ExpensesChart";

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
        idGroup: string;
    }

    const authContext = useContext(AuthContext);
    const [user, setUser] = useState<UserType>({} as UserType);
    const [totalBalance, setTotalBalance] = useState(0);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [groups, setGroups] = useState<{ [key: string]: string }>({});
    const [groupBalances, setGroupBalances] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        getUser();
        getBalance();
        getUserExpenses();
    }, []);

    const getUser = () => {
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

    const getBalance = () => {
        instance
            .get(`/balances/user`, {
                headers: {
                    Authorization: `Bearer ${authContext.getToken()}`,
                },
            })
            .then((r) => {
                let totalBalance = 0;
                const balances: { [key: string]: number } = {};
                r.data.forEach((balance: { balance: number; idGroup: string }) => {
                    totalBalance += balance.balance;
                    balances[balance.idGroup] = (balances[balance.idGroup] || 0) + balance.balance;
                });
                console.log("Solde total :", totalBalance);
                setTotalBalance(totalBalance);
                setGroupBalances(balances);
            })
            .catch((error) => {
                console.error("nononono", error);
            });
    };

    const getUserExpenses = async () => {
        try {
            const response = await instance.get(`/expenses/user`, {
                headers: {
                    Authorization: `Bearer ${authContext.getToken()}`,
                },
            });

            const sortedExpenses = response.data.sort((a: Expense, b: Expense) => new Date(b.date).getTime() - new Date(a.date).getTime());
            const latestExpenses = sortedExpenses.slice(0, 10);
            setExpenses(latestExpenses);

            const groupIds = [...new Set(latestExpenses.map((expense) => expense.idGroup))];
            const groupResponses = await Promise.all(
                groupIds.map((idGroup) =>
                    instance.get(`/groups/${idGroup}`, {
                        headers: {
                            Authorization: `Bearer ${authContext.getToken()}`,
                        },
                    })
                )
            );

            const groups: { [key: string]: string } = {};
            groupResponses.forEach((response) => {
                groups[response.data._id] = response.data.name;
            });
            setGroups(groups);
        } catch (error) {
            console.error("nononono", error);
        }
    };

    return (
        <>
            <Box flexDir={"column"} display={"flex"} w={"100%"} p={6}>
                <Center>
                    <Stack w={"100%"} maxW={"75%"} spacing={6}>
                        <Box p={6} bg="gray.100" borderRadius="xl">
                            <Heading mb={4} size="lg">
                                Bienvenue sur votre compte, {user.firstname}
                            </Heading>
                            <Box p={6} bg="white">
                                <Heading mb={2} size="md">
                                    Votre Solde :
                                </Heading>
                                <Heading size="2xl">{totalBalance} €</Heading>
                            </Box>
                            <Box p={6} bg="white">
                                <Heading mb={2} size="md">
                                    Vos dernières dépenses :
                                </Heading>
                                {expenses.map((expense) => (
                                    <Box key={expense._id} mb={2} p={4} bg="gray.200" borderRadius="xl">
                                        <Text fontWeight="bold">{expense.name}</Text>
                                        <Text>{expense.description}</Text>
                                        <Text>{expense.amount} €</Text>
                                    </Box>
                                ))}
                                <ExpensesChart expenses={expenses} balances={groupBalances} groupNames={groups} />
                            </Box>
                        </Box>
                    </Stack>
                </Center>
            </Box>
        </>
    );
}

export default DashboardHome;
