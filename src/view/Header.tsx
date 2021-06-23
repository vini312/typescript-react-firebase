import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Header() {
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Link to='/'><Button variant="contained">Products List</Button></Link>
                <Link to='/add-product'><Button variant="contained" color="primary" disableElevation>Add New Product</Button></Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header