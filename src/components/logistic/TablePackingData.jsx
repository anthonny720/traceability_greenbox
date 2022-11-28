import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";
import Humanize from "humanize-plus";

const Table = ({data, remove}) => {
    const columns = ['N°', 'Fecha de vencimiento', 'Lote', 'Cajas', 'Bolsas', 'Peso', 'Descripción', 'Acciones'];
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

                <td className="py-4 px-6 whitespace-nowrap text-center"><p
                    className={"bg-black rounded-full p-1 text-white text-center font-bold"}>{row?.number}</p></td>
                <td className="py-4 px-6 whitespace-nowrap text-center"><p
                    className={"text-center text-xs"}>{new Date(row?.expiration_date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                })}</p></td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.lot}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.boxes}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.bags_total}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.weight_total, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.description}</td>
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