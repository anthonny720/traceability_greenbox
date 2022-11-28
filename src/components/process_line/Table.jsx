import React from 'react';
import {map, omit} from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import Humanize from "humanize-plus";

const TableProcess = ({columns, data, remove,edit}) => {
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null ? map(data, (row, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                        className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">

                        <FontAwesomeIcon icon={faEdit} className={"cursor-pointer mr-2 text-blue-500"}
                                         onClick={() => {edit(row)}}
                        />
                        <FontAwesomeIcon icon={faTrash} className={"cursor-pointer text-red-500"}
                                         onClick={() => {remove(row.id)}}
                        />
                    </th>
                    {map(omit(row, ['id', 'week', 'month', 'year', 'lot_mp','lot_id','process_id','type_id','client_id', 'lot_bags_id', 'lot_boxes_id']), (value, index) => (<td key={index}
                                                                                                      className="py-4 px-6 whitespace-nowrap">{typeof (value) === 'number' ? Humanize.formatNumber(value, 2) : value}</td>))}
                </tr>)) : map(columns, (column, index) => (
                <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}

            </tbody>
        </table>
    </div>);
};

export default TableProcess;
