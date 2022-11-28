import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import {DownloadTableExcel} from 'react-export-table-to-excel';
import React, {useRef} from "react";
import Humanize from "humanize-plus";
const Table = ({data}) => {
    const columns = ['Semana', 'Fecha de envasado', 'Fecha de Liberación', 'Lote', 'Cantidad', 'Cliente', 'Cajas', 'Bolsas', 'Observaciones']
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="liberación"
            sheet="liberación"
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


                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.week}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{<p
                    className={"text-xs text-center"}>{new Date(row?.packing_date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                })}</p>}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{<p
                    className={"text-xs text-center"}>{new Date(row?.release_date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                })}</p>}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.lot}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.quantity, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.client}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.lot_boxes}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.lot_bags}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.observations}</td>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;