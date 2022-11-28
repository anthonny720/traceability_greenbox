import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";

const Table = ({data, remove}) => {
    const columns = ['Fecha de Recepción', 'Fecha de liberación', 'Fecha de expiración', 'Lote', 'Descripción', 'Cantidad', 'Acciones'];
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

                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.date}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.release_date}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.expiration_date}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.lot}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.description}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.quantity}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">
                    <FontAwesomeIcon className={"text-red-400 cursor-pointer"} title={"Eliminar"} icon={faTrash}
                                     onClick={() => remove(row?.id)}/>
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