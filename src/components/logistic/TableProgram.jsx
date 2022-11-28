import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";
import {Link} from "react-router-dom";

const Table = ({data}) => {
    const columns = ['Programa de Despacho', 'Tipo', 'Método', 'FCL/LCL', 'Acciones'];
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
                <td className="py-4 px-6 whitespace-nowrap text-center text-black  "><p
                    className={"text-center text-xs"}>{new Date(row.date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                })}</p></td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.type}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.method}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">
                    <Link to={`/logistic/reception/${row?.slug}`}>
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