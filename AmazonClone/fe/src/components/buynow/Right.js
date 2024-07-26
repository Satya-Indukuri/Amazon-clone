import { useState, useEffect } from "react";
import React from 'react';

const Right = ({items}) => {

  const [Price, setPrice] = useState(0);

  useEffect(()=>{
    totalAmount();
  }, [items]);

  const totalAmount = ()=>{
    let price = 0;
    items.map((item)=>{
      price = item.price.cost + price;
    })
    setPrice(price);
  }


  return (
    <div className='right_buy'>
        <img src='https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png'></img>
        <div className='cost_right'>
            <p>Eligible for free shipping</p><br />
            <span style={{color:"#565959s"}}>Select this at checkout. Details</span>
            <h3> Subtotal ({items.length} item) : <span style={{fontWeight:700}}>₹{Price}.00</span></h3>
            <button className='rightbuy_btn'>Process to Buy</button>
            <div className='emi'>
                EMI available
            </div>
        </div>
    </div>
  )
}

export default Right