import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import QrReader from 'react-qr-scanner'



function Csection() {
 const[productid, setProductid]=useState('');
const router = useRouter();


 const handlegetdetailes=()=>{
   router.push(`/veiwproduct/${productid}`);
 }

 const previewStyle = {
    height: 240,
    width: 320,
  }
 const handleScan=(data)=>{
   setProductid(data)
   console.log(productid);
   
  }
 const handleError=(err)=>{
    console.error(err)
  }


  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto p-10 flex flex-col justify-center items-center'>
            <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>Product ID</label>
              <input
                type='text'
                 value={productid}
                 onChange={(e)=>setProductid(e.target.value)} 
                className=' mt-1 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150'
              />
              </div>
                <p className=' font-bold text-blue-900 py-2'>OR</p>
                <div className="flex flex-col items-start w-full mt-2">
              <label className='font-medium'>QR Code</label>
                       {/* <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
                     <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                         <svg className="w-10 h-10 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                         </svg>
                         <p className="mt-3 text-gray-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your  file</span> or drag and drop your file here</p>
                     </label>
                     <input id="file" type="file" className="hidden" />
                  </div> */}
                  <QrReader
          delay={10000}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          />

            </div>

            <button onClick={()=>(handlegetdetailes)}className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2" >
                  Get Details
                </button>
            
    </div>
  )
}

export default Csection
