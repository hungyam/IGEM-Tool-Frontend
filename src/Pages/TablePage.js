import {
    Box,
    Button, Center,
    Checkbox,
    Flex,
    Heading,
    Skeleton,
    Spacer, Spinner,
    Table, TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue, useToast
} from "@chakra-ui/react";
import {useEffect, useRef, useState, lazy} from "react";
import {Link, useSearchParams} from "react-router-dom";
import axios from "axios";

export default function TablePage() {
    //Color Settings
    const borderColor = useColorModeValue('gray.200', 'gray.600')
    const bgColor = useColorModeValue('whiteAlpha.800', 'gray.700')
    let selectId = []

    const scrollRef = useRef(null)
    const tableRef = useRef(null)

    const [params,] = useSearchParams()
    const species_key = params.get('species')
    const system_key = params.get('system')
    const name_key = params.get('name')

    const [data, setData] = useState([])
    const [dataLength, setDataLength] = useState(0)
    const [isLoad, setIsLoad] = useState(false)
    const [isLoadingNew, setIsLoadingNew] = useState(false)
    const toast = useToast()
    const [pageNow, setPageNow] = useState(0)

    useEffect(() => {
        axios.post('http://39.108.14.181:1433/data/' + pageNow + '/', {
            'system': system_key,
            'species': species_key,
            'name': name_key
        })
            .then((response) => {
                setData(response.data.data)
                setDataLength(response.data.length)
                setIsLoad(true)
                setPageNow(pageNow + 1)
            })
            .catch(() => console.log('Get data error!'))
    }, [])

    const downloadData = () => {
        if (selectId.length === 0)
            return false
        toast({
            title: 'Waiting',
            duration: null,
            status: "loading"
        })
        axios({
            url: 'http://39.108.14.181:1433/download/',
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
            toast.closeAll()
        });
    }

    const handleScroll = () => {
        if (isLoadingNew || dataLength === data.length) return
        if (scrollRef.current.scrollTop >= tableRef.current.clientHeight - scrollRef.current.clientHeight) {
            setIsLoadingNew(true)
            axios.post('http://39.108.14.181:1433/data/' + pageNow + '/', {
                'system': system_key,
                'species': species_key,
                'name': name_key
            })
                .then((response) => {
                    setData(data.concat(response.data.data))
                    setIsLoad(true)
                    setPageNow(pageNow + 1)
                    setIsLoadingNew(false)
                })
                .catch(() => console.log('Get data error!'))
        }
    }

    return (
        <>
            <Box w='100%'
                 p='5'
                 h='full'
            >
                <Box borderWidth='1px'
                     borderStyle='solid'
                     borderColor={borderColor}
                     p='5'
                     boxShadow='md'
                     bgColor={bgColor}
                     borderRadius='2xl'
                     h='full'
                     display='flex'
                     flexDirection='column'
                >
                    <Flex align='flex-end' mb='3'>
                        <Heading fontSize='30'
                                 mr='3'
                                 fontWeight='600'
                        >
                            Result: {dataLength}
                        </Heading>
                        <Text>
                            Search conditions: {species_key}(Species) - {system_key}(System) - {name_key}(Gene/Protein)
                        </Text>
                        <Spacer/>
                        <Link to='/search'>
                            <Button size='sm'
                                    mb='3'
                                    colorScheme='blue'
                            >
                                Back
                            </Button>
                        </Link>
                        <Button colorScheme='blue'
                                mb='3'
                                ml='3'
                                size='sm'
                                variant='outline'
                                onClick={downloadData}
                        >
                            Download
                        </Button>
                    </Flex>
                    <Skeleton isLoaded={isLoad} flex='1' overflowY='hidden' fadeDuration={2}>
                        <TableContainer h='full' overflowY='scroll' onScroll={handleScroll} ref={scrollRef}>
                            <Table variant='striped'
                                   size='sm'
                                   colorScheme='gray'
                                   ref={tableRef}
                            >
                                <Thead zIndex='10' pos='sticky' top='0'
                                       bgColor={useColorModeValue('white', 'gray.800')}>
                                    <Tr>
                                        <Th>Index</Th>
                                        <Th>Assembly</Th>
                                        <Th>LociID</Th>
                                        <Th>Accession</Th>
                                        <Th>ContigID</Th>
                                        <Th>Start</Th>
                                        <Th>End</Th>
                                        <Th>System</Th>
                                        <Th>Species</Th>
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
                                    {data.map((row, index) => (
                                        <Tr key={row.id.toString()}>
                                            <Td>{index + 1}</Td>
                                            <Td>{row.assembly}</Td>
                                            <Td>{row.lociid}</Td>
                                            <Td>{row.accession}</Td>
                                            <Td>{row.contigid}</Td>
                                            <Td>{row.start}</Td>
                                            <Td>{row.end}</Td>
                                            <Td>{row.system}</Td>
                                            <Td>{row.species}</Td>
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

                                <TableCaption mb='2'>
                                    {isLoadingNew ?
                                        <Center w='100%'>
                                            <Spinner size='lg'/>
                                        </Center> :
                                        <Center w='100%'>
                                            <Text fontSize='lg'>Request more data</Text>
                                        </Center>
                                    }
                                </TableCaption>
                            </Table>
                        </TableContainer>
                    </Skeleton>
                </Box>
            </Box>
        </>
    );
}
