import {
    Box, Button, Checkbox, Divider, Flex,
    Heading, Skeleton, Spacer,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td, Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import axios from "axios";
import $ from 'jquery';

export default function TablePage() {
    //Color Settings
    const borderColor = useColorModeValue('gray.200', 'gray.600')
    const bgColor = useColorModeValue('whiteAlpha.800', 'gray.800')
    let selectId = []


    const [params,] = useSearchParams()
    const type = params.get('type')
    const keyword = params.get('keyword')
    const [data, setData] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const [canDownload, setCanDownload] = useState(false)

    useEffect(() => {
        if (type === 'all') {
            axios.get('http://localhost:8000/data')
                .then((response) => {
                    setData(response.data.data)
                    setIsLoad(true)
                })
                .catch(() => console.log('Get data error!'))
        } else {
            axios.post('http://localhost:8000/data', {'type': type, 'keyword': keyword})
                .then((response) => {
                    setData(response.data.data)
                    setIsLoad(true)
                })
                .catch(() => console.log('Get data error!'))
        }
    }, [])

    const downloadData = () => {
        if (selectId.length === 0)
            return false
        axios({
            url: 'http://localhost:8000/download',
            data: {'index': selectId},
            method: 'POST',
            responseType: 'blob',
        }).then((response) => {
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'Data.csv');
            document.body.appendChild(fileLink);

            fileLink.click();
            fileLink.remove()
        });
    }

    return (
        <Box position='absolute'
             w='100%'
             p='3'
        >
            <Box borderWidth='1px'
                 borderStyle='solid'
                 borderColor={borderColor}
                 p='5'
                 bgColor={bgColor}
                 borderRadius='md'
            >
                <Flex align='flex-end'>
                    <Heading fontSize='30'
                             mr='3'
                             fontWeight='600'
                    >
                        Result: {data.length}
                    </Heading>
                    <Text>
                        Search conditions: {type !== 'all' && ('\'' + keyword + '\' in')} '{type}'
                    </Text>
                    <Spacer/>
                    <Link to='/search'>
                        <Button size='sm'
                                mb='3'
                                colorScheme='green'
                        >
                            Back
                        </Button>
                    </Link>
                    <Button colorScheme='green'
                            mb='3'
                            ml='3'
                            size='sm'
                            variant='outline'
                            onClick={downloadData}
                    >
                        Download
                    </Button>
                </Flex>
                <Skeleton isLoaded={isLoad}>
                    <TableContainer mt='3'>
                        <Table variant='striped'
                               size='sm'
                               colorScheme='gray'
                        >
                            <Thead>
                                <Tr>
                                    <Th>Species</Th>
                                    <Th>System</Th>
                                    <Th>Gene Name</Th>
                                    <Th>Protein Name</Th>
                                    <Th>
                                        <Checkbox mr='2'
                                                  onChange={(e) => {
                                                      data.forEach(curr => {
                                                          var checkBox = document.getElementById(curr.id.toString())
                                                          if (checkBox.checked !== e.target.checked) {
                                                              checkBox.click()
                                                          }

                                                      })
                                                  }}/>
                                        Select
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((row) => (
                                    <Tr key={row.id.toString()}>
                                        <Td>{row.species}</Td>
                                        <Td>{row.system}</Td>
                                        <Td>{row.gene}</Td>
                                        <Td>{row.protein}</Td>
                                        <Td><Checkbox id={row.id} onChange={(e) => {
                                            if (e.target.checked) {
                                                selectId.push(row.id)
                                            } else {
                                                selectId.forEach((e, index) => {
                                                    if (e === row.id) {
                                                        selectId.splice(index, 1)
                                                    }
                                                })
                                            }
                                        }}/></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Skeleton>
            </Box>
        </Box>
    );
}
