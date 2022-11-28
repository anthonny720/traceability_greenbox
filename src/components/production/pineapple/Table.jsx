import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faFileExcel, faWorm} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import {DownloadTableExcel} from 'react-export-table-to-excel';
import React, {useRef} from "react";
import {Link} from "react-router-dom";
import Humanize from "humanize-plus";

const Table = ({data}) => {
    const columns = ['Id', 'Fecha de Descarga', 'Producto', 'Lote', 'Condición', 'Variedad', 'Stock', 'Peso neto', 'Acciones']
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="users table"
            sheet="users"
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
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.id}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{new Date(row?.downloadDate).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                })}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.category_name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.lot}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.condition}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.variety}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center"><p
                    className={row?.stock > 0 ? 'text-white p-1 rounded-full  text-center bg-green-400' : 'text-transparent'}>{Humanize.formatNumber(row?.stock, 2)}</p>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.net_weight, 2)}</td>
                <td scope="row"
                    className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div>
                        <Link to={`/lot/${row.lot}`}>
                            <FontAwesomeIcon className={"hover:text-orange-400 text-black"} title={"Detalles"}
                                             icon={faEye}/>
                        </Link>
                        <Link to={`/process-line/${row.lot}`}>
                            <FontAwesomeIcon className={"text-[#26d07d] ml-2 hover:text-green-600"}
                                             title={"Linea de Proceso"}
                                             icon={faWorm}/>
                        </Link>
                    </div>
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