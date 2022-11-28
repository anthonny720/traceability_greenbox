import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBus,
    faCalendar,
    faFileInvoice,
    faGlobeAmericas,
    faInfo,
    faLeaf,
    faLock,
    faLockOpen,
    faPersonChalkboard,
    faTrash,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const ListDetail = ({lot, handleDelete, handleViewer}) => {
    const navigate = useNavigate()

    return (<div className=" lg:w-96 w-max   px-4 overflow-x-hidden">
            <div className="border rounded-lg border pb-6 border-gray-200 dark:border-gray-700 ">
                <div
                    className="flex items-center border-b border-gray-200 dark:border-gray-700  justify-between px-6 py-3">
                    {lot?.closed ? <FontAwesomeIcon icon={faLock}/> : <FontAwesomeIcon icon={faLockOpen}/>}
                    <p tabIndex="0"
                       className="focus:outline-none text-sm lg:text-xl font-semibold leading-tight text-gray-800 dark:text-white ">Detalles:</p>
                    <div>
                        <FontAwesomeIcon icon={faTrash} className="text-red-400 mx-2 cursor-pointer"
                                         onClick={handleDelete}/>
                        {lot?.document !== null && lot?.document !== "" &&
                            <FontAwesomeIcon icon={faFileInvoice} className="text-cyan-600 mx-2 cursor-pointer"
                                             onClick={handleViewer}/>
                        }


                    </div>
                </div>
                <div className="px-4 pt-6 h-max  ">
                    <table className="w-full whitespace-nowrap">
                        <tbody>
                        <tr className="flex flex-col">
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-gray-300 text-white   rounded-full  p-2.5">
                                        <FontAwesomeIcon icon={faInfo} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800 dark:text-white ">Lote</p>
                                        </div>
                                        <p className="text-sm text-gray-400">{lot?.lot}</p>

                                        <div
                                            className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-orange-400 text-white rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faCalendar} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800 dark:text-white ">Fecha de
                                                ingreso-descarga: </p>
                                        </div>
                                        <p className="text-sm text-gray-400">{new Date(lot?.entryDate).toLocaleDateString('es-PE', {
                                            timeZone: 'UTC',
                                        })}
                                            - {new Date(lot?.downloadDate).toLocaleDateString('es-PE', {
                                                timeZone: 'UTC',
                                            })}</p>

                                        <div
                                            className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-purple-500 text-white  rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faGlobeAmericas} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800 dark:text-white ">Parcela</p>
                                        </div>
                                        <p className="text-sm text-gray-400">{lot?.parcel}</p>

                                        <div
                                            className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-emerald-600  rounded-full text-white p-2.5">
                                        <FontAwesomeIcon icon={faLeaf} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800 dark:text-white ">Origen</p>
                                        </div>
                                        <p className="text-sm text-gray-400">{lot?.origin}</p>

                                        <div
                                            className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-amber-400 text-white   rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faUsers} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800 dark:text-white ">Guia del
                                                proveedor</p>
                                        </div>
                                        <p onClick={() => navigate(`/contacts/providers/${slugify(lot?.provider_name)}`)}
                                           className=" text-sm text-gray-400">{lot?.providerGuide} - {lot?.starting_point_date && new Date(lot?.starting_point_date).toLocaleDateString('es-PE', {
                                            timeZone: 'UTC',
                                        })}</p>

                                        <div
                                            className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-sky-600 text-white rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faBus} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800 dark:text-white ">Guia de
                                                transportista</p>

                                        </div>
                                        <p className="text-sm text-gray-400">{lot?.carrierGuide}</p>

                                        <div
                                            className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-yellow-800 text-white  rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faPersonChalkboard} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800 dark:text-white ">Proveedor</p>
                                        </div>
                                        <span className="text-sm text-gray-400 ">{lot?.provider_name}</span>
                                        <div
                                            className="flex items-center justify-center px-1 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default ListDetail;
