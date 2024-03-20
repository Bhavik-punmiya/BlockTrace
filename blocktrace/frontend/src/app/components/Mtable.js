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
const[name,setName]=useState('') 
const[price,setPrice]=useState('')
const[description,setDescription]=useState('')
const[distributor,setDistributor]=useState('')
const[tabledata,setTabledata]=useState();
const[auth]=useAuth()
const [encryptedText, setEncryptedText] = useState('');
const [decryptedText, setDecryptedText] = useState('');
   

const handleaddproduct = async  ()=>{
const { addProductDetails , addManufacturerDashboardDetails, addDistributorDashboardDetails } = await contractFunction();
try{
const res =await axios.get("http://localhost:8080/v1/auth/generateproduct");
console.log(res.data)
const productid = res.data.keys._id

const jsonData = { Product: {
    ProductID: res.data.keys._id,
    ProductName: name,
    Description: description,
    price:price,
    Manufacturer: {
        ManufacturerName: auth.user.name,
        ManufacturerEmail: auth.user.email
    },
    Distribution: {
      Distributoremail: distributor,
  },
  timeline:{
    
  }
}
}
console.log(jsonData)
const timelineKey = await new Date().toISOString(); // Example: using ISO string as a key
jsonData.Product.timeline['manufacturer'] = timelineKey;
console.log('at encrypt data')
const data= await handleEncrypt(productid, jsonData); 
console.log(data)
const addDetails = await addProductDetails(productid, data);

const manufacturerRow  = [name,res.data.keys._id,res.data.keys.createdAt,price,distributor]
const userID = auth.user.id
const dash = await addManufacturerDashboardDetails(manufacturerRow, userID)
console.log(dash);
console.log(distributor)
const didres =  await axios.post("http://localhost:8080/v1/auth/getkeyofuser",{"email":distributor});
const did = didres.data.user.id
const distributorRow = [name,res.data.keys._id,res.data.keys.createdAt,price]
const distdash = await addDistributorDashboardDetails(distributorRow, did)
console.log(distdash)
 
 toast.success("Product Added Successfully") ;
}

 catch(err){
  console.log(err);
  toast.error("Unable Added Product");
 }
}


 
const handleEncrypt = async (productid, data) => {
  const secretKey = await axios.post('http://localhost:8080/v1/auth/getallkeys', {id : productid});
  const encrypted = await CryptoJS.AES.encrypt(data, secretKey).toString();
  // const encryptedBase64 = encrypted.toString();
  setEncryptedText(encrypted);
  
  return encrypted;
 };
 
const handleDecrypt = async (productid, data) => {
  const secretKey = await axios.post('http://localhost:8080/v1/auth/getallkeys', {id : productid})
  const bytes = CryptoJS.AES.decrypt(data, secretKey.data.key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  setDecryptedText(originalText);
  return decryptedText;
};

const fetchapi= async()=>{
    const {getProductDetails, getManufacturerUserDashboardDetails} = await contractFunction();
    const productdetails = await getProductDetails("65be2cdee13c259bb17380bf");
    const userID = auth.user.id
    console.log(productdetails)
    console.log(auth.user.id)

    const manufacturerDashboard = await getManufacturerUserDashboardDetails(userID)
    setTabledata(manufacturerDashboard)
}

useEffect(()=>{
 fetchapi();
},[])

    return (
<>
     <Toaster/>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 bg-white py-20">

            <Dialog.Root>
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
                <div className="mt-3 md:mt-0">
                    
                    <Dialog.Trigger className="w-32 py-2 ml-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center">
                     Add Products
                     </Dialog.Trigger>
                </div>
            </div>
            <div className="mt-12 relative h-max overflow-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Product Name</th>
                            <th className="py-3 pr-6">Product Id</th>
                            <th className="py-3 pr-6">Date</th>
                            <th className="py-3 pr-6">Price</th>
                            <th className="py-3 pr-6">Distributor Email</th>
                            <th className="py-3 pr-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tabledata && tabledata.map((item, idx) => (
                                <tr key={idx}>
                                  {item.map((value, index) => (
                                    <td key={index} className="pr-6 py-4 whitespace-nowrap">{value}</td>
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
                                    <a href={`/veiwproduct/${item[1]}`} className="py-1.5 px-3 text-white duration-150 bg-blue-400 border rounded-lg">
                                      View Product
                                    </a>
                                  </td>
                                </tr>
                              ))
                        }
                    </tbody>
                </table>
            </div>
            
     
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
          <div className="bg-white rounded-md shadow-lg px-10 py-6">
             
            <Dialog.Title className="text-lg font-medium text-gray-800 text-center mt-3">
              Add Product
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-sm leading-relaxed text-center text-gray-500 flex flex-col justify-center items-start">
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                required
                className='w-full mt-1 focus:border-blue-600 px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150'
              />
            </div>
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Price</label>
              <input
                type='text'
                value={price}
                onChange={(e)=>setPrice(e.target.value)} 
                required
                className=' mt-1 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150'
              />
            </div>
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Description</label>
              <input
                type='text'
                
                onChange={(e)=>setDescription(e.target.value)} 
                required
                className=' mt-1 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150'
              />
            </div>
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Distributor Email</label>
              <input
                type='email'
                
                onChange={(e)=>setDistributor(e.target.value)} 
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
                <button className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2" onClick={handleaddproduct}>
                  Add Product
                </button>
                </Dialog.Close>
             
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
        </div>
        </>
    )
}