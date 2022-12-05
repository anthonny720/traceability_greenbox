import React from 'react';
import Humanize from 'humanize-plus'
import {map} from "lodash";

const SummaryStock = ({products}) => {
    return (<div className={"flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0 justify-center "}>
            {map(products, (product, index) => <div key={index} className="p-2 w-max lg:w-1/6 w-1/2">
                <div
                    className={`flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] hover:from-rose-500 hover:to-indigo-700 rounded-xl shadow-lg duration-300 hover:shadow-2xl group`}>
                    <h1 className="text-md sm:text-xl xl:text-md font-bold text-black  group-hover:font-bold  group-hover:text-white ">{product?.name}
                        </h1>
                    <div className="flex flex-col mt-1 justify-center items-center group-hover:font-bold group-hover:text-white text-black">
                        <h1 className="text-left text-xs h6">Exportación: {product?.result?.exportation  ? Humanize.formatNumber(product?.result?.exportation,2):0} kg</h1>
                        <h1 className="text-left text-xs h6">Venta local: {product?.result?.exportation  ? Humanize.formatNumber(product?.result?.local,2):0} kg</h1>
                        <h1 className="text-left text-xs h6">Muestras: {product?.result?.exportation  ? Humanize.formatNumber(product?.result?.sample,2):0} kg </h1>
                        <h1 className="text-left text-xs h6">Merma: {product?.result?.exportation  ? Humanize.formatNumber(product?.result?.merma,2):0} kg</h1>
                    </div>

                </div>
            </div>)}


        </div>

    );
};

export default SummaryStock;
