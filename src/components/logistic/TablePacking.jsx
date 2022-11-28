import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";
import {Link} from "react-router-dom";

const Table = ({data}) => {
    const columns = ['Programa de despacho', 'Destino', 'OC', 'Guia de Remisión', 'FCL/LCL', ''];
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <table ref={tableRef} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <td className="py-4 px-6 whitespace-nowrap text-center"><p
                    className={"text-center text-xs"}>{new Date(row?.date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                })}</p></td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.destine}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.order}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.guide}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center"><Link to={`/logistic/reception/${row?.slug}`}
                                                                              className={"text-center text-xs hover:text-[#26d07d] hover:font-semibold"}>{row?.reception}</Link>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center">
                    <Link to={`/logistic/packing-list/${row?.slug}`}>
                        <FontAwesomeIcon className={"hover:text-orange-400 text-black"} title={"Detalles"}
                                         icon={faEye}/>
                    </Link>
                </td>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={20}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;