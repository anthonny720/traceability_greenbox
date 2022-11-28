import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import {DownloadTableExcel} from 'react-export-table-to-excel';
import React, {useRef} from "react";
import Humanize from 'humanize-plus';
import {Link} from "react-router-dom";

const Table = ({data, update}) => {
    const columns = ['Acciones', 'Semana', 'Mes', 'Año', 'Lote', 'Calibre', '% Ojitos', 'Peso en fresco (corte 1/8)', '% Corte 1/8 en fresco', 'Peso corte <> de 1/8', '% peso corte <> de 1/8', 'Peso total por bandeja']
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


                <td className="py-4 px-6 whitespace-nowrap text-center">{<FontAwesomeIcon icon={faEdit}
                                                                                          className={"cursor-pointer ml-6 text-blue-500"}
                                                                                          onClick={(e) => {
                                                                                              update(row)
                                                                                          }}
                />}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.week}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.month}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.year}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center"><Link to={`/lot/${row?.lot_name}`}><p
                    className={"cursor-pointer hover:text-[#26d07d] text-xs text-center"}>{row?.lot_name}</p></Link>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.caliber, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.eyes, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.cut_fresh_1_8, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.percentage_cut_fresh_1_8, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.cut_1_8, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.percentage_cut_1_8, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.total_weight, 2)}</td>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;