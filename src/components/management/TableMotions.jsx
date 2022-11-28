import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel, faTrash} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import {DownloadTableExcel} from 'react-export-table-to-excel';
import React, {useRef} from "react";

const Table = ({data, remove}) => {
    const columns = ['Fecha', 'Remitente', 'Destinatario', 'Cantidad', 'Acciones',]
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="stock-jabas"
            sheet="jabas"
            currentTableRef={tableRef.current}
        >
            <button
                className=" border-0 text-lg h-12 w-36 bg-green-400 hover:bg-green-500 text-white mt-2 px-3 rounded-md">
                <span>Descargar</span>
                <FontAwesomeIcon icon={faFileExcel} className={"ml-2"}/>
            </button>

        </DownloadTableExcel>
        <table ref={tableRef} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <td className="py-4 px-6 whitespace-nowrap text-center"><span>{new Date(row?.date).toLocaleDateString("es-ES", {
                    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
                })}</span></td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.remitter}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.receiver}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.quantity}</td>

                <td scope="row"
                    className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <FontAwesomeIcon icon={faTrash} className={"text-red-400 cursor-pointer"}
                                     onClick={(e) => {
                                         remove(row?.id)
                                     }}
                    />
                </td>

            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;