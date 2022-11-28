import React from 'react';

const Header = ({data,text}) => {
    return (<header className="flex flex-wrap items-center p-4 md:py-8">

        <div className="md:w-3/12 md:ml-16">
            <img className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-pink-600 p-1"
                 src={data?.image}
                 alt=""/>
        </div>

        <div className="w-8/12 md:w-7/12 ml-4">
            <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                    {data?.name}
                </h2>
            </div>

            <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                    <span className="font-semibold">{data?.sales} </span>
                    {text}
                </li>

                <li>
                    <span className="font-semibold">{data?.country}</span>

                </li>
            </ul>

            <div className="hidden md:block">
                <h1 className="font-semibold">{data?.contact}</h1>

                <span>{data?.description}</span>
            </div>

        </div>

        <div className="md:hidden text-sm my-2">
            <h1 className="font-semibold">{data?.contact}</h1>
            <span>{data?.description}</span>
        </div>

    </header>);
};

export default Header;
