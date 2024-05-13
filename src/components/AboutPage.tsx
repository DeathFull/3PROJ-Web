import * as React from "react";
import { VStack, Heading, Text, Avatar, Flex, Box } from "@chakra-ui/react";

const teamMembers = [
    {
        name: "Rudy",
        role: "Développeur Full Stack & Chef de Projet",
        avatar: "public/Rudy.png",
        description:
            "Rudy",
    },
    {
        name: "Paul",
        role: "Développeur Mobile",
        avatar: "public/Paul.png",
        description:
            "Paul",
    },
    {
        name: "Brice",
        role: "Développeur Back-End",
        avatar: "public/Brice.png",
        description:
            "Brice",
    },
    {
        name: "Flavien",
        role: "Développeur Front-end & Designer UI/UX",
        avatar: "public/Flavien.png",
        description:
            "Flavien",
    },
];

const AboutPage: React.FC = () => {
    return (
        <Flex justify="flex-start">
            <Box w="50%" p={4}>
                <VStack align="center" spacing={8}>
                    <Heading as="h1" size="xl">
                        À propos de notre équipe
                    </Heading>
                    {teamMembers.map((member, index) => (
                        <Flex
                            key={index}
                            align="center"
                            direction="row"
                            maxW="600px"
                            p={4}
                            textAlign="center"
                            shadow="md"
                            rounded="lg"
                        >
                            <Avatar size="xl" src={member.avatar} />
                            <VStack ml={4}>
                                <Heading as="h2" size="lg">
                                    {member.name}
                                </Heading>
                                <Text fontSize="lg" fontWeight="bold">
                                    {member.role}
                                </Text>
                                <Text>{member.description}</Text>
                            </VStack>
                        </Flex>
                    ))}
                </VStack>
            </Box>
            <Box w="50%" p={4}>
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    Nous sommes fiers de notre équipe et de notre travail pour créer une expérience de remboursement
                    d'argent entre amis agréable et sécurisée. L'application sert à faliciter les échanges.
                </Text>
            </Box>
        </Flex>
    );
};


export default AboutPage;
