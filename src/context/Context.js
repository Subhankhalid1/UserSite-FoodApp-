import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const GlobalContext = createContext();

const Context = ({ children }) => {
    const [productData, setProductData] = useState([]);
    const [productDetail, setProductDetail] = useState([]);
    const [search, setSearch] = useState('');
    const [vendorList, setVendorList] = useState([])
    const [vendorDetail, setVendorDetail]=useState([])
    const [vendorData, setVendorData]=useState([])
const [auth, setAuth]=useState()

    useEffect(() => {

        makeGetRequest()
        GetAllVendor()
        // GetVendorByProduct()
    }, [])


    console.log(vendorDetail)

    async function makeGetRequest() {

        let res = await axios.get(`http://137.184.102.144:8000/api/product/getAllProducts`)
        setProductData(res.data)
        // console.log(res.data)
    }

    async function GetAllVendor() {

        let res = await axios.get(`http://137.184.102.144:8000/api/vendor/getAll`)
        setVendorList(res.data)

        // console.log(res.data)
    }
    
    // async function GetVendorByProduct() {

    //     let res = await axios.get(`https://foodappnative.herokuapp.com/api/product/getByOwner`, {owner:vendorDetail._id})
    //     setProductData(res.data)
    //     // console.log(res.data)
    // }
   

    return <>

        <GlobalContext.Provider value={{
            productData, productDetail, setProductDetail, search, setSearch,
            vendorList,setVendorDetail, vendorData, auth, setAuth
        }}>
            {children}
        </GlobalContext.Provider>
    </>
}

export default Context;