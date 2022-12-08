import React from 'react';
import Humanize from 'humanize-plus';

const Information = ({data}) => {
    return (<div className={"flex  flex-wrap  w-full gap-8 p-2 justify-center"}>
        <div className="bg-gray-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
            <div className="flex items-center">
                <div className="h-1 w-1 rounded-full bg-green-500 mr-1"/>
                <span className="text-xs text-black font-normal">procesado: {data?.total_indicted}</span>
                <span className="text-xs text-black font-normal">Total de jabas: {data?.quantity_boxes}</span>
            </div>
        </div>
        <div className="bg-gray-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
            <div className="flex items-center">
                <div className="h-1 w-1 rounded-full bg-green-500 mr-1"/>
                <span
                    className="text-xs text-black font-normal">Peso Inicial Bruto: {Humanize.formatNumber(data?.brute_weight, 2)}</span>
            </div>
        </div>
        <div className="bg-gray-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
            <div className="flex items-center">
                <div className="h-1 w-1 rounded-full bg-green-500 mr-1"/>
                <span
                    className="text-xs text-black font-normal">Peso Inicial Neto: {Humanize.formatNumber(data?.net_weight, 2)}</span>
            </div>
        </div>
        <div className="bg-gray-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
            <div className="flex items-center">
                <div className="h-1 w-1 rounded-full bg-green-500 mr-1"/>
                <span
                    className="text-xs text-black font-normal">Peso Final Bruto: {Humanize.formatNumber(data?.final_weight, 2)}</span>
            </div>
        </div>
        <div className="bg-gray-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
            <div className="flex items-center">
                <div className="h-1 w-1 rounded-full bg-green-500 mr-1"/>
                <span
                    className="text-xs text-black font-normal">Peso Final Neto: {Humanize.formatNumber(data?.net_final_weight, 2)}</span>
            </div>
        </div>
        <div className="bg-gray-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
            <div className="flex items-center">
                <div className="h-1 w-1 rounded-full bg-green-500 mr-1"/>
                <span
                    className="text-xs text-black font-normal">Tara: {Humanize.formatNumber(data?.total_tare, 2)}</span>
            </div>
        </div>
        <div className="bg-gray-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
            <div className="flex items-center">
                <div className="h-1 w-1 rounded-full bg-green-500 mr-1"/>
                <span
                    className="text-xs text-black font-normal">Muestra de calidad: {Humanize.formatNumber(data?.quality, 2)}</span>
            </div>
        </div>
        <div className="bg-gray-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
            <div className="flex items-center">
                <div className="h-1 w-1 rounded-full bg-green-500 mr-1"/>
                <span className="text-xs text-black font-normal">Stock: {Humanize.formatNumber(data?.stock, 2)}</span>
            </div>
        </div>
        <div className="bg-gray-200 p-2 h-8 w-max mb-4 md:mb-0 rounded-md flex items-center justify-center">
            <div className="flex items-center">
                <div className="h-1 w-1 rounded-full bg-green-500 mr-1"/>
                <span
                    className="text-xs text-black font-normal">Merma: {Humanize.formatNumber(data?.decrease, 2)}</span>
            </div>
        </div>
    </div>);
};

export default Information;
