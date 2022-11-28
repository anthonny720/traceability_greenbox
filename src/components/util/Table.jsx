import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExcel, faTrash} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, omit, size} from "lodash";
import {DownloadTableExcel} from 'react-export-table-to-excel';
import React, {useRef} from "react";
import Humanize from "humanize-plus";

const Table = ({data,columns, remove, edit, humanize, omit_data}) => {
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="materia-prima"
            sheet="materia-prima"
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
            {data !== null && size(data) > 0 ? map(data, (row, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                        className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">

                        <FontAwesomeIcon icon={faEdit} className={"cursor-pointer mr-2 text-blue-500"}
                                         onClick={() => {
                                             edit(row)
                                         }}
                        />
                        <FontAwesomeIcon icon={faTrash} className={"cursor-pointer text-red-500"}
                                         onClick={() => {
                                             remove(row.id)
                                         }}
                        />
                    </th>
                    {map(omit(row, omit_data), (value, index) => (<td key={index}
                                                                      className="py-4 px-6 whitespace-nowrap text-center">{humanize ? typeof (value) === 'number' ? Humanize.formatNumber(value, 1) : value : value

                    }</td>))}
                </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};


export default Table;