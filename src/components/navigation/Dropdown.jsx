import React, {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from "@heroicons/react/solid";
import {NavLink} from "react-router-dom";


import {map} from "lodash";

const DropDown = ({title, list, icon}) => {
    return (
        <Menu as="div" className="relative text-left mt-2">
            <div>
                <Menu.Button
                    className="inline-flex lg:w-max  w-full justify-between rounded-md bg-black  px-4 py-2 gap-1 items-center text-xs font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {title}
                    <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute z-10 left-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className=" ">
                        {map(list, (d, index) => (<Menu.Item key={index}>
                            {({active}) => (<NavLink to={`${d.href}`}
                                                     style={({isActive}) => (isActive ? {
                                                         backgroundColor: '#26d07d',
                                                         fontWeight: 'bold'
                                                     } : {backgroundColor: 'red'})}>
                                <button
                                    className={`${active ? 'bg-[#26d07d]  text-white' : 'text-gray-900'} group flex w-60 lg:w-32 items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    {d.name}
                                </button>
                            </NavLink>)}
                        </Menu.Item>))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropDown;
