import React, {useEffect, useState} from 'react';

import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {get_client, get_sales_client} from "../../redux/actions/business_partners";
import Layout from "../../hocs/Layout";
import Header from "../../components/business/Header";
import Tabs from "../../components/business/Tabs";


const ClientDetail = () => {
    const {slug} = useParams()
    const dispatch = useDispatch()
    const client = useSelector(state => state.Business.client)
    const client_sales = useSelector(state => state.Business.client_sales)

    let [categories] = useState(["Información", "Procesos"])
    const columns = ['Programa de despacho', 'Guia de remisión', 'Orden de Pedido', 'Carga', 'Peso total']

    useEffect(() => {
        dispatch(get_client(slug))
        dispatch(get_sales_client(slug))

    }, [])
    return (<Layout>
        <main className="bg-gray-100 bg-opacity-25">
            <div className="lg:w-8/12 lg:mx-auto mb-8">
                <Header data={client} text={"ventas"}/>
                <div className="px-px md:px-3">
                    <Tabs categories={categories} type={"logistic"} data={client}
                          sales={client_sales ? client_sales : []}
                          columns={columns}/>
                </div>
            </div>
        </main>
    </Layout>);
};

export default ClientDetail;
