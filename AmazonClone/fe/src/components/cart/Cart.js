// import React, { useEffect } from 'react'
// import "../cart/Cart.css"
// import { Divider } from '@mui/material'
// import { useParams } from 'react-router-dom';

// function Cart() {

//     const {id} = useParams("");
//     const getinddata = async()=>{
//         console.log("gettting ind details");
//         const res = await fetch(`/getproductsone/${id}`,{
//             method: "GET",
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         });
//         console.log("gettting ind details 11111");
//         console.log(res);
//         const data = await res.json();
//         console.log(data);
//     }
//     useEffect(()=>{
//         getinddata();
//     }, [id]);


//     return (
//         <div className='cart_section'>
//             <div className='cart_container'>
//                 <div className='left_cart'>
//                     <img src='https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="cart image"></img>
//                     <div className='cart_btn'>
//                         <button className='cart_btn1'>Add to Cart</button>
//                         <button className='cart_btn2'>Buy Now</button>
//                     </div>
//                 </div>
//                 <div className='right_cart'>
//                     <h3>Fitness Gear</h3>
//                     <h4>abcd abccd abcd abcd abcd abcd</h4>
//                     <Divider></Divider>
//                     <p className='mrp'> MRP : 125Rs</p>
//                     <p> Deal of the day : <span style={{color:"#B12704"}}> 125Rs</span></p>
//                     <p> You save : <span style={{color:"#B12704"}}> 570Rs (47%)</span></p>

//                     <div className='discount_box'>
//                         <h5>Discount : <span style={{color:"#111"}}> Extra 10% off (47%)</span> </h5>
//                         <h4>Free Delivery : <span style={{color:"#111"}}> Oct 8 -21 (47%)</span> Details</h4>
//                         <p>Fastest Deliery : <span style={{color:"#111"}}>Tomorrow 11AM</span></p>
//                     </div>
//                     <div className='description'>
//                         About the item : <span style={{color:"#5659595", fontSize:14,fontWeight:500, letterSpacing:"0.4px"}}>LoremLoremLoremLorem LoremLoremLoremLore mLoremLoremLoremLore mLoremLoremLoremLore mLoremLor emLoremLorem LoremLoremLorem</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart

import React, { useContext, useEffect, useState } from 'react';
import "../cart/Cart.css";
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../context/ContextProvider';

function Cart() {
    const { id } = useParams("");
    // console.log(id);

    const history = useNavigate("");

    const {account, setAccount} = useContext(LoginContext);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    // console.log(CONFIG_OBJ);

    const [inddata, setInddata]=useState([]);
    // console.log(inddata);
    const getinddata = async () => {
        const res = await axios.get(`http://localhost:8000/getproductsone/${id}`)
        // console.log(res.data);

        if(res.status !=200){
            console.log("no data available");
        }
        else{
            console.log("get ind data");
            setInddata(res.data);
        }
    };

    const addtocart = async(id)=>{
        console.log("Addin to cart");
        const checkres = await axios.post(`http://localhost:8000/addcart/${id}`, CONFIG_OBJ);
        // console.log("res adding to cart"+checkres);
        console.log("response");
        console.log(checkres);
        if(checkres.status == 401 || !checkres){
            console.log("user invalid");
            alert("error adding to cart - please make sure to login");
        }else{
            // alert("data added in your cart")
            history("/buynow");
            setAccount(checkres.data);
        }

    }

    useEffect(() => {
        getinddata();
    }, [id]);

    return (
        <div className='cart_section'>
            { inddata && Object.keys(inddata).length && 
            <div className='cart_container'>
                <div className='left_cart'>
                    <img src={inddata.url} alt="cart image"></img>
                    <div className='cart_btn'>
                        <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
                        <button className='cart_btn2'>Buy Now</button>
                    </div>
                </div>
                <div className='right_cart'>
                    <h3>{inddata.title.shortTitle}</h3>
                    <h4>{inddata.title.longTitle}</h4>
                    <Divider></Divider>
                    <p className='mrp'> MRP : {inddata.price.mrp} Rs</p>
                    <p> Deal of the day : <span style={{color:"#B12704"}}> {inddata.price.cost} Rs</span></p>
                    <p> You save : <span style={{color:"#B12704"}}> {inddata.price.mrp - inddata.price.cost} Rs ({inddata.price.discount})</span></p>

                    <div className='discount_box'>
                        <h5>Discount : <span style={{color:"#111"}}> {inddata.discount}</span> </h5>
                        <h4>Free Delivery : <span style={{color:"#111"}}> Oct 8 -21</span> Details</h4>
                        <p>Fastest Deliery : <span style={{color:"#111"}}>Tomorrow 11AM</span></p>
                    </div>
                    <div className='description'>
                        About the item : <span style={{color:"#5659595", fontSize:14,fontWeight:500, letterSpacing:"0.4px"}}>{inddata.description}</span>
                    </div>
                </div>
            </div>
            }
        </div>
    );
    
}

export default Cart;
