import { Button, TextField, Tooltip } from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.css';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export const Header = ({ onSearchFilter, setOpen, cartProds }) => {
    const [searchValue, setSearchValue] = useState('');
    const handleOpen = () => setOpen(true);
    useEffect(() => {
        onSearchFilter(searchValue);
    }, [searchValue]);
    console.log(searchValue);

    return (
        <div className='Header'>
            <div className='logo'>
                <h1>ECommerce</h1>
            </div>
            <div className='searchBar'>
                <TextField className='search' label="Search for products!" variant="standard" onChange={(e) => {
                    setSearchValue(e.target.value);
                    onSearchFilter(searchValue);
                }} value={searchValue} />
                <Button onClick={() => onSearchFilter(searchValue)}><SearchIcon /></Button>
            </div>
            <div className='cartDiv'>
                <Tooltip title="Go to Cart">
                <Badge badgeContent={cartProds.length} color="primary">
                    <Button onClick={handleOpen}>
                        <ShoppingCartIcon onClick={() => setOpen(true)} />
                    </Button>
                </Badge>
                </Tooltip>
                {/* <Badge badgeContent={cartProds.length} color="primary">
                    <Button onClick={handleOpen}>
                        <ShoppingCartIcon onClick={() => setOpen(true)} />
                    </Button>
                </Badge> */}
            </div>
        </div>
    );
}
export default Header;