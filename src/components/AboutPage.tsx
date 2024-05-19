import * as React from "react";
import { VStack, Heading, Text, Avatar, Flex, Box } from "@chakra-ui/react";

const teamMembers = [
    {
        name: "Rudy",
        role: "Développeur Full Stack & Chef de Projet",
        avatar: "public/Rudy.png",
    },
    {
        name: "Paul",
        role: "Développeur Mobile",
        avatar: "public/Paul.png",
    },
    {
        name: "Brice",
        role: "Développeur Back-End",
        avatar: "public/Brice.png",
    },
    {
        name: "Flavien",
        role: "Développeur Front-end & Designer UI/UX",
        avatar: "public/Flavien.png",
    },
];

const AboutPage: React.FC = () => {
    return (
        <Flex align="center" justify="space-between" minH="100vh" p={4}>
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
                            w="600px"
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
                            </VStack>
                        </Flex>
                    ))}
                </VStack>
            </Box>
            <Flex
                align="left"
                justify="left"
                w="50%"
                p={4}
            >
                <Text fontSize="xl" fontWeight="bold" textAlign="left">
                    Nous sommes fiers de notre équipe et de notre travail pour créer une expérience de remboursement
                    d'argent entre amis agréable et sécurisée. L'application sert à faliciter les échanges.
                </Text>
            </Flex>
        </Flex>
    );
};


export default AboutPage;
