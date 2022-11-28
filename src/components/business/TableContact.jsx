import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {map, size} from "lodash";
import React, {useRef} from "react";
import Skeleton from "react-loading-skeleton";

const Table = ({data, edit, remove}) => {
    const columns = ['', 'Nombre', 'DNI', 'Celular', 'Email', 'Licencia', 'Referencia'];
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
                <td scope="row"
                    className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div>
                        <FontAwesomeIcon icon={faTrash} className={"cursor-pointer text-red-500"}
                                         onClick={(e) => {
                                             remove(row?.id)
                                         }}
                        />
                        <FontAwesomeIcon icon={faEdit} className={"cursor-pointer ml-6 text-blue-500"}
                                         onClick={(e) => {
                                             edit(row)
                                         }}
                        /></div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center text-black  ">{row?.name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.dni}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.phone}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.email}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.licence}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.reference}</td>
            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;