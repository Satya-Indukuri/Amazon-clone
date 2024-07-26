import React, { useEffect, useState } from 'react'
import "../buynow/Buynow.css"
import { Divider } from '@mui/material'
import Option from './Option'
import Subtotal from './Subtotal'
import Right from './Right'
import axios from 'axios'

function Buynow() {
    const [cartdata, setCartdata] = useState([]);
    console.log("cart details");
    console.log(cartdata);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const getdatabuy = async () => {
        console.log("getting cart details");
        const res = await axios.post("http://localhost:8000/cartdetails", CONFIG_OBJ);
        console.log(res);
        if (res.status !== 201) {
            console.log("error");
        } else {
            setCartdata(res.data.carts);
        }
    }

    useEffect(() => {
        getdatabuy();
    }, []);

    return (
        <>{
            cartdata.length ? <div className='buynow_section'>
                <div className='buynow_container'>
                    <div className='left_buy'>
                        <h1>Shopping cart</h1>
                        <p>Select all items</p>
                        <span className='leftbuyprice'>Price</span>
                        <Divider />
                        {/* {
                            cartdata.length === 0 ? <><br /><br />
                            <br /><br /><h1>No items in cart</h1></> : ""
                        } */}

                        {
                            cartdata.map((e, k) => {
                                return (
                                    <>
                                        <div className='item_containert'>
                                            <img src={e.url} alt='watch'></img>
                                            <div className='item_details'>
                                                <h3>{e.title.longTitle}</h3>
                                                <h3>{e.title.shortTitle}</h3>
                                                <h3 className='diffrentprice'>4049.50Rs</h3>
                                                <p className='unusuall'>Usually dispatched in 5 days</p>
                                                <p>Eligible for free shipping</p>
                                                <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                                <Option deletedata={e.id} get={getdatabuy} />
                                            </div>
                                            <h3 className='item_price'>₹{e.price.cost}</h3>
                                        </div>
                                        <Divider />
                                    </>
                                )
                            })
                        }
                        <Subtotal items={cartdata} />
                    </div>
                    <Right items={cartdata} />
                </div>
            </div> : ""
        }

        </>

    )
}

export default Buynow