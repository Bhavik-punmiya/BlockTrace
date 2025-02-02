
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from '../context/auth'
import toast, { Toaster } from "react-hot-toast";
require('dotenv').config();
import abi from '../constants/abi.js'
import {ethers} from "ethers";
const { JsonRpcProvider } = require('ethers/providers');
import contractFunction from "../constants/contract.js";
import CryptoJS from 'crypto-js';


export default () => {
    const[customer,setCustomer]=useState('')
    const[modaldata,setModaldata]=useState();
    const[customeradd,setCustomeradd]=useState('')
    const[logistic,setLogistic]=useState('')
    const[auth]=useAuth()
    const[tabledata,setTabledata]=useState();
    const [inputText, setInputText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
  

  const handleshipment = async(productid,distributor)=>{
    const {addProductDetails, getProductDetails, addLogisticsDashboardDetails } = await contractFunction();
  try{
      console.log(productid)
      const getproduct = await getProductDetails(productid);
       let Product = await handleDecrypt(productid, getproduct)
       
       console.log(Product.Product.timeline);
       const currentDate = new Date().toDateString();
       Product.Product.timeline['distributor'] = currentDate;
       Product.Product['customeremail']=customer;
       const dataString = await handleEncrypt(productid, JSON.stringify(Product))
       const addprouct = await addProductDetails(productid, dataString)
       const logres =await axios.post("http://localhost:8080/v1/auth/getkeyofuser",{"email":logistic});
       const logid = logres.data.user.id
       const dashboardData = [customer,productid,customeradd,currentDate]
       const dash = await addLogisticsDashboardDetails(dashboardData, logid)
       toast.success("Product Shipped Successfully") ;
      }
  catch(err){
        console.log(err);
        toast.error("Unable ship Product");
       }
      }
      const handleEncrypt = async (productid, data) => {
        const secretKey = (await axios.post('http://localhost:8080/v1/auth/getallkeys', {id : productid})).data.key;
        console.log(secretKey)
        const encrypted = await CryptoJS.AES.encrypt(data, secretKey).toString();
        console.log(encrypted)
        // const encryptedBase64 = encrypted.toString();
        setEncryptedText(encrypted);
        
        return encrypted;
       };

    const handleDecrypt = async (productid, encryptedBase64) => {
        const secretKeyResponse = await axios.post('http://localhost:8080/v1/auth/getallkeys', { id: productid });
        const secretKey = secretKeyResponse.data.key;
        console.log("Key:", secretKey);
        const bytes = CryptoJS.AES.decrypt(encryptedBase64, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        setDecryptedText(originalText);
        console.log(originalText);
        return JSON.parse(originalText)
    };
      
  const fetchapi= async()=>{
          const {getDistributorUserDashboardDetails} = await contractFunction();

          const userID = auth.user.id
          const disdash = await getDistributorUserDashboardDetails(userID)
          console.log(userID)
          setTabledata(disdash)
    }
      
      useEffect(()=>{
       fetchapi();
      },[])





    return (
        <Dialog.Root>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 bg-white py-20">
            
            <div className="items-start justify-between md:flex bg-white">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        All products
                    </h3>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className='flex-1 items-center justify-center pb-4 lg:flex lg:pb-0 mt-3 md:mt-0'>
                        <div className="flex items-center gap-1 px-2 border rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none"
                            />
                        </div>
                    </form>
               
            </div>
            
            <div className="mt-12 relative h-max overflow-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Product Name</th>
                            <th className="py-3 pr-6">Product Id</th>
                            <th className="py-3 pr-6">MFG date</th>
                            <th className="py-3 pr-6">Price</th>
                            <th className="py-3 pr-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {    
                            
                              tabledata && tabledata.map((item, idx) => (
                               <tr key={idx}>
                                    {item.map((value, index) => ( 
                                     <td key={index} className="pr-6 py-4 whitespace-nowrap"><a href={'/veiwproduct/'+item[1]}>{value} </a></td>
                                    ))}
                                    {/* Uncomment and adjust the following if you have specific fields in your items */}
                                    {/* <td className="pr-6 py-4 whitespace-nowrap">{item.date}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                      <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status === "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                        {item.status}
                                      </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.plan}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.price}</td> */}
                                    <td className="text-right whitespace-nowrap"> 
                                          <Dialog.Trigger> <button onClick={()=>(setModaldata(item))}  className="py-1.5 px-3 text-white hover:text-gray-500 duration-150 hover: bg-blue-400 border rounded-lg">
                                          Shipment
                                      </button></Dialog.Trigger>
                                    </td>
                                  </tr>
                                ))
                          }
                            
                    </tbody>
                  </table>
                 
                  <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
          <div className="bg-white rounded-md shadow-lg px-10 py-6">
             
            <Dialog.Title className="text-lg font-medium text-gray-800 text-center mt-3">
              Proceed
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-sm leading-relaxed text-center text-gray-500 flex flex-col justify-center items-start">
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Product Name</label>
              <input
                type='text'
                placeholder={modaldata && modaldata[0]}
                className='w-full mt-1 focus:border-blue-600 px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150 cursor-not-allowed'
              />
            </div>
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Product Id</label>
              <input
                type='text'
                placeholder={modaldata && modaldata[1]}
                className=' mt-1 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150 cursor-not-allowed'
              />
            </div>
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Logistic Email</label>
              <input
                type='text'
                 value={logistic}
                 onChange={(e)=>setLogistic(e.target.value)} 
                className=' mt-1 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150'
              />
            </div>
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Customer Email</label>
              <input
                type='email'
                value={customer}
                onChange={(e)=>setCustomer(e.target.value)} 
                required
                className=' mt-1 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150'
              />
            </div>
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Customer Address</label>
              <input
                type='text'
                value={customeradd}
                onChange={(e)=>setCustomeradd(e.target.value)} 
                required
                className=' mt-1 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150'
              />
            </div>
            {/* <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Product Image</label>
                       <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
                     <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                         <svg className="w-10 h-10 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                         </svg>
                         <p className="mt-3 text-gray-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your  file</span> or drag and drop your file here</p>
                     </label>
                     <input id="file" type="file" className="hidden" />
                  </div>
            </div>
  */}
            </Dialog.Description>
            <div className="items-center gap-2 mt-3 text-sm sm:flex">
            <Dialog.Close>
              {modaldata &&  <button onClick={()=>(handleshipment(modaldata[1]))}className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
                  Shipment
                </button>}
                </Dialog.Close>
             
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
      </div>
        </div>
    </Dialog.Root>













        
    )
}