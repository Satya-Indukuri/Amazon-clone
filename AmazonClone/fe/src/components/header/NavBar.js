import React, { useEffect, useState } from 'react'
import "../header/NavBar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import { useContext } from 'react';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from "./Rightheader";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


function NavBar() {

    const { account, setAccount } = useContext(LoginContext);
    console.log("Navbar output");
    console.log(account);
    // const [apptoken, setApptoken] = useState("");

    const history = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [drawopen, setDrawopen] = useState(false);
    const [text, setText] = useState("");
    // console.log(text);
    const [liopen, setLiopen] = useState(true);

    const { products } = useSelector(state => state.getproductsdata);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const getdetailvaliduser = async () => {
        try {
            const res = await axios.post("http://localhost:8000/validuser", CONFIG_OBJ);
            console.log("validating the user in fe");
            console.log(res);
            if (res.status !== 201) {
                console.log("error");
                // setApptoken(localStorage.getItem("token"));
            } else {
                console.log("user valid");
                setAccount(res.data);
                // setApptoken(localStorage.getItem("token"));
            }
        } catch (error) {
            console.log(error);
            alert("user not logged in");
        }

    };

    const handleopen = () => {
        setDrawopen(true);
    }

    const handledrawerclose = () => {
        setDrawopen(false);
    }

    const logoutuser = async () => {
        try {
            console.log("logging out the user in fe");
            const res = await axios.post("http://localhost:8000/logout", CONFIG_OBJ);
            console.log(res);
            if (res.status !== 201) {
                console.log("error");
                // setApptoken(localStorage.getItem("token"));
            } else {
                
                console.log("user valid");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setAccount("");
                toast.success("User logged out", {
                    position: "top-right"
                })
                history("/");
                // setApptoken(localStorage.getItem("token"));
            }
        } catch (error) {
            console.log(error);
            alert("user not logged in");
        }

    };

    const getText = (item)=>{
        setText(item);
        setLiopen(false);
    }

    useEffect(() => {
        console.log("use effect called for validating");
        getdetailvaliduser();
    }, []);



    return (
        <div>
            <header>
                <nav>
                    <div className='left'>

                        <IconButton className='hamburgur' onClick={handleopen}>
                            <MenuIcon style={{ color: "#fff" }} />
                        </IconButton>
                        <Drawer open={drawopen} onclose={handledrawerclose}>
                            <Rightheader logclose={handledrawerclose} />
                        </Drawer>

                        <div className='navlogo'>
                            <NavLink to="/">
                                <img src="../images/amazon_PNG25.png" alt="web logo"></img>
                            </NavLink>
                        </div>
                        <div className='navSearchbar'>
                            <input type='text' name='' 
                            onChange={(e)=>getText(e.target.value)}
                            placeholder="Search your products"
                            id=''></input>
                            <div className='search_icon'>
                                <SearchIcon id="" />
                            </div>

                            {
                                text && 
                                <List className="extrasearch" hidden={liopen}>
                                    {
                                        products.filter((product)=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                                            <ListItem>
                                                <NavLink to={`/getproductsone/${product.id}`} onClick={()=>setLiopen(true)}>
                                                {product.title.longTitle}
                                                </NavLink> 
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            }
                        </div>
                    </div>

                    <div className='right'>
                        {
                            account ? "" : <div className='nav_btn'>
                                <NavLink to="/login">SignIn</NavLink>
                            </div>
                        }

                        <div className='cart_btn'>
                            {
                                account ? <NavLink to="/buynow">
                                    <Badge badgeContent={account.carts.length} color="primary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                </NavLink> : <NavLink to="/login">
                                    <Badge badgeContent={0} color="primary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                </NavLink>
                            }

                            <ToastContainer />
                            <p>Cart</p>
                        </div>
                        {
                            account ? <Avatar className='avtar2'
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> : <Avatar className='avtar'
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}></Avatar>
                        }
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            {
                                account ? <MenuItem onClick={handleClose}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /><p onClick={logoutuser}>Logout</p></MenuItem> : ""
                            }

                        </Menu>

                    </div>
                </nav>
            </header>
        </div>
    )
}

export default NavBar;
