import { Center, Grid, GridItem, Heading } from "@chakra-ui/react";

function DashboardHome() {
  return (
    <>
      <Grid
        gap="0"
        autoRows={""}
        templateColumns={"20vw 80vw"}
        templateAreas={`"nav main"
                  "nav main"`}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={"nav"} bg="#d17d00">
          Nav
        </GridItem>
        <GridItem alignSelf={"center"} area={"main"}>
          <Center>
            <Heading>
              Bienvenue {/* TODO: Récupérer le nom de l'utilisateur */ "Rudy"} !
            </Heading>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
}

export default DashboardHome;
