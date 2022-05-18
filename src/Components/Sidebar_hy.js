import {
    Box,
    Flex,
    Icon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {FaBook, FaHandsHelping, FaHome, FaSearch, FaTools} from "react-icons/fa";
import {Link} from "react-router-dom";

function NavItem(props) {
    // Color Settings
    const textColor = useColorModeValue("gray.600", "gray.400");
    const hoverBgColor = useColorModeValue("gray.100", "gray.900");
    const hoverTextColor = useColorModeValue("gray.900", "gray.200");

    const {icon, children} = props;

    return (
        <Flex
            align="center"
            px="4"
            py="3"
            cursor="pointer"
            color={textColor}
            _hover={{
                bg: hoverBgColor,
                color: hoverTextColor,
            }}
            fontWeight="600"
            transition=".15s ease"
        >
            {icon && (
                <Icon
                    ml="2"
                    mr='4'
                    boxSize="6"
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
}

function SidebarContent(props) {
    // Color Settings
    const textColor = useColorModeValue("brand.500", "white");
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("inherit", "gray.700");


    return (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            bg={bgColor}
            borderColor={borderColor}
            borderRightWidth="1px"
            w="60"
            display='block'
        >
            <Flex px="4" py="5" align="center">
                <Text
                    fontSize="2xl"
                    ml="2"
                    color={textColor}
                    fontWeight="600"
                >
                    LOGO
                </Text>
            </Flex>
            <Flex
                direction="column"
                fontSize="sm"
            >
                <Link to="/">
                    <NavItem icon={FaHome}>HOME</NavItem>
                </Link>
                <Link to="/search">
                    <NavItem icon={FaSearch}>SEARCH</NavItem>
                </Link>
                <Link to="/tool">
                    <NavItem icon={FaTools}>TOOL</NavItem>
                </Link>
                <Link to="/help">
                    <NavItem icon={FaHandsHelping}>HELP</NavItem>
                </Link>
                <Link to="/reference">
                    <NavItem icon={FaBook}>REFERENCE</NavItem>
                </Link>
            </Flex>
        </Box>
    )
}

function Header(props) {
    // Color Settings
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("inherit", "gray.700");


    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg={bgColor}
            borderBottomWidth="1px"
            borderColor={borderColor}
            h="14"
        >
            {props.children}
        </Flex>
    )
}



export default function Sidebar(props) {
    // Color Settings
    const bgColor = useColorModeValue("gray.50", "gray.700");

    return (
        <Box
            bg={bgColor}
            minH="100vh"
        >
            <SidebarContent/>
            <Box ml='60'>
                <Header>

                </Header>
                <Box as="main" p="4">
                    {props.children}
                </Box>
            </Box>
        </Box>
    );
}
