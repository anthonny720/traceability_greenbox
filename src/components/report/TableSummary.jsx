import React from 'react';
import {map} from 'lodash';

const TableSummary = ({summary_avg_price}) => {


    const labels = ['Proveedor', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return (<div className={"flex justify-center w-full"}>
        <div className="overflow-x-auto bg-white p-4 relative  mt-4 scrollbar-hide  rounded-xl">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {map(labels, (label, index) => {
                        return (<th key={index} scope="col" className="py-3 px-6">{label}</th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {map(summary_avg_price, (data, index) => {
                    return (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                            <td>{data.label}</td>
                            {map(data.data, (data, index) => {
                                return (<td key={index} className="py-2 px-2">S/{data}</td>)
                            })}
                        </tr>)
                })}
                </tbody>
            </table>
        </div>
    </div>);
};

export default TableSummary;
