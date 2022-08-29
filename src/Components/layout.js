import React, { Component, useEffect, useState } from "react";
import {
  Input,
  Box,
  Stack,
  Heading,
  Button,
  InputGroup,
  InputLeftElement,
  Container,
  Link,
} from "@chakra-ui/react";
import {
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Spacer,
  IconButton,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import {
  Search2Icon,
  MoonIcon,
  EmailIcon,
  SunIcon,
  ChatIcon,
  HamburgerIcon,
  LinkIcon,
} from "@chakra-ui/icons";
import {
  FaGithub,
  FaHeart,
  FaBookmark,
  FaCode,
  FaHome,
} from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const RouteChange = (opt) => {
    let GithubPage = "https://github.com/sysu-software-2022/DS3P.git";
    let Email = "mailto:sysu_software2022@163.com";
    let University_home_page = "https://www.sysu.edu.cn";
    if (opt === "github") {
      window.open(GithubPage, "_blank", "noopener,noreferrer");
    } else if (opt === "email") {
      window.open(Email, "_blank", "noopener,noreferrer");
    }
    else if (opt === "uiversity_home_page") {
        window.open(University_home_page, "_blank", "noopener,noreferrer");
    }
  };


export default function Layout(props){
    const { colorMode, toggleColorMode } = useColorMode();
    return (
          <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: "none", md: "flex" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
          >
            <Tooltip label="Github" placement="auto-start">
              <IconButton
                colorScheme="tail"
                icon={<FaGithub />}
                marginRight="5px"
                variant="ghost"
                onClick={() => RouteChange("github")}
              />
            </Tooltip>
                    
            <Tooltip label="Email" placement="auto-start">
              <IconButton
                colorScheme="tail"
                icon={<EmailIcon />}
                marginRight="5px"
                variant="ghost"
                onClick={() => RouteChange("email")}
              />
            </Tooltip>
                    
            <Tooltip label="Sun Yat-sen University Home Page" placement="auto-start">
              <IconButton
                colorScheme="tail"
                icon={<LinkIcon />}
                marginRight="5px"
                variant="ghost"
                onClick={() => RouteChange("uiversity_home_page")}
              />
            </Tooltip>

          </Stack>

    );
};


