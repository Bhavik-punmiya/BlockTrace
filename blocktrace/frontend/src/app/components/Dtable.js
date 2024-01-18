
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useState } from "react";
import { useAuth } from '../context/auth'
import toast, { Toaster } from "react-hot-toast";


export default () => {
    const[name,setName]=useState('')
    const[price,setPrice]=useState('')
    const[description,setDescription]=useState('')
    const[distributor,setDistributor]=useState('')
    const[auth]=useAuth()
    const tableItems = [
        {
            name: "Solo learn app",
            date: "Oct 9, 2023",
            status: "Active",
            price: "$35.000",
            plan: "Monthly subscription"
        },
        {
            name: "Window wrapper",
            date: "Oct 12, 2023",
            status: "Active",
            price: "$12.000",
            plan: "Monthly subscription"
        },
        {
            name: "Unity loroin",
            date: "Oct 22, 2023",
            status: "Archived",
            price: "$20.000",
            plan: "Annually subscription"
        },
        {
            name: "Background remover",
            date: "Jan 5, 2023",
            status: "Active",
            price: "$5.000",
            plan: "Monthly subscription"
        },
        {
            name: "Colon tiger",
            date: "Jan 6, 2023",
            status: "Active",
            price: "$9.000",
            plan: "Annually subscription"
        },
    ]


    return (
        <Dialog.Root>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 bg-white py-20">
            
            <div className="items-start justify-between md:flex bg-white">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        All products
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
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
                            <th className="py-3 pr-6">name</th>
                            <th className="py-3 pr-6">date</th>
                            <th className="py-3 pr-6">status</th>
                            <th className="py-3 pr-6">Purchase</th>
                            <th className="py-3 pr-6">price</th>
                            <th className="py-3 pr-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tableItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.date}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.plan}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.price}</td>
                                    <td className="text-right whitespace-nowrap">
                                       <Dialog.Trigger> <button  className="py-1.5 px-3 text-white hover:text-gray-500 duration-150 hover: bg-blue-400 border rounded-lg">
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
                <button className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
                  Shipment
                </button>
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