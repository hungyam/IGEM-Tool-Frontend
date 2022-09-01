import {Box, Heading, Img, useColorModeValue} from "@chakra-ui/react";

export default function ModelPage() {
    const bgColor = useColorModeValue('whiteAlpha.800', 'gray.700')


    return (
        <Box w='full' p='5' >
            <Box h='full' bgColor={bgColor} boxShadow='md' borderRadius='2xl' p='5'>
                <Heading fontSize='30' fontWeight='600'>Model</Heading>
                <Img src='model.jpg' mx='auto' my='10' htmlWidth='1000px' objectFit='fit'/>
            </Box>
        </Box>
    )
}