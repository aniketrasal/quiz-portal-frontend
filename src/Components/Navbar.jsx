import {Flex, Heading } from "@chakra-ui/react";
import React from "react";
export const Navbar = () => {
  return (
    <Flex
      h="80px"
      justifyContent={"start"}
      alignItems={"center"}
      color={"white"}
      bg="gray"
      
      
    >
        <Heading marginLeft={"5px"} size={"xl"}>Quiz Portal</Heading>

    </Flex>
  );
};