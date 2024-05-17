import {Box, Center, Heading} from "@chakra-ui/react";


function DashboardHome() {

    return (
        <>
            <Box
                justifyContent={"center"}
                flexDir={"column"}
                display={"flex"}
                w={"100%"}
            >
                <Center>
                    <Heading>Bienvenue </Heading>
                </Center>
            </Box>
        </>
    );
}

export default DashboardHome;
