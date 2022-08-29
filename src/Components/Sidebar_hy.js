import {
    Box, Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay,
    Flex,
    Heading,
    Icon, IconButton, Switch,
    Text, useColorMode,
    useColorModeValue, useDisclosure,
    Badge, chakra, VisuallyHidden, Container, Stack, Image, Tooltip, HStack

} from "@chakra-ui/react";
// import {Link} from "@chakra-ui/react";
import React, {useEffect, ReactNode} from "react";
import {FaBook, FaHandsHelping, FaHome, FaSearch, FaSun, FaTools} from "react-icons/fa";
import {useHref, useLocation, useMatch, Link} from "react-router-dom";
import {FiList} from "react-icons/fi";
import { default as Layout } from "./layout.js";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";


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
            // color={textColor}
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
                    <Image src="Logo.jpg" alt="DS3P" borderRadius='full' 
                
                     
                    />
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
            textAlign="center"
        >
            {props.children}
        </Flex>
    )
}

function Footer(props) {
    return (
        <Box
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            // rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={props.href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
            bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{props.label}</VisuallyHidden>
            {props.children}
        </Box>
)
}


export default function Sidebar(props) {
    const mark = useColorModeValue("linear-gradient(0deg, #ffffff 20%, rgba(255, 255, 255, 0) 100%)", "linear-gradient(0deg, #00000090 20%, rgba(255, 255, 255, 0) 100%)")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode();
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
                            <Text fontSize="xl" as="b" alignSelf="center">{props.title}</Text>
                            {/* <IconButton onClick={onOpen} icon={<FiList/>} display={{base: 'inline-flex', md: 'none'}}/> */}
                            <Box >
                                <AnimatePresence exitBeforeEnter initial={false}>
                                    <motion.div
                                    style={{ display: "inline-block" }}
                                    key={useColorModeValue("light", "dark")}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    >
                                    <Tooltip
                                        label={colorMode === "dark" ? "Light Mode" : "Dark Mode"}
                                        placement="auto"
                                    >
                                    <IconButton
                                        aria-label="Toggle theme"
                                        colorScheme={useColorModeValue("purple", "orange")}
                                        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
                                        onClick={toggleColorMode}
                                        marginRight="5px"
                                        variant="ghost"
                                        />
                                    </Tooltip>
                                    </motion.div>
                                </AnimatePresence>
                      

                                <Menu id="navbar-menu">
                                    <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<HamburgerIcon />}
                                    variant="outline"
                                    />
                    
                                    <MenuList>
                                        <MenuItem as={Button} icon={<FaHome />} onClick = {()=>{window.open('/', "_self")}}>
                                            Home
                                        </MenuItem>
                                                        
                                    </MenuList>
                                </Menu>
                            </Box>

                        </Header>


                        <Box as="main"
                             pos='relative'
                        >
                            {props.children}
                        </Box>

                        <Container
                            position="fixed"
                            bottom="0"
                            ml={{ base:"300px", md: '300px' }}
                            // align={{ base: 'center', md: 'center' }}
                            // bgColor="red"
                            // overflow="auto"
                        >
                            <Box
                                as={Stack}
                                maxW={'6xl'}
                                p="4"
                                direction={{ base: 'column', md: 'column'}}
                                spacing={4}
                                justify={{ base: 'center', md: 'space-between' }}
                                align={{ base: 'center', md: 'center' }}
    
                            >
                                <Badge variant="outline" colorScheme="cyan">
                                        @2022 SYSU-Software
                                </Badge>
                                <Text>All Rights Reserved.</Text>   
                                    <Layout />
                                </Box>
                    </Container>
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
