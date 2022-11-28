import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";
import {Link} from "react-router-dom";

const Table = ({data,type}) => {
    const columns = ['', 'Nombre', 'RUC', 'Pais', 'Contacto', 'Email'];
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
                <td scope="row"
                    className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/business-partners/${type}/${row?.slug}`}><FontAwesomeIcon icon={faEye}
                                                                                          className={"cursor-pointer text-black"}/></Link>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center text-black  ">{row?.name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.ruc}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.country}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.contact}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.email}</td>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;