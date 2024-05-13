import {
    Avatar,
    Button,
    Flex,
    Heading, Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer
} from "@chakra-ui/react";
import {IoIosLogOut} from "react-icons/io";

function DashboardHeader() {
  return (
    <Flex justify={"center"} p={"10"} bgColor={"#d17d00"}>
      <Heading color={"white"} size={"md"}>UniFinance</Heading>
      <Spacer />
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
              <MenuItem>
                  <Icon as={IoIosLogOut} boxSize={6} mr={"5"} />Déconnexion
              </MenuItem>
          </MenuList>
      </Menu>
      </Heading>
    </Flex>
  );
}

export default DashboardHeader;
