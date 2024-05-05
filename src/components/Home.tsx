import {Heading, Text, useBreakpointValue} from "@chakra-ui/react";

function Home() {
    return (
        <>
                <Heading as="h4" ml={75} size="md">
                    Remboursez votre ami à tout moment
                </Heading>
                <Text
                    w={600}
                    ml={75}
                    color={"#ffffff"}
                    fontFamily={"heading"}
                    fontSize={{base: "lg", md: "lg"}}
                    fontWeight={600}
                    textAlign={useBreakpointValue({base: "center", md: "left"})}
                    bg={"#D27E00"}
                    border={"4px solid #D27E00"}
                    borderRadius={15}
                >
                    Bienvenue sur UniFinance ! Vous avez sûrement déjà été dans cette
                    situation : vous partez en voyage avec des amis, partagez un repas ou
                    organisez une soirée ensemble, et les comptes s'accumulent. Mais jongler
                    avec les remboursements et les emprunts peut être fastidieux. C'est là
                    qu'intervient UniFinance, votre allié pour simplifier la gestion
                    financière entre amis.
                </Text>
        </>
    );
}

export default Home;
