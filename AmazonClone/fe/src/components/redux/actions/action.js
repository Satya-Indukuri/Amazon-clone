// export const getProducts = ()=> async(dispatch)=>{
//     try {
//         const data = await fetch("http://localhost:8000/getproducts",{
//             method: "GET",
//             headers: {
//                 "Content-Type":"application/json"
//             }
//         })

//         const res = await data.json();
//         console.log(res);
//         dispatch({type:"SUCCESS_GET_PRODUCTS", payload: res})
//     } catch (error) {
//         dispatch({type:"FAIL_GET_PRODUCTS", payload: error.response})
//     }

// }

export const getProducts = () => async (dispatch) => {
    dispatch({ type: "REQUEST_GET_PRODUCTS" });
    try {
        const response = await fetch("http://localhost:8000/getproducts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: data });
    } catch (error) {
        dispatch({ type: "FAIL_GET_PRODUCTS", payload: error.message });
    }
};
