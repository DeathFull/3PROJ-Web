import {Box, Button, Grid, GridItem, Link, ListItem, UnorderedList} from "@chakra-ui/react";

function Footer() {
    return (
        <Box py={4} color="white" bg="#D27E00">
            <Grid gap={6} templateColumns="repeat(3, 1fr)">
                <GridItem>
                    <Box textAlign="center">
                        <h1>SiteMap</h1>
                    </Box>
                    <Box ml={15}>
                        <UnorderedList>
                            <ListItem><Link href="/">Accueil</Link></ListItem>
                            <ListItem><Link href="/about">À propos</Link></ListItem>
                            <ListItem><Link href="/login">Se connecter</Link></ListItem>
                            <ListItem><Link href="/signup">Créer un compte</Link></ListItem>
                        </UnorderedList>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box textAlign="center">
                        <h1>Support</h1>
                    </Box>
                    <Box ml={15}>
                        <UnorderedList>
                            <ListItem><Link href="/">FeedBack</Link></ListItem>
                            <ListItem><Link href="/about">FAQ</Link></ListItem>
                            <ListItem><Link href="/login">Blog</Link></ListItem>
                        </UnorderedList>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box textAlign="center">
                        <h1>Télécharger notre application</h1>
                        <Button w="150px" mt={25} mr={10} bg={"#A4C639"}>
                            Installer (Android)
                        </Button>
                        <Button w="150px" mt={25} bg={"#51A0E9"}>
                            Installer (iOS)
                        </Button>
                    </Box>
                </GridItem>
            </Grid>
            <Box mr={25} textAlign="right">
                <p>© UniFinance 2024 - made in France, FR.</p>
            </Box>
        </Box>
    );
}

export default Footer;
