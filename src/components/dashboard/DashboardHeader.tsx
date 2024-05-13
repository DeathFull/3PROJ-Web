import {
    Avatar,
    Button,
    Flex,
    Heading, Icon, Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer
} from "@chakra-ui/react";
import {IoIosLogOut} from "react-icons/io";
import {AuthContext} from "../../context/AuthContext.tsx";
import {useContext} from "react";

function DashboardHeader() {
    const authContext = useContext(AuthContext);

    const handleLogout = () => {
        authContext.setToken("")
    };
    return (
        <Flex justify={"center"} p={"10"} bgColor={"#d17d00"}>
            <Heading color={"white"} size={"md"}>UniFinance</Heading>
            <Spacer/>
            <Heading size={"md"}>
                <Menu>
                    <MenuButton
                        as={Button}
                        minW={0}
                        cursor={'pointer'}
                        rounded={'full'}
                        variant={'link'}>
                        <Avatar
                            size={'sm'}
                            src={
                                'https://bit.ly/broken-link'
                            }
                        />
                    </MenuButton>
                    <MenuList>
                        <Link href={"/"}>
                            <MenuItem onClick={handleLogout}>
                                <Icon as={IoIosLogOut} boxSize={6} mr={"5"}/>
                                Déconnexion
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </Heading>
        </Flex>
    );
}

export default DashboardHeader;
