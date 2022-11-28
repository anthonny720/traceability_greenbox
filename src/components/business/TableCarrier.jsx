import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

const Table = ({data, remove, edit}) => {
    const columns = ['', 'Nombre', 'RUC', 'Placa'];
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

                <td className="py-4 px-6 whitespace-nowrap text-center text-black font-semibold "><FontAwesomeIcon
                    icon={faTrash} className={"cursor-pointer text-red-500"}
                    onClick={(e) => {
                        remove(row.id)
                    }}
                />
                    <FontAwesomeIcon icon={faEdit} className={"cursor-pointer ml-6 text-blue-500"}
                                     onClick={(e) => {
                                         edit(row)
                                     }}
                    /></td>
                <td className="py-4 px-6 whitespace-nowrap text-center text-black  ">{row?.name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.ruc}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.code}</td>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;