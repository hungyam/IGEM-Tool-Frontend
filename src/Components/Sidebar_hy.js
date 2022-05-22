import {
    Box, Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay,
    Flex,
    Icon, IconButton, Switch,
    Text, useColorMode,
    useColorModeValue, useDisclosure,
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {FaBook, FaHandsHelping, FaHome, FaSearch, FaSun, FaTools} from "react-icons/fa";
import {Link, useHref, useLocation, useMatch} from "react-router-dom";
import {FiList} from "react-icons/fi";

function NavItem(props) {
    // Color Settings
    const textColor = useColorModeValue("gray.600", "gray.400");
    const hoverBgColor = useColorModeValue("whiteAlpha.900", "blackAlpha.100");
    const hoverTextColor = useColorModeValue("gray.900", "gray.200");
    const selectedColor = useColorModeValue("whiteAlpha.900", "blackAlpha.700")
    const location = useLocation()


    const {icon, children, path} = props;

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
            bgColor={path === location.pathname && selectedColor}
            color={path === location.pathname && 'teal.700'}
            boxShadow={path === location.pathname && 'sm'}
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
    const bgColor = useColorModeValue("whiteAlpha.700", "blackAlpha.700");

    const {...rest} = props

    return (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            bg={bgColor}
            backdropBlur='10px'
            w="60"
            {...rest}
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
                    <NavItem path='/'
                             icon={FaHome}>HOME</NavItem>
                </Link>
                <Link to="/search">
                    <NavItem path='/search'
                             icon={FaSearch}>SEARCH</NavItem>
                </Link>
                <Link to="/tool">
                    <NavItem path='/tool'
                             icon={FaTools}>TOOL</NavItem>
                </Link>
                <Link to="/help">
                    <NavItem path='/help'
                             icon={FaHandsHelping}>HELP</NavItem>
                </Link>
                <Link to="/reference">
                    <NavItem path='/reference'
                             icon={FaBook}>REFERENCE</NavItem>
                </Link>
            </Flex>
        </Box>
    )
}

function Header(props) {
    // Color Settings
    const bgColor = useColorModeValue("whiteAlpha.600", "blackAlpha.600");

    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg={bgColor}
            backdropBlur='10px'
            h="14"
        >
            {props.children}
        </Flex>
    )
}


export default function Sidebar(props) {
    const mark = useColorModeValue("linear-gradient(0deg, #ffffff 20%, rgba(255, 255, 255, 0) 100%)", "linear-gradient(0deg, #00000090 20%, rgba(255, 255, 255, 0) 100%)")
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box
                bgImg='linear-gradient(60deg, #FFFFFF 0%, rgba(0, 61, 255, 0.2) 30%, #4AC1A240 80%, rgba(255, 255, 255, 0.36) 100%)'
                minH="100vh"
            >
                <Box bgImg={mark} minH='100vh'>
                    <SidebarContent display={{base: 'none', md: 'block'}}/>
                    <Box ml={{base: 0, md: 60}}>
                        <Header>
                            <IconButton onClick={onOpen} icon={<FiList/>} display={{base: 'inline-flex', md: 'none'}}/>
                            {props.title}
                        </Header>
                        <Box as="main"
                             pos='relative'
                        >
                            {props.children}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <SidebarContent/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
