import React from 'react';
import StackedBar from "./Chartjs";
import {LinealChart} from "./LinealChart";

const Summary = ({summary_month, summary_kg_month, summary_provider_month, summary_provider_kg, summary_provider, summary_avg_price}) => {
    return (<div className={"flex w-full flex-col lg:flex-row flex-wrap gap-2 justify-center"}>
        <div className="lg:w-5/12 w-full h-full mt-6 bg-white p-4 rounded-xl">
            <StackedBar data={summary_month} title={"Total a pagar - Meses"} labels={[`${new Date().getFullYear()}`]}/>

        </div>
        <div className="lg:w-5/12 w-full h-full mt-6 bg-white p-4 rounded-xl">
            <StackedBar data={summary_kg_month} title={"Total kg - Meses"} labels={[`${new Date().getFullYear()}`]}/>
        </div>

        <div className="lg:w-5/12 w-full h-full mt-6 bg-white p-4 rounded-xl">
            <StackedBar data={summary_provider_month} title={"Total a pagar - Meses"}
                        labels={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']}/>
        </div>
        <div className="lg:w-5/12 w-full h-full mt-6 bg-white p-4 rounded-xl">

            <StackedBar data={summary_provider_kg} title={"Total Kg - Meses"}
                        labels={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']}/>
        </div>
        <div className="lg:w-5/12 w-full h-full mt-6 bg-white p-4 rounded-xl">
            <StackedBar data={summary_provider} title={"Total a pagar - Proveedores"} labels={['Proveedores']}/>
        </div>
        <div className="lg:w-5/12 w-full h-full mt-6 bg-white p-4 rounded-xl">
            <LinealChart datasets={summary_avg_price} title={"Precio promedio - Meses"}
                         labels={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']}/>
        </div>
    </div>);
};

export default Summary;
