import React, { useState } from 'react'
import "../signup/SignUp.css"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';
import { useContext } from 'react';

function SignIn() {

    const [logdata, setLogdata] = useState({
        email:"",
        password:""
    });
    const history = useNavigate("");
    // console.log(logdata);
    const { account, setAccount } = useContext(LoginContext);

    const addData = (e)=>{
        const {name, value} = e.target;
        setLogdata(()=>{
            return{
                ...logdata,
                [name]:value

            }
        })
    }

    const senddata = async(e)=>{
        e.preventDefault();
        const { email, password } = logdata;

        const reqdata = { email, password }
        console.log(reqdata);

        await axios.post("http://localhost:8000/login", reqdata)
            .then((res) => {
                console.log("logging in");
                console.log(res);
                if (!res.data) {
                    // alert("No data in resposne");
                    toast.warning("invalid credentials", {
                        position: "top-right"
                    })
                }
                else {
                    console.log("succesfully logged in");
                    alert("login successfull");
                    toast.success("user login registered", {
                        position: "top-right"
                    })
                    console.log(res.data.result.user);
                    setAccount(res.data.result.user);
                    localStorage.setItem("token", res.data.result.token);
                    localStorage.setItem("user", JSON.stringify(res.data.result.user));
                    setLogdata({ ...logdata, email: "", password: "" });
                    history("/");
                }
            }).catch((err)=>{
                console.log("errorrr hereee" + err );
                
                toast.warning("invalid credetnails", {
                    position: "top-right"
                })
                
                console.log(err);
            })

    }
    

  return (
    <section>
        <div className='sign_container'>
            <div className='sign_header'>
                <img src='../images/blacklogoamazon.png' alt='amazon logo' />
            </div>
            <div className='sign_form'>
                <form method='POST'>
                    <h1>Log In</h1>
                    <div className='form_data'>
                        <label>Email</label>
                        <input type="text"
                        onChange={addData}
                        value={logdata.email} name="email" id="email" />
                    </div>
                    <div className='form_data'>
                        <label>Password</label>
                        <input type="password"
                        onChange={addData}
                        value={logdata.password} name="password" id="password" placeholder='At least 8 characters' />
                    </div>
                    <button type='submit' className='signin_btn' onClick={senddata}>Continue</button>
                </form>
            </div>
            <div className='create_accountinfo'>
                <p>New to Amazon?</p>
                <NavLink to="/register">
                <button>Create Your Amazon account</button>
                </NavLink>
                
            </div>
            <ToastContainer />
        </div>
    </section>
  )
}

export default SignIn