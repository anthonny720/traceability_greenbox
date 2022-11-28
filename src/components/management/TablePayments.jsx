import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExcel, faTrash} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import {DownloadTableExcel} from 'react-export-table-to-excel';
import React, {useRef} from "react";
import Humanize from "humanize-plus";

const Table = ({data, update, remove}) => {
    const columns = ['Fecha', 'Nombre', 'Razon social', 'Informe', 'Peso', 'Recibo', 'Monto', 'Fecha de cancelacion', 'Estado', 'Acciones']
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="pagos-estibadores"
            sheet="pagos"
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


                <td className="py-4 px-6 whitespace-nowrap text-center">{<p
                    className={" text-center text-xs"}>{new Date(row?.date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC',
                })}</p>}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.business_name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.report}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.weight, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.receipt}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.amount, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{<p
                    className={" text-center text-xs"}>{new Date(row?.cancelled).toLocaleDateString('es-PE', {
                    timeZone: 'UTC',
                })}</p>}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.status ?
                    <h1 className={"bg-green-400  text-center text-white p-2 rounded-2xl"}>Pagado</h1> :
                    <h1 className={"bg-red-400 text-center text-white p-2 rounded-2xl"}>Pendiente</h1>}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-4 ">
                        <FontAwesomeIcon icon={faEdit} className={"text-blue-500 cursor-pointer"} onClick={() => {
                            update(row)

                        }}/>
                        <FontAwesomeIcon icon={faTrash} className={"text-red-500 cursor-pointer"} onClick={() => {
                            remove(row.id)
                        }}/>

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