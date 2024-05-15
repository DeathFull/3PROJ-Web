import { Box, Center, Heading } from "@chakra-ui/react";

function HomeGroups() {
    return (
        <>
            <Box
                justifyContent={"center"}
                flexDir={"column"}
                display={"flex"}
                w={"100%"}
            >
                <Center>
                    <Heading>Test</Heading>
                </Center>
            </Box>
        </>
    );
}

export default HomeGroups;
