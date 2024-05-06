import { Flex, Heading, Spacer } from "@chakra-ui/react";

function DashboardHeader() {
  return (
    <Flex p={"10"} justify={"center"} bgColor={"#d17d00"}>
      <Heading size={"md"}>UniFinance</Heading>
      <Spacer />
      <Heading size={"md"}>Ok</Heading>
    </Flex>
  );
}

export default DashboardHeader;
