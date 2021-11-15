import { Menu, Accordian } from 'semantic-ui-react';
import { useState } from 'react';

function Categories({ marketplace }) {
    const [activeItem, setActiveItem] = useState('bio')
    const [category, setCategory] = useState('')

    function handleItemClick(e) {
        setActiveItem(e.target.name)
    };

    return (
        <Menu text vertical>
            <Menu.Item header>Categories</Menu.Item>
            <Menu.Item
                name='Origin City'
                active={activeItem === 'Origin City'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='Destination City'
                active={activeItem === 'Destination City'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='FTL LTL'
                active={activeItem === 'FTL LTL'}
                onClick={handleItemClick}
            />
        </Menu>
    )
};

export default Categories;