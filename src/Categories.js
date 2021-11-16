import { Menu, Accordion } from 'semantic-ui-react';
import { useState } from 'react';

function Categories({ marketplace, handleFilter }) {
    const [activeIndex, setActiveIndex] = useState(null)

    function handleClick(e, titleProps) {
        activeIndex === titleProps.index ? setActiveIndex(null) : setActiveIndex(titleProps.index)
    };

    const originCity = (
        <Menu secondary fluid vertical>
            {marketplace.map((item) => item.offering.origin)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((city) => {
                    return (
                        <Menu.Item key={city} id='origin' onClick={handleFilter} content={city} />
                    )
                })
            }
        </Menu>
    );

    const destinationCity = (
        <Menu secondary fluid vertical>
            {marketplace.map((item) => item.offering.destination)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((city) => {
                    return (
                        <Menu.Item key={city} id='destination' onClick={handleFilter} content={city} />
                    )
                })
            }
        </Menu>
    );

    const truckload = (
        <Menu secondary fluid vertical>
            {marketplace.some((item) => item.offering.full_truckload)
                ?
                <Menu.Item id='full_truckload' onClick={handleFilter} content='FTL' />
                :
                null}
            {marketplace.some((item) => item.offering.less_than_truckload)
                ?
                <Menu.Item id='less_than_truckload' onClick={handleFilter} content='LTL' />
                :
                null}
        </Menu>
    );

    function handleClear() {
        setActiveIndex(null)
        handleFilter('clear')
    };


    return (
        <Accordion as={Menu} vertical >
            <Menu text fluid>
                <Menu.Item header>Filter by:</Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item name='clear' onClick={handleClear} >clear</Menu.Item>
                </Menu.Menu>
            </Menu>

            <Menu.Item>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    content='Origin City'
                    onClick={handleClick}
                />
                <Accordion.Content active={activeIndex === 0} content={originCity} />
            </Menu.Item>

            <Menu.Item>
                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    content='Destination City'
                    onClick={handleClick}
                />
                <Accordion.Content active={activeIndex === 1} content={destinationCity} />
            </Menu.Item>
            <Menu.Item>
                <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    content='FTL LTL'
                    onClick={handleClick}
                />
                <Accordion.Content active={activeIndex === 2} content={truckload} />
            </Menu.Item>
        </Accordion >
    )
};

export default Categories;