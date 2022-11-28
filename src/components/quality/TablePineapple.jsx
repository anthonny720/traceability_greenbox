import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import {DownloadTableExcel} from 'react-export-table-to-excel';
import React, {useRef} from "react";
import {Link} from "react-router-dom";
import Humanize from 'humanize-plus'

const Table = ({data, update}) => {
    const columns = ['Acciones', 'Lote MP', 'Peso neto', 'Jabas', 'Maduración 0 %', 'Maduración 1 %', 'Maduración 2 %', 'Maduración 3 %', 'Maduración 4 %', 'Maduración 5 %', 'Maduración Total %', 'Calibre 6 %', 'Calibre 8 %', 'Calibre 10 %', 'Calibre 12 %', 'Calibre 14 %']
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="prueba-cortes"
            sheet="cortes"
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
                <td className="py-4 px-6 whitespace-nowrap text-center">{<FontAwesomeIcon
                    className={"text-blue-400 cursor-pointer"} icon={faEdit}
                    onClick={() => update(row)}/>}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{<Link to={`/lot/${row?.lot_name}`}><p
                    className={"cursor-pointer hover:text-[#26d07d] text-xs text-center"}>{row?.lot_name}</p>
                </Link>}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.net_weight, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.boxes}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.maturation_0_plant, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.maturation_1_plant, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.maturation_2_plant, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.maturation_3_plant, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.maturation_4_plant, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.maturation_5_plant, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.maturation_total, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.calibers?.c6, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.calibers?.c8, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.calibers.c10, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.calibers.c12, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.calibers.c14, 2)}</td>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}

            </tbody>
        </table>
    </div>);
};
export default Table;