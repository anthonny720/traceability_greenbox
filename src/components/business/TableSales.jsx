import React from 'react';
import {map, omit, size} from "lodash";
import Humanize from "humanize-plus";
import Skeleton from "react-loading-skeleton";
import {useNavigate} from "react-router-dom";


const TableSales = ({columns, data, type}) => {
    const navigate = useNavigate()

    return (<div className="overflow-x-auto relative scrollbar-hide">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {type !== "logistic" ? (
                            <td key={index}
                                onClick={() => navigate(`/process-line/${row?.lot}`)}
                                onAuxClick={() => navigate(`/lot/${row?.lot}`)}
                                className={"text-xs cursor-pointer hover:text-[#26d07d]  text-center"}>{row?.lot}</td>
                        ) :
                        (<td key={index}
                             onAuxClick={() => navigate(`/logistic/reception/${row?.slug}`)}
                             onClick={() => navigate(`/logistic/packing-list/${row?.slug}`)}
                             className={"text-xs cursor-pointer hover:text-[#26d07d]  text-center"}>{row?.reception}</td>)
                    }

                    {map(omit(row, ['reception', 'lot_mp', 'lot_pt', 'lot', 'bag', 'box', 'destine', 'doc', 'docs', 'id', 'slug', 'status']), (value, index) => (
                        <td key={index}
                            className="py-4 px-6 whitespace-nowrap text-center">{typeof (value) === 'number' ? Humanize.formatNumber(value, 2) : value}</td>))}
                </tr>)) : map(columns, (column, index) => (
                <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}

            </tbody>
        </table>
    </div>);
};

export default TableSales;
