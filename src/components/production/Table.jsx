import React from 'react';
import {map, omit} from "lodash";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Humanize from 'humanize-plus'

const TableProduction = ({columns, data, delete_info}) => {
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {map(data, (row, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                    <td  className="text-center py-3">
                        <FontAwesomeIcon icon={faTrash} className={"cursor-pointer text-red-500"}
                                         onClick={() => delete_info(row.id)}/></td>
                    <td  className="text-center py-3">{index + 1}</td>

                    {map(omit(row, ['id']), (column, index) => (<td key={index}
                                                                    className="text-center py-3">{typeof (column) === "number" ? Humanize.formatNumber(column, 2) : column}</td>))}
                </tr>))}
            </tbody>
        </table>
    </div>);
};

export default TableProduction;
