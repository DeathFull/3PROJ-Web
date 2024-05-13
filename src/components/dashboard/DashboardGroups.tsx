import { Box, Center, Heading } from "@chakra-ui/react";

function DashboardGroups() {
    return (
        <>
            <Box
                justifyContent={"center"}
                flexDir={"column"}
                display={"flex"}
                w={"100%"}
            >
                <Center>
                    <Heading>Groups</Heading>
                </Center>
            </Box>
        </>
    );
}

export default DashboardGroups;
