// const products = []

// export const getProductsreducer = (state, action)=>{
//     switch (action.type) {
//         case "SUCCESS_GET_PRODUCTS":
//             return {products: action.payload}
//             break;
    
//         case "FAIL_GET_PRODUCTS":
//             return {products: action.payload};
//         default:
//             return products;
//     }
// }

const initialState = {
    products: [],
    loading: false,
    error: null
};

export const getProductsreducer = (state = initialState, action) => {
    switch (action.type) {
        case "REQUEST_GET_PRODUCTS":
            return { ...state, loading: true };
        case "SUCCESS_GET_PRODUCTS":
            return { products: action.payload, loading: false, error: null };
        case "FAIL_GET_PRODUCTS":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
