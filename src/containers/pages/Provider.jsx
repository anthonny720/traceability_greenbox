import React, {useEffect, useState} from 'react';

import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Layout from "../../hocs/Layout";
import Header from "../../components/business/Header";
import Tabs from "../../components/business/Tabs";
import {get_provider, get_sales_provider} from "../../redux/actions/business_partners";


const ProviderDetail = () => {
    const {slug} = useParams()
    const dispatch = useDispatch()
    const provider = useSelector(state => state.Business.provider)
    const sale = useSelector(state => state.Business.provider_sales)

    const [categories] = useState(["Información", "Compras"])
    const columns = ['Lote', 'Fecha de ingreso', 'Condición', 'Origen', 'Parcela', 'Peso neto']

    useEffect(() => {
        dispatch(get_provider(slug))
        dispatch(get_sales_provider(slug))
    }, [])
    return (<Layout>
        <main className="bg-gray-100 bg-opacity-25">
            <div className="lg:w-8/12 lg:mx-auto mb-8">
                <Header data={provider} text={"ventas"}/>
                <div className="px-px md:px-3">
                    <Tabs categories={categories} data={provider} sales={sale ? sale : []} columns={columns}/>
                </div>
            </div>
        </main>
    </Layout>);
};

export default ProviderDetail;
