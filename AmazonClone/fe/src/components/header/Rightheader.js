import React from 'react'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../context/ContextProvider';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import "../header/Rightheader.css"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Rightheader = ({ logclose }) => {

    const { account, setAccount } = useContext(LoginContext);
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    return (
        <>
            <div className='rightheader'>
                <div className='right_nav'>
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
                    {
                        account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""
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
                <div className='nav_btn' onClick={() => logclose()}>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/">
                        Shop by category
                    </NavLink>
                    <Divider style={{ width: "100%", marginLeft: -20 }} />
                    <br />
                    <NavLink to="/">
                        Today's deal
                    </NavLink>
                    {
                        account ? <NavLink to="/buynow">
                            Cart
                        </NavLink> : <NavLink to="/login">
                            Cart
                        </NavLink>
                    }

                    <Divider style={{ width: "100%", marginLeft: -20 }} />
                    {
                        account ? <MenuItem onClick={handleClose}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /><p onClick={logoutuser}>Logout</p></MenuItem> : ""
                    }



                </div>
            </div>
        </>
    )
}

export default Rightheader