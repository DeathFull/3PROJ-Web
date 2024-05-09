import { Flex, Icon, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { IconType } from "react-icons";

function DashboardSidebarLink(props: {
  name: string;
  icon: IconType;
  location?: string;
}) {
  const isActive =
    location.pathname === "/dashboard".concat(props.location ?? "");

  return (
    <Link
      as={ReactRouterLink}
      fontSize={"lg"}
      _focus={{ boxShadow: "none" }}
      style={{ textDecoration: "none" }}
      to={"/dashboard".concat(props.location ?? "")}
    >
      <Flex
        align="center"
        mx="4"
        p="4"
        color={isActive ? "orange" : "white"}
        bg={isActive ? "white" : "none"}
        borderRadius="lg"
        _hover={{
          bg: "white",
          color: "orange",
        }}
        cursor="pointer"
        role="group"
      >
        <Icon
          as={props.icon}
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "orange",
          }}
        />
        {props.name}
      </Flex>
    </Link>
  );
}

export default DashboardSidebarLink;
