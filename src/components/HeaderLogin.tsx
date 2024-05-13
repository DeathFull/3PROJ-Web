import {
    Box,
    Button,
    Collapse,
    Flex,
    Icon, Link,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import {
    ChevronDownIcon,
} from "@chakra-ui/icons";

export default function Header() {
    const { isOpen } = useDisclosure();

    return (
        <Box
         bg={useColorModeValue("#D27E00", "gray.800")}>
            <Flex
                align={"center"}
                direction={{ base: "column", md: "row" }}
                minH={"60px"}
                mt={3}
                px={{ base: 4 }}
                py={{ base: 2 }}
                color={useColorModeValue("gray.600", "white")}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                borderBottom={1}
            >
                <Flex
                    justify={{ base: "center", md: "start" }}
                    flex={{ base: 1 }}
                    mb={{ base: 2, md: 0 }}
                >
                    <Text
                        ml={{ base: 0, md: 150 }}
                        color={"#ffffff"}
                        fontFamily={"heading"}
                        fontSize={{ base: "2xl", md: "4xl" }}
                        fontWeight={600}
                        textAlign={useBreakpointValue({ base: "center", md: "left" })}

                    >
                        <Link href={''}>UniFinances</Link>
                    </Text>
                </Flex>

                <Stack
                    justify={{ base: "center", md: "flex-end" }}
                    direction={{ base: "column", md: "row" }}
                    flex={{ base: 1, md: 0 }}
                    spacing={6}
                >
                    <Button
                        as={"a"}
                        color={"white"}
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight={600}
                        href={"about"}
                        variant={"link"}
                    >
                        À propos
                    </Button>
                    <Button
                        as={"a"}
                        color={"white"}
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight={600}
                        href={"login"}
                        variant={"link"}
                    >
                        Connexion
                    </Button>
                    <Button
                        as={"a"}
                        display={{ base: "none", md: "inline-flex" }}
                        color={"white"}
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight={600}
                        bg={"#E1A03D"}
                        border={"4px solid orange"}
                        borderRadius={0}
                        _hover={{
                            bg: "#f6bf3f",
                        }}
                        href={"inscription"}
                    >
                        Créer un compte
                    </Button>
                </Stack>
            </Flex>

            <Collapse animateOpacity in={isOpen}>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const MobileNav = () => {
    return (
        <Stack
            display={{ md: "none" }}
            p={4}
            bg={useColorModeValue("white", "gray.800")}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack onClick={children && onToggle} spacing={4}>
            <Box
                as="a"
                alignItems="center"
                justifyContent="space-between"
                py={2}
                _hover={{
                    textDecoration: "none",
                }}
                href={href ?? "#"}
            >
                <Text
                    color={useColorModeValue("gray.600", "gray.200")}
                    fontWeight={600}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        w={6}
                        h={6}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        transition={"all .25s ease-in-out"}
                    />
                )}
            </Box>

            <Collapse animateOpacity in={isOpen} style={{ marginTop: "0!important" }}>
                <Stack
                    align={"start"}
                    mt={2}
                    pl={4}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    borderLeft={1}
                >
                    {children &&
                        children.map((child) => (
                            <Box key={child.label} as="a" py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: "A propos",
        href: "#",
    },
];
