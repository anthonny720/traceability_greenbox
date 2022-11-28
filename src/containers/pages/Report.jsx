import React, {useEffect, useState} from 'react';

import Skeleton from "react-loading-skeleton";
import {useDispatch, useSelector} from "react-redux";

import {useParams} from "react-router-dom";
import {getProvidersCategory, getReport, getReport_page, getSummaryCategory} from "../../redux/actions/report";
import Layout from "../../hocs/Layout";
import Filter from "../../components/report/Filter";
import Badge from "../../components/report/Badge";
import Summary from "../../components/report/Summary";
import TableSummary from "../../components/report/TableSummary";
import Modal from "../../components/util/Modal";
import Form from "../../components/report/Form";
import Table from "../../components/report/Table";
import SetPagination from "../../components/report/Pagination";


const Report = () => {

    const [params, setParams] = useState({year: '', month: '', provider: ''});
    const {category} = useParams()
    const dispatch = useDispatch();
    const report = useSelector(state => state.Report.report?.[0])
    const count = useSelector(state => state.Report.count);
    const providers = useSelector(state => state.Report.providers);
    const category_data = useSelector(state => state.Report.category_data);
    const summary_month = useSelector(state => state.Report.summary_month);
    const summary_kg_month = useSelector(state => state.Report.summary_kg_month);
    const summary_provider = useSelector(state => state.Report.summary_provider);
    const summary_provider_month = useSelector(state => state.Report.summary_provider_month);
    const summary_provider_kg = useSelector(state => state.Report.summary_provider_kg);
    const summary_avg_price = useSelector(state => state.Report.summary_avg_price);


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({type: 'GET_REPORT_FAIL'})
        dispatch(getProvidersCategory(category))
        dispatch(getSummaryCategory(category))
        dispatch(getReport(category, params))
    }, []);

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleOpenModalUpdate = (data) => {
        setTitle("Actualizar registro")
        setIsOpen(true)
        setContent(<Form data={data} category={category} close={openModal}/>)
    }

    return (<Layout>
        <Filter providers={providers} category={category} action={getReport} setParams={setParams}/>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Badge report={report}/>
        <div className={"flex justify-center items-center flex-col"}>
            <div className="w-full h-full mt-6">

                <Table edit={handleOpenModalUpdate} data={category_data ? category_data : []}/>
                <SetPagination category={category} count={count} get_data_page={getReport_page} params={params}
                               data={category_data ? category_data : []}/>

            </div>
            {summary_provider !== null && summary_avg_price !== null && summary_kg_month !== null && summary_month !== null && summary_provider_kg !== null && summary_provider_month !== null ?
                <Summary summary_provider={summary_provider} summary_avg_price={summary_avg_price}
                         summary_kg_month={summary_kg_month} summary_month={summary_month}
                         summary_provider_kg={summary_provider_kg} summary_provider_month={summary_provider_month}/> :
                <Skeleton count={15}/>}
            {summary_avg_price !== null ?
                <TableSummary summary_avg_price={summary_avg_price}/> :
                <Skeleton count={15}/>
            }
        </div>

    </Layout>);
};

export default Report;
