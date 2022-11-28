import React, {useEffect} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {Switch} from "@headlessui/react";
import {useDispatch, useSelector} from "react-redux";
import {filter, map} from "lodash";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Humanize from "humanize-plus";
import {add_payment, update_payment} from "../../redux/actions/management";
import {get_lot, get_lots} from "../../redux/actions/raw_material";

const FormPayment = ({data, close}) => {

    const lots = useSelector(state => state.RawMaterial.lots);
    const lot_info = useSelector(state => state.RawMaterial.lot);
    const dispatch = useDispatch()

    const columns = [{name: 'name', title: 'Nombre', type: 'text', maxLength: 50}, {
        name: 'business_name',
        title: 'Razón social',
        type: 'text',
        maxLength: 50
    }, {name: 'weight', title: 'Peso Neto', type: 'text', maxLength: 10}, {
        name: 'receipt',
        title: 'Recibo',
        type: 'text',
        maxLength: 12
    }, {name: 'amount', title: 'Monto total', type: 'text', maxLength: 10}, {
        name: 'cancelled',
        title: 'Fecha de pago',
        type: 'date',
        maxLength: 10
    }]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_payment(form, data.id), close()) : dispatch(add_payment(form), close())

        }
    })


    const handleRequestLot = (lot) => {
        dispatch(get_lot(lot))
    }

    useEffect(() => {
        dispatch(get_lots())
    }, []);

    return (<div className={"w-full flex flex-col "}>
        <small className={`font-light text-center w-full mt-4 font-medium leading-none text-gray-800 `}>
            {lot_info !== null && Humanize.formatNumber(lot_info?.net_weight, 2)} kg -
            S/.{lot_info !== null && Humanize.formatNumber(lot_info?.net_weight / 1000 * 12, 2)} -
            S/.{lot_info !== null && Humanize.formatNumber(lot_info?.net_weight / 1000 * 10, 2)} -
            S/.{lot_info !== null && Humanize.formatNumber(lot_info?.net_weight / 1000 * 8, 2)}
        </small>

        {lots && lots !== null ?
            <form className={"z-40 bg-white px-8 pt-6 pb-8 flex space-x-4 flex-wrap  lg:grid-cols-4 justify-center "}>

                <div className={"w-full  z-30"}>
                    {/*Lote*/}
                    <p className={`${formik.errors.report ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Reporte:</p>

                    <select value={formik.values.report} disabled={data && true}
                            onChange={(value) => {
                                formik.setFieldValue('report', value.target.value);
                                handleRequestLot(filter(lots, {"id": parseInt(value.target.value)})[0]?.lot)
                            }}
                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={''}>Seleccione un reporte</option>
                        {map(lots, lot => (<option key={lot.id} value={lot.id}>{lot.lot}</option>))}
                    </select>

                </div>


                <div className={"grid grid-cols-2 gap-2"}>
                    {map(columns, (column, index) => (<div key={index}>
                        <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                        <input type={column.type} maxLength={column.maxLength}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    </div>))}
                </div>

                <div className='flex'>
                    <div className={"w-full  mx-2"}>
                        <p className={`${formik.errors.status ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Estado:</p>
                        <Switch
                            checked={formik.values.status}
                            onChange={value => formik.setFieldValue('status', value)}
                            className={`${formik.values.status ? 'bg-blue-600' : 'bg-gray-200'} relative md:my-[15%] lg:my-[10%] inline-flex h-6 w-11 items-center rounded-full `}
                        >
                            <span className="sr-only">Procesado</span>
                            <span
                                className={`${formik.values.status ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
                            />
                        </Switch>
                    </div>
                </div>

                <div className="w-4/12 flex items-center md:my-[5%]">
                    <div className="w-full flex justify-center items-center">
                        <button onClick={formik.handleSubmit} type="button"
                                disabled={formik.values.report === null && true}
                                className="w-max h-max  bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                    </div>
                </div>

            </form> : <Skeleton count={10}/>}
    </div>)
};

const initialValues = (data) => {
    return {
        providers: data?.providers || "",
        name: data?.name || "",
        business_name: data?.business_name || "",
        report: data?.report_id || '',
        weight: data?.weight || "",
        receipt: data?.receipt || "",
        amount: data?.amount || "",
        status: data?.status || false,
        cancelled: data?.cancelled || new Date(),

    }
}
const newSchema = () => {
    return {
        name: Yup.string().min(3).required(true),
        business_name: Yup.string().min(3).required(true),
        report: Yup.number().required(true),
        weight: Yup.number().positive().required(true),
        receipt: Yup.string(),
        status: Yup.boolean().required(true),
        amount: Yup.number().positive().required(true),
        cancelled: Yup.string().max(10).required(true),

    }
}
export default FormPayment;
