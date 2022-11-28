import React from 'react';
import {Link} from "react-router-dom";
import {map} from "lodash";
import Humanize from 'humanize-plus'
import TimeLine from "./TimeLine";
import {faEdit, faLock, faLockOpen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Summary = ({data, delete_process, update_process}) => {
    const key_data = Object.keys(data.summary.data)
    const values_data = Object.values(data.summary.data)

    return (<div className="max-w-full  mx-auto my-3 md:px-8">

        <div className="relative block flex flex-col md:flex-row items-center">
            <div
                className="w-full relative z-0 rounded-lg shadow-lg md:-mr-4">

                <div className="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                    <div
                        className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">

                        <h1 className="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide w-full">
                            {data?.status ? <FontAwesomeIcon className={"text-xs"} icon={faLock}/> :
                                <FontAwesomeIcon className={"text-xs"} icon={faLockOpen}/>} Resumen de la producción

                        </h1>
                        <div className="flex flex-row justify-center gap-4">
                            <FontAwesomeIcon icon={faTrash} onClick={() => {
                                delete_process()
                            }} className={"text-red-400 text-xs cursor-pointer"}/>

                            <Link to={`/lot/${data?.lot_name}`}
                                  className="text-sm hover:text-[#26d07d] font-semibold text-gray-500 text-center pb-6 cursor-pointer">
                                <p>{data?.lot_name} - {new Date(data?.date).toLocaleDateString('es-PE', {
                                    timeZone: 'UTC',
                                })}
                                </p></Link>
                            <FontAwesomeIcon onClick={() => {
                                update_process()
                            }} icon={faEdit} className={"text-xs text-blue-400 cursor-pointer"}/>
                        </div>


                    </div>

                    <div className="flex flex-wrap px-6">
                        <ul className={"flex grid md:grid-cols-2  w-full mb-2"}>
                            {key_data && map(key_data, (key, index) => {
                                return (<li className="flex items-center" key={index}>
                                    <div className=" rounded-full p-2 fill-current text-green-700">
                                        <svg className="w-6 h-6 align-middle" width="24" height="24" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path
                                                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                            ></path>
                                            <polyline
                                                points="22 4 12 14.01 9 11.01"
                                            ></polyline>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 text-lg ml-3">{key}: &nbsp;&nbsp;
                                        {typeof (values_data[index]) === "number" ? Humanize.formatNumber(values_data[index], 2) : values_data[index]}
                                    </span
                                    >
                                </li>)
                            })}

                        </ul>
                    </div>

                </div>
                <TimeLine data={data}/>
            </div>
        </div>
    </div>);
};
export default Summary;
