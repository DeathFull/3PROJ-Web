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


function AddUserRefunds(props: {
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
            console.log(newTag)
            console.log(user.email)
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
                console.log(r.data)
            })
            .catch((error) => {
                console.error("non non non", error)
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
            console.log("test2", userEmail);
            setRefunder(userEmail)
            console.log(refunder)
            return userEmail;
        } catch (error) {
            console.error("non non non2", error);
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    const handleAddUserRefunds = async () => {
        if (percentage < 0 || percentage > 100) {
            setError("Le pourcentage doit être compris entre 0 et 100.");
            return;
        }

        const refund = {
            payerId: props.payerId, refunderId: refunder._id, idGroup: props.groupId,
            amount: (props.amount * (percentage / 100))
        }
        console.log(refund)
        console.log(authContext.getToken())
        await instance.put(`/refunds/${props.groupId}`, refund, {
            headers: {
                Authorization: `Bearer ${authContext.getToken()}`,
            },
        }).then((r) => {
            console.log("marche", r)
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
                    onClick={handleAddUserRefunds}
                >
                    Ajouter
                </Button>
            </Stack>
        </>
    );
}

export default AddUserRefunds;
