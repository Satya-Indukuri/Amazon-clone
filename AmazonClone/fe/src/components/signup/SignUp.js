import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });
    // console.log(udata);

    const history = useNavigate();

    const addData = (e) => {
        const { name, value } = e.target;
        setUdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    }

    // const senddata = async(e)=>{
    //     e.preventDefault();
    //     const {fname, email, mobile, password, cpassword} = udata;
    //     const reqdata = {fname, email, mobile, password, cpassword}
    //     console.log(reqdata);
    //     const res = await axios.post("http://localhost:8000/register", reqdata);
    //     console.log(res);
    //     if(res.status === 500 || !res.data){
    //         alert("No data in resposne");
    //         toast.warning("invalid details",{
    //             position: "top-right"
    //         })
    //     }
    //     else{
    //         toast.success("user successfully registered",{
    //             position: "top-right"
    //         })
    //         setUdata({...udata, fname:"", email:"", mobile:"", password:"", cpassword:""});
    //     }
    // }

    const senddata = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = udata;

        const reqdata = { fname, email, mobile, password, cpassword }
        console.log(reqdata);
        await axios.post("http://localhost:8000/register", reqdata)
            .then((res) => {
                console.log(res);
                if (!res.data) {
                    // alert("No data in resposne");
                    toast.warning("fill all fields", {
                        position: "top-right"
                    })
                }
                else {
                    toast.success("user successfully registered", {
                        position: "top-right"
                    })
                    setUdata({ ...udata, fname: "", email: "", mobile: "", password: "", cpassword: "" });
                    alert("user succesfully signed up");
                    history("/login");
                }
            }).catch((err)=>{
                console.log("error " + err.response.status);
                if (err.response.status === 500) {
                    toast.warning("fill all fields and make sure password and confirm password match", {
                        position: "top-right"
                    })
                }
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
                    <form>
                        <h1>Create account</h1>
                        <div className='form_data'>
                            <label htmlFor='fname'>Your Name</label>
                            <input type="text"
                                onChange={addData}
                                value={udata.fname} name="fname" id="fname" />
                        </div>

                        <div className='form_data'>
                            <label htmlFor='email'>Email</label>
                            <input type="text"
                                onChange={addData}
                                value={udata.email} name="email" id="email" />
                        </div>
                        <div className='form_data'>
                            <label htmlFor='mobile'>Mobile</label>
                            <input type="text"
                                onChange={addData}
                                value={udata.mobile} name="mobile" id="mobile" />
                        </div>
                        <div className='form_data'>
                            <label htmlFor='password'>Password</label>
                            <input type="password"
                                onChange={addData}
                                value={udata.password} name="password" id="password" placeholder='At least 8 characters' />
                        </div>
                        <div className='form_data'>
                            <label htmlFor='cpassword'>Password again</label>
                            <input type="password"
                                onChange={addData}
                                value={udata.cpassword} name="cpassword" id="cpassword" />
                        </div>

                        <button type='submit' className='signin_btn' onClick={senddata}>Continue</button>
                        <hr />
                        <div className='signin_info'>
                            <p>Already have an account?</p>
                            <NavLink to="/login">Login</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}

export default SignUp