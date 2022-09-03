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
                    <StatLabel fontWeight={'medium'}>
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
        <Box maxW="7xl" mx={'auto'} pt={5} px={{base: 5, md: '15%'}}>
            <chakra.h1
                textAlign={'center'}
                fontSize={'3xl'}
                py={10}
                fontWeight={'bold'}>
                The platform accommodates {data.species_count} species and {data.system_count} defense systems.
            </chakra.h1>
            <SimpleGrid columns={2} spacing={{base: 5, md: 35}}>
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

    const data = props.data.sort((a, b) => b.value - a.value)

    const option = {
        title: {
            text: props.type,
            textStyle: {
                color: useColorModeValue('#000', '#fff')
            },
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'bottom',
            left: 'center',
            textStyle: {
                color: useColorModeValue('#000', '#fff')
            },
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: 'white',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        color: useColorModeValue('#000', '#fff')
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    };

    return <ReactECharts
        option={option}
        style={{height: 550}}
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
        archaea: [],
        bacteria: []
    })

    useEffect(() => {
        axios.get('http://39.108.14.181:1433/mes/')
            .then((response) => {
                console.log(response.data.data)
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
                <SimpleGrid columns={{base: 1, 'xl': 2}} spacing={{base: 5, lg: 8}} mt='10' mx='25'>
                    <Chart data={data.archaea} type='Archaea'/>
                    <Chart data={data.bacteria} type='Bacteria'/>
                </SimpleGrid>

            </Box>
        </Box>
    )


};
export default HomePage;
