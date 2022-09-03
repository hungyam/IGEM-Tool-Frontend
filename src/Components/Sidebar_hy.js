import {
    Badge,
    Box,
    Center,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Image,
    Text,
    Tooltip,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    chakra
} from "@chakra-ui/react";
// import {Link} from "@chakra-ui/react";
import React from "react";
import {FaBook, FaHandsHelping, FaHome, FaImage, FaSearch, FaTools} from "react-icons/fa";
import {Link, useLocation} from "react-router-dom";
import {FiList} from "react-icons/fi";
import {default as Layout} from "./layout.js";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

import {AnimatePresence, motion} from "framer-motion";


function NavItem(props) {
    // Color Settings
    const hoverBgColor = useColorModeValue("whiteAlpha.900", "blackAlpha.700");
    const hoverTextColor = useColorModeValue("gray.900", "gray.200");
    const selectedBGColor = useColorModeValue("whiteAlpha.900", "gray.700")
    const selectedColor = useColorModeValue("blue.700", "blue.300")
    const location = useLocation()


    const {icon, children, path} = props;

    return (
        <Flex
            align="center"
            px="4"
            py="3"
            cursor="pointer"
            _hover={{
                bg: hoverBgColor,
                color: hoverTextColor,
            }}
            fontWeight="600"
            transition=".15s ease"
            bgColor={path === location.pathname && selectedBGColor}
            color={path === location.pathname && selectedColor}
            boxShadow={path === location.pathname && 'sm'}
            borderRadius={path === location.pathname && 'lg'}
            mx={path === location.pathname && '1'}
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
    const bgColor = useColorModeValue("whiteAlpha.700", "blackAlpha.600");

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
            w={{base: 'full', lg: '60'}}
            {...rest}
        >
            <Center px={10} py={5}>
                <Image src="Logo.jpg" alt="DS3P" borderRadius='full' border='3px solid white'/>
            </Center>
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
                <Link to="/model">
                    <NavItem path='/model'
                             icon={FaImage}>MODEL</NavItem>
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
            {...props}
        >
            {props.children}
        </Flex>
    )
}

function Footer() {
    return (
        <Flex
            w="full"
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            alignItems="center"
            justifyContent="center"
            boxShadow='2xl'
        >
            <Flex
                w="full"
                as="footer"
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
                align="center"
                justify="space-between"
                px="6"
                py="2"
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
            >
                <Badge fontSize='sm'  colorScheme="cyan">
                    @2022 SYSU-Software
                </Badge>

                <chakra.p
                    py={{
                        base: "2",
                        sm: "0",
                    }}
                >
                    All rights reserved
                </chakra.p>
                <Layout/>
            </Flex>
        </Flex>

    )
}


export default function Sidebar(props) {
    const mark = useColorModeValue("linear-gradient(0deg, #ffffff 20%, rgba(255, 255, 255, 0) 100%)", "linear-gradient(0deg, #1A202C 20%, #1A202C 100%)")
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <>
            <Box
                bgImg='linear-gradient(60deg, #FFFFFF 0%, rgba(0, 61, 255, 0.2) 30%, #4AC1A240 80%, rgba(255, 255, 255, 0.36) 100%)'
                minH="100vh"
            >
                <Box bgImg={mark} h='100vh'>
                    <SidebarContent borderRight='1px solid #00000016' display={{base: 'none', lg: 'block'}}/>
                    <Box ml={{base: 0, lg: 60}} display='flex' flexDirection='column' h='full'>
                        <Header position='sticky' top='0'>
                            <IconButton onClick={onOpen} icon={<FiList/>} display={{base: 'inline-flex', lg: 'none'}}/>
                            <Text fontSize="xl" as="b" alignSelf="center">{props.title}</Text>
                            <Box>
                                <AnimatePresence exitBeforeEnter initial={false}>
                                    <motion.div
                                        style={{display: "inline-block"}}
                                        key={useColorModeValue("light", "dark")}
                                        initial={{y: -20, opacity: 0}}
                                        animate={{y: 0, opacity: 1}}
                                        exit={{y: 20, opacity: 0}}
                                        transition={{duration: 0.2}}
                                    >
                                        <Tooltip
                                            label={colorMode === "dark" ? "Light Mode" : "Dark Mode"}
                                            placement="auto"
                                            color={useColorModeValue('white', 'black')}
                                        >
                                            <IconButton
                                                aria-label="Toggle theme"
                                                colorScheme={useColorModeValue("purple", "orange")}
                                                icon={useColorModeValue(<MoonIcon/>, <SunIcon/>)}
                                                onClick={toggleColorMode}
                                                marginRight="5px"
                                                variant="ghost"
                                            />
                                        </Tooltip>
                                    </motion.div>
                                </AnimatePresence>
                            </Box>
                        </Header>
                        <Box display='flex' flexDirection='column' flex='1' overflowY='hidden'>
                            <Box as="main"
                                 flex='1'
                                 h='full'
                                 overflowY='auto'
                            >
                                {props.children}
                            </Box>

                        </Box>
                        <Footer/>
                    </Box>
                </Box>

            </Box>

            <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerBody>
                        <SidebarContent/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
