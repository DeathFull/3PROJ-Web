import {useContext, useEffect, useState} from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Tag,
    TagCloseButton,
    TagLabel,
    Text
} from "@chakra-ui/react";
import instance from "../../../../api/ApiConfig.tsx";
import UserType from "../../../../types/UserType.tsx";
import {AuthContext} from "../../../../context/AuthContext.tsx";

function AddDebts(props: {
    payerId: string;
    groupId: string | undefined;
    amount: number;
}) {
    const [members, setMembers] = useState("");
    const authContext = useContext(AuthContext);
    const [percentage, setPercentage] = useState(0);
    const [error, setError] = useState("");
    const [tags, setTags] = useState([] as string[]);
    const [user, setUser] = useState<UserType>({} as UserType);
    const [refunder, setRefunder] = useState<UserType>({} as UserType);
    const [addedDebts, setAddedDebts] = useState([] as { email: string; percentage: number; amount: number }[]);

    useEffect(() => {
        getUserLogin();
    }, []);

    const handleInputChange = (event: any) => {
        setMembers(event.target.value);
    }

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const newTag = members.trim();
            if (newTag && newTag !== user.email) {
                getUserByEmail(newTag).then((v) => {
                    if (v && !tags.includes(newTag)) {
                        setTags([...tags, newTag]);
                        setMembers('');
                    }
                });
            }
        }
    };

    const getUserLogin = () => {
        instance.get(`/users`, {
            headers: {
                Authorization: `Bearer ${authContext.getToken()}`,
            },
        })
            .then((r) => {
                setUser(r.data)
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération de l'utilisateur", error)
            });
    };

    const getUserByEmail = async (email: string) => {
        try {
            const r = await instance.get(`users/email/${email}`, {
                headers: {
                    Authorization: `Bearer ${authContext.getToken()}`,
                },
            });
            const userEmail = r.data;
            setRefunder(userEmail)
            return userEmail;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur par email", error);
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    const handleAddUserDebts = async () => {
        if (percentage < 0 || percentage > 100) {
            setError("Le pourcentage doit être compris entre 0 et 100.");
            return;
        }

        const debt = {
            payerId: props.payerId, refunderId: refunder._id, idGroup: props.groupId,
            amount: (props.amount * (percentage / 100))
        }
        const newRefund = { email: refunder.email, percentage: percentage, amount: debt.amount };
        console.log(debt)
        console.log(authContext.getToken())
        await instance.put(`/debts/${props.groupId}`, debt, {
            headers: {
                Authorization: `Bearer ${authContext.getToken()}`,
            },
        }).then((r) => {
            console.log("marche", r)
            setAddedDebts([...addedDebts, newRefund]);
            console.log(addedDebts)
            setPercentage(0);
            setError("");
        }).catch((error) => {
            console.error("marche pas", error)
        })

    };

    return (
        <>
            <Stack spacing={4}>
                <FormControl id="">
                    <FormLabel>Entrez les adresses email des membres</FormLabel>
                    <Input
                        onChange={(e) => handleInputChange(e)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Entrez des adresses email"
                        value={members}
                    />
                    <Flex mt={2}>
                        {tags.map((tag, index) => (
                            <Tag key={index} mr={1} mb={1} bg="#D27E00" variant="solid">
                                <TagLabel>{tag}</TagLabel>
                                <TagCloseButton onClick={() => handleTagRemove(tag)}/>
                            </Tag>
                        ))}
                    </Flex>
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
                <Button
                    colorScheme="orange"
                    onClick={handleAddUserDebts}
                >
                    Ajouter
                </Button>
            </Stack>
            <Stack mt={4} spacing={4}>
                <Text>Liste des remboursements ajoutés :</Text>
                {addedDebts.map((debt, index) => (
                    <Flex key={index} align="center">
                        <Text>{debt.email} - Pourcentage: {debt.percentage}%, Montant: {debt.amount}</Text>
                    </Flex>
                ))}
            </Stack>
        </>
    );
}

export default AddDebts;
