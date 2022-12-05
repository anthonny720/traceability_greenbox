import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";

const Table = ({data}) => {
    const columns = ['', 'Lote', 'Stock', 'Familia', 'Grupo', 'Tipo', 'Producto', 'Corte', 'Variedad', 'Cliente', 'Presentación', 'Embalaje', 'Empaque', 'Fecha de proceso', 'Fecha de vencimiento', 'N° Caja', 'Proveedor', 'Condición', 'Fcl']
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">

        <table ref={tableRef} className="w-full rounded-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <td className="px-6 py-4 text-center">{row?.name}</td>
                <td className="px-6 py-4 text-center">{row?.name}</td>
                <td className="px-6 py-4 text-center">{row?.stock}</td>
                <td className="px-6 py-4 text-center">{row?.family_name}</td>
                <td className="px-6 py-4 text-center">{row?.group_name}</td>
                <td className="px-6 py-4 text-center">{row?.type_inf_name}</td>
                <td className="px-6 py-4 text-center">{row?.product_name}</td>
                <td className="px-6 py-4 text-center">{row?.cut_name}</td>
                <td className="px-6 py-4 text-center">{row?.variety_name}</td>
                <td className="px-6 py-4 text-center">{row?.client_name}</td>
                <td className="px-6 py-4 text-center">{row?.presentation_name}</td>
                <td className="px-6 py-4 text-center">{row?.packaging_name}</td>
                <td className="px-6 py-4 text-center">{row?.packing_name}</td>
                <td className="px-6 py-4 text-center">{row?.production_date}</td>
                <td className="px-6 py-4 text-center">{row?.expiring_date}</td>
                <td className="px-6 py-4 text-center">{row?.boxes}</td>
                <td className="px-6 py-4 text-center">{row?.provider_name}</td>
                <td className="px-6 py-4 text-center">{row?.condition_name}</td>
                <td className="px-6 py-4 text-center">{row?.fcl}</td>
            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;