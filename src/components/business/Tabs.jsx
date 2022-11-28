import React from 'react';
import {Tab} from "@headlessui/react";
import Information from "./Information";
import TableSales from "./TableSales";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Tabs = ({categories, data, sales, columns,type}) => {
    return (<Tab.Group>
            <Tab.List className="flex space-x-1  border-t-4  p-1">
                {categories.map((category) => (<Tab
                    key={category}
                    className={({selected}) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black', selected ? 'bg-white shadow' : 'text-black    hover:bg-white/[0.12] hover:text-black')}
                >
                    {category}
                </Tab>))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                <Tab.Panel className={classNames('rounded-xl bg-white p-3',)}>
                    <Information data={data}/>
                </Tab.Panel>

                <Tab.Panel className={classNames('rounded-xl bg-white p-3')}>
                    <TableSales type={type} columns={columns} data={sales}/>
                </Tab.Panel>

            </Tab.Panels>
        </Tab.Group>);
};

export default Tabs;
