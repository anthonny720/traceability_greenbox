import React from 'react';
import {NavLink} from "react-router-dom";

const Error404 = () => {
    return (
        <>
            <div className="flex h-screen w-full items-center bg-gray-50">
                <div className="container flex flex-col items-center justify-between px-5 text-gray-700 md:flex-row">
                    <div className="mx-8 w-full lg:w-1/2">
                        <div
                            className="font-dark mb-8 text-7xl font-extrabold text-green-500 hover:text-orange-600">404
                        </div>
                        <p className="mb-8 text-2xl font-light leading-normal md:text-3xl">
                            Lo sentimos, no pudimos encontrar la página que estás buscando.
                        </p>

                        <NavLink
                            to="/"
                            className="duration-400 inline rounded-lg border border-transparent bg-green-600 px-5 py-3 text-sm font-medium leading-5 text-white shadow-2xl transition-all hover:bg-orange-600 focus:outline-none active:bg-red-600"
                        >Regresar al inicio</NavLink
                        >
                    </div>
                    <div className="mx-5 my-12 w-full lg:flex lg:w-1/2 lg:justify-end">
                        <img
                            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
                            className=""
                            alt="Page not found"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Error404;