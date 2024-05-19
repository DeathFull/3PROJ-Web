import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Input,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext.tsx";

function DashboardMessage() {
  const authContext = useContext(AuthContext);
  const [messages, setMessages] = useState([] as string[]);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState([
    "Conversation 1",
    "Conversation 2",
  ]);

  const socket = io("http://localhost:3000/");

  useEffect(() => {
    socket.auth = { token: authContext.getToken() };
    socket.connect();
  }, []);

  //socket.on("", () => {});

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

    return (
        <Box w="100%" p={4} bg="gray.100">
            <Center mb={4}>
                <Heading>Messages</Heading>
            </Center>
            <HStack h={"75%"}spacing={4}>
                <VStack
                    overflowY="auto"
                    w="25%"
                    h={"100%"}
                    p={4}
                    bg="white"
                    borderRadius="md"
                    shadow="md"
                    divider={<StackDivider />}
                >
                    {conversations.map((conversation, index) => (
                        <Button key={index} justifyContent="flex-start" w="full" >
                            {conversation}
                        </Button>
                    ))}
                </VStack>
                <VStack
                    w="75%"
                    h={"100%"}
                    p={4}
                    bg="white"
                    borderRadius="md"
                    shadow="md"
                    spacing={4}
                >
                    {messages.map((message, index) => (
                        <HStack key={index} justify={index % 2 === 0 ? 'flex-start' : 'flex-end'} w="full">
                            <Box
                                maxW="80%"
                                p={3}
                                bg={index % 2 === 0 ? '#d17d00' : 'gray.100'}
                                borderRadius="md"
                            >
                                <Text>{message}</Text>
                            </Box>
                        </HStack>
                    ))}
                </VStack>
            </HStack>
            <HStack pos="relative" mt={4} spacing={4}>
                <Input
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Envoyer un message..."
                    value={newMessage}
                />
                <Button color={"white"} bg={"#d17d00"} onClick={handleSendMessage}>
                    Send
                </Button>
            </HStack>
            <IconButton
                pos="fixed"
                right={4}
                bottom={4}
                borderRadius="full"
                aria-label={"Ajouter une conversation"}
                colorScheme="orange"
                icon={<AddIcon />}
                onClick={() => alert('test test')}
            />
        </Box>
    );
}

export default DashboardMessage;
