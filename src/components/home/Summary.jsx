import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";
import Humanize from 'humanize-plus'

const SummaryStock = ({products, day}) => {
    return (<div className={"flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0"}>
            <div className="w-full p-2 lg:w-1/6 md:w-1/3  w-1/2">
                {day && day !== null ? <div
                    className="flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                    <div className="flex flex-row justify-between items-center">
                        <div className="bg-gray-300  rounded-xl bg-opacity-30">
                            <FontAwesomeIcon icon={faClock} className="h-6 w-6 group-hover:text-gray-50"/>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl xl:text-4xl font-bold text-gray-700  group-hover:text-gray-50">{day}</h1>
                    <div className="flex flex-row justify-center group-hover:text-gray-200  ">
                        <h1 className="text-center">Dia del año</h1>
                    </div>
                </div> : <Skeleton count={5}/>}

            </div>
            {products && products.map((product, index) =>

                <div key={index} className="w-full p-2 lg:w-1/6 md:w-1/3  w-1/2">
                    <Link to={`/report/${product?.name?.toLowerCase()}/`}>
                        <div
                            className="flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                            <div className="flex flex-row justify-between items-center">
                                <div className="bg-gray-300  rounded-xl bg-opacity-30">
                                    {/*<img src={require(`../../assets/${product?.name}.png`)} alt={product?.name}*/}
                                    {/*     className="h-6 w-6 group-hover:text-gray-50"/>*/}
                                </div>
                                {product?.summary?.input > 0 &&
                                    <p className="sm:block hidden w-max bg-green-400 p-1 rounded-full text-center text-xs text-white">↑ {Humanize.formatNumber(product?.summary?.input, 1)} kg</p>}
                            </div>
                            <h1 className="text-xl sm:text-xl xl:text-xl font-bold text-gray-700  group-hover:text-gray-50">{Humanize.formatNumber(product.stock,2)}
                                kg</h1>
                            <div className="flex flex-col justify-center group-hover:text-gray-200  ">
                                <h1 className="text-center">{product?.name}</h1>
                                <div className={"flex flex-col items-center sm:items-start  gap-2"}>
                                    {product?.summary?.input > 0 &&
                                        <p className="sm:hidden  w-max bg-green-400 p-1 rounded-full text-center text-xs text-white">↑ {Humanize.formatNumber(product?.summary?.input, 1)} kg</p>}
                                    {product?.summary?.output > 0 &&
                                        <p className="w-max bg-red-400   p-1 rounded-full text-center text-xs text-white">↓ {Humanize.formatNumber(product?.summary?.output, 1)} kg</p>}

                                </div>


                            </div>
                        </div>
                    </Link>
                </div>)}
        </div>

    );
};

export default SummaryStock;
