import React from 'react'
import axios from 'axios'
import { LoginContext } from '../context/ContextProvider';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Option = ({ deletedata, get }) => {

  const { account, setAccount } = useContext(LoginContext);
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }
  const removedata = async () => {
    try {
      console.log("removing item fe");
      const res = await axios.post(`http://localhost:8000/remove/${deletedata}`, CONFIG_OBJ);
      console.log(res.data);

      if (res.status == 400 || !res.data) {
        console.log("error");
      } else {
        console.log("removed item");
        setAccount(res.data);
        toast.warning("invalid credetnails", {
          position: "top-right"
        })
        get();
      }
    } catch (error) {
      console.log("error - " + error);
    }
  }


  return (
    <div className='add_remove_select'>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removedata()}>Delete</p><span>|</span>
      <p className='forremovemedia'>Save or Later</p><span>|</span>
      <p className='forremovemedia'>See More Like This</p>
      <ToastContainer />
    </div>
  )
}

export default Option