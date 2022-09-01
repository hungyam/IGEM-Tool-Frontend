import React, {useEffect, useState} from "react";
import {
    Box, Flex, SimpleGrid, Stat, StatLabel, StatNumber, chakra,
    Text, useColorModeValue, Divider,

} from "@chakra-ui/react";
import ReactECharts from 'echarts-for-react'
import {SiMicrogenetics} from 'react-icons/si'
import {FaBacterium, FaBacteria} from 'react-icons/fa'
import axios from "axios";


function StatsCard(props) {
    const {title, stat, icon} = props;
    return (
        <Stat
            px={{base: 2, md: 4}}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{base: 2, md: 4}}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

function BasicStatistics(props) {

    const data = props.data


    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{base: 2, sm: 12, md: 17}}>
            <chakra.h1
                textAlign={'center'}
                fontSize={'3xl'}
                py={10}
                fontWeight={'bold'}>
                The platform accommodates {data.species_count} species and {data.system_count} resistance systems.
            </chakra.h1>
            <SimpleGrid columns={{base: 1, md: 3}} spacing={{base: 5, lg: 8}}>
                <StatsCard
                    title='Chromosomes'
                    stat='0'
                    icon={<SiMicrogenetics size={'3em'}/>}
                />
                <StatsCard
                    title={'Archaea'}
                    stat={data.archaea_count}
                    icon={<FaBacterium size={'3em'}/>}
                />
                <StatsCard
                    title={'Bacteria'}
                    stat={data.bacteria_count}
                    icon={<FaBacteria size={'3em'}/>}
                />
            </SimpleGrid>
        </Box>
    );
}

function Chart(props) {
    const option = {
        title: {
            text: props.type,
            textStyle: {
                color: useColorModeValue('black', 'white')
            }
        },
        tooltip: {},
        legend: {
            data: 'count'
        },
        xAxis: {
            type: 'category',
            data: props.data.x,
            nameTextStyle: {
                color: useColorModeValue('black', 'white')
            }
        },
        yAxis: {
            nameTextStyle: {
                color: useColorModeValue('black', 'white')
            }
        },
        series: [{
            type: 'bar',
            data: props.data.y,
            itemStyle: {
                normal: {
                    borderRadius: 4,
                }
            },
            color: props.color
        }]
    };

    return <ReactECharts
        option={option}
        style={{height: 400}}
        opts={{renderer: 'svg'}}
    />;
}


const HomePage = (props) => {
    const borderColor = useColorModeValue('gray.200', 'gray.600')
    const bgColor = useColorModeValue('whiteAlpha.800', 'gray.700')

    const [data, setData] = useState({
        archaea_count: 0,
        bacteria_count: 0,
        species_count: 0,
        system_count: 0,
        archaea: {},
        bacteria: {}
    })

    useEffect(() => {
        axios.get('http://localhost:8000/mes/')
            .then((response) => {
                setData(response.data.data)
            })
            .catch(() => {
                console.log('Error!')
            })
    }, [])

    return (
        <Box w='100%'
             minH='100%'
             p='5'
        >
            <Box borderWidth='1px'
                 borderStyle='solid'
                 borderColor={borderColor}
                 p='5'
                 minH='100%'
                 bgColor={bgColor}
                 borderRadius='2xl'
            >
                <BasicStatistics data={data}/>
                <Divider mt='10'/>
                <SimpleGrid columns={{base: 1, md: 2}} spacing={{base: 5, lg: 8}} mt='10' mx='5'>
                    <Chart data={data.archaea} type='Archaea' color='skyblue'/>
                    <Chart data={data.bacteria} type='Bacteria' color='purple'/>
                </SimpleGrid>

            </Box>
        </Box>
    )


};
export default HomePage;
