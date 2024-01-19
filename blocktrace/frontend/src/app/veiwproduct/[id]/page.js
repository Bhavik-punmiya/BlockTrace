'use client'

import React, { useEffect } from 'react'
import Footer from '../../components/Footer'
import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react';
import axios from 'axios';
import { useParams } from 'next/navigation'

function page() {
    const[productd,setProductd]=useState('');
    const [steps, setSteps] = useState({
        stepsItems: ["Manufacturer", "Distributor", "Logistic", "Consumer"],
        currentStep: 0
    });

    const params = useParams();
    const [state, setState] = useState(false)
    const calculateCompletedSteps = (timeline) => {
        const stepOrder = ["manufacturer", "distributor", "logistics", "consumer"]; // Include 'consumer' if it appears in the timeline
        let completedSteps = stepOrder.reduce((acc, step) => timeline[step] ? acc + 1 : acc, 0);

        // If all previous steps are completed but 'consumer' step data is not in timeline, mark 'consumer' as the current step
        if (completedSteps === stepOrder.length - 1 && !timeline["consumer"]) {
            completedSteps = stepOrder.length - 1;
        }

        return completedSteps;
    };
    const stepToTimelineKey = {
        "Manufacturer": "manufacturer",
        "Distributor": "distributor",
        "Logistic": "logistics", // Adjusted key for 'Logistic'
        "Consumer": "consumer"
    };

   const fetchapi=async ()=>{
    const res = await axios.post("http://localhost:8080/api/getproductdetails",
    {  
        "productID" : params.id
          
       });
      

    const timeline = res.data?.Product?.timeline;
    if (timeline) {
        const completedSteps = calculateCompletedSteps(timeline);
        setSteps(prev => ({ ...prev, currentStep: completedSteps }));
    }


    console.log(res.data)
    setProductd(res.data)
   }



   useEffect(()=>{
    fetchapi();
   },[])
  return (
    <div>
      <header className="text-base lg:text-sm">
        <div className={`bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${state ? "h-full fixed inset-x-0" : ""}`}>
            <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
                <p className='text-blue-800 text-lg font-bold'>BlockTrace</p>
                <div className="lg:hidden">
                    <button className="text-gray-500 hover:text-gray-800"
                        onClick={() => setState(!state)}
                    >
                        {
                            state ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                </svg>

                            )
                        }
                    </button>
                </div>
            </div>
            <div className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${state ? "" : "hidden"}`}>
               
            </div>
        </div>
   
    </header>
     
    <div class="w-1/2 rounded-lg border border-blue-500 py-10 shadow-sm mx-auto my-10 p-10">
  <dl class="-my-3 divide-y divide-gray-100 text-sm">
    <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Product ID :</dt>
      <dd class="text-gray-700 sm:col-span-2">{productd?.Product?.ProductID}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Name</dt>
      <dd class="text-gray-700 sm:col-span-2">{productd?.Product?.ProductName}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Description</dt>
      <dd class="text-gray-700 sm:col-span-2">{productd?.Product?.Description}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Price</dt>
      <dd class="text-gray-700 sm:col-span-2">{productd?.Product?.price}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Distributor Email</dt>
      <dd class="text-gray-700 sm:col-span-2">
         {
            productd?.Product?.Distribution?.Distributoremail


         }
      </dd>
    </div>
    <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">Customer Email</dt>
      <dd class="text-gray-700 sm:col-span-2">
         {
            productd?.Product?.customeremail


         }
      </dd>
    </div>

     <div className=' w-full py-10 m-auto '>
     <QRCodeSVG value={productd?.Product?.ProductID} className='m-auto' />
     </div>



    <div class="w-full my-10">
    <div className="max-w-2xl mx-auto px-4 md:px-0">
                <ul aria-label="Steps" className="text-gray-600 font-medium md:flex md:justify-between">
                    {steps.stepsItems.map((item, idx) => (
                        <li key={idx} className="flex flex-col items-center md:flex-1">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 ${steps.currentStep > idx ? "bg-indigo-600 border-indigo-600" : steps.currentStep === idx ? "border-indigo-600" : "border-gray-300"}`}>
                                {steps.currentStep > idx ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                ) : (
                                    <span className="text-sm font-semibold text-gray-700">{idx + 1}</span>
                                )}
                            </div>
                            <h3 className={`text-sm mb-1 ${steps.currentStep === idx ? "text-indigo-600 font-bold" : "text-gray-500"}`}>
                                {item}
                            </h3>
                            <p className="text-xs text-gray-500 text-center">
                                {productd?.Product?.timeline[stepToTimelineKey[item]]}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
    </div>

  </dl>
</div>
   




    <Footer/>
    </div>
  )
}

export default page
