import {Box, Heading, Link, Text, Flex, useColorModeValue} from "@chakra-ui/react";
import {LinkIcon} from "@chakra-ui/icons";

export default function ToolPage() {
    return (
        <Box p='5' h='full'>
            <Box display='flex' flexDirection='column' w='full' h='full' p='5'
                 bgColor={useColorModeValue('white', 'gray.700')} borderRadius='2xl'>
                <Flex alignItems='end'>
                    <Heading fontSize='30'
                             fontWeight='600'
                    >
                        Tool
                    </Heading>
                    <Text ml='4'>Cite: <Link fontWeight='700' href='https://doi.org/10.1093/molbev/msz185'><LinkIcon/> a modern graphical user interface for custom
                        BLAST databases. Molecular Biology and Evolution (2019).</Link></Text>
                </Flex>
                <iframe style={{flex: 1}} allowFullScreen src='http://39.108.14.181:4567/' width='100%'/>
            </Box>
        </Box>
    );
}
