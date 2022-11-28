import React from 'react';
import {map} from "lodash";

const TimeLine = ({data}) => {
    const key_timeline=Object.keys(data.summary.hours)
    const values_timeline=Object.values(data.summary.hours)
    return (<div className="w-full flex justify-center bg-white  rounded-md shadow-lg flex-wrap">
        {map(key_timeline, (key,index) => (
            <div className="flex flex-row">
                <div className="flex flex-col items-center ">
                    <div>
                        <div className="flex items-center justify-center w-10 h-10 border-t rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M17 13l-5 5m0 0l-5-5m5 5V6"/>
                            </svg>
                        </div>
                    </div>
                    <div className="w-px h-12 bg-gray-300"></div>
                </div>
                <div className="pb-8 ">
                    <p className="mb-2 text-xl font-bold text-gray-600 text-center hover:text-[#26d07d]">{key}</p>
                    <p className="text-gray-700 text-sm">
                        {values_timeline[index]===null?"00:00:00 AM  -  00:00:00 PM":values_timeline[index]}
                    </p>
                </div>
            </div>))}
    </div>);
};

export default TimeLine;
