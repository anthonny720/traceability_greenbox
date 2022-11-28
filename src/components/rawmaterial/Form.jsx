import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {Switch} from '@headlessui/react'
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {add_info, update_info} from "../../redux/actions/raw_material";


const FormData = ({data, close, lot, entry, pallets, locations}) => {
    const columns = [
        {name: 'number', title: 'N°', type: 'text', maxLength: 3},
        {name: 'weight', title: 'Peso Inicial', type: 'text', maxLength: 7},
        {name: 'final_weight', title: 'Peso final', type: 'text', maxLength: 7},
        {name: 'tare', title: 'Tara', type: 'text', maxLength: 6},
        {name: 'gb', title: 'Greenbox', type: 'text', maxLength: 2},
        {name: 'pa', title: 'PAE', type: 'text', maxLength: 2},
        {name: 'co', title: 'Colores', type: 'text', maxLength: 2},
        {name: 't0', title: 'Tibana', type: 'text', maxLength: 2},
        {name: 't1', title: 'Tibana I', type: 'text', maxLength: 2},
        {name: 't2', title: 'Tibana II', type: 'text', maxLength: 2},
        {name: 'gn', title: 'Gandules', type: 'text', maxLength: 2},
        {name: 'ma', title: 'Madera', type: 'text', maxLength: 2},
        {name: 'c6', title: 'C6', type: 'text', maxLength: 2},
        {name: 'c8', title: 'C8', type: 'text', maxLength: 2},
        {name: 'c10', title: 'C10', type: 'text', maxLength: 2},
        {name: 'c12', title: 'C12', type: 'text', maxLength: 2},
        {name: 'c14', title: 'C14', type: 'text', maxLength: 2},
    ]
    const columns_edit = [
        {name: 'final_weight', title: 'Peso final', type: 'text', maxLength: 7},
    ]
    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data, lot),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_info(form, entry, data.id), close()) : dispatch(add_info(form, entry), close())
        }
    })

    console.log(data)


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

        <div className={`grid ${data && 'grid-cols-1'} grid-cols-3 gap-3`}>
            {data ?
                map(columns_edit, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>)) :
                map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>))

            }
        </div>


        <div className={` mb-4  flex flex-wrap gap-4 items-center`}>
            <div className={`${data && 'hidden'} w-full`}>
                <p className={`mb-2 ${formik.errors.pallet ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Pallet:</p>
                <select value={formik.values.pallet}
                        onChange={(value) => formik.setFieldValue('pallet', value.target.value)}
                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                    <option value={null}>Seleccione una pallet</option>
                    {pallets !== null && map(pallets, pallet => (
                        <option key={pallet.id} value={pallet.id}>{pallet.name}</option>))}
                </select>
            </div>
            <div >
                <p className={`${data?'mt-4':'mt-0'} mb-2 ${formik.errors.location ? "text-red-500" : "text-base font-medium leading-none text-gray-800"}`}>Ubicación:</p>
                <select value={formik.values.location}
                        onChange={(value) => formik.setFieldValue('location', value.target.value)}
                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                    <option value={''}>Seleccione una ubicación</option>
                    {locations !== null && map(locations, loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>))}
                </select>
            </div>
            <div className={"flex flex-col "}>
                <p className={`mb-2 ${formik.errors.indicted ? "text-red-500" : "text-base  font-medium leading-none text-gray-800"}`}>Procesado:</p>
                <Switch
                    checked={formik.values.indicted}
                    onChange={value => formik.setFieldValue('indicted', value)}
                    className={`${formik.values.indicted ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full `}
                >
                    <span className="sr-only">Procesado</span>
                    <span
                        className={`${formik.values.indicted ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
                    />
                </Switch>
            </div>


        </div>
        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>)

};


const initialValues = (data, lot) => {
    return {
        number: data?.number || 0,
        final_weight: data?.final_weight || 0,
        weight: data?.weight || 0,
        gb: data?.gb || 0,
        pa: data?.pa || 0,
        co: data?.co || 0,
        t0: data?.t0 || 0,
        t1: data?.t1 || 0,
        t2: data?.t2 || 0,
        gn: data?.gn || 0,
        ma: data?.ma || 0,
        c6: data?.c6 || 0,
        c8: data?.c8 || 0,
        c10: data?.c10 || 0,
        c12: data?.c12 || 0,
        c14: data?.c14 || 0,
        tare: data?.tare || 0,
        indicted: data?.indicted || false,
        pallet: data?.pallet || "",
        lot: lot,
        location: data?.location || "",
    }
}
const newSchema = () => {
    return {
        number: Yup.number().min(1).positive().required(true),
        weight: Yup.number().min(0).max(1500).required(true),
        final_weight: Yup.number().min(0, 'Ingrese un peso final válido').max(1500, 'El peso final no debe superar los 1500kg').required(true),
        tare: Yup.number().min(0).required(true),
        gb: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        pa: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        co: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        t0: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        t1: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        t2: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        gn: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        ma: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c6: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c8: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c10: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c12: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c14: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        indicted: Yup.boolean().required(true),
        pallet: Yup.number().required(true),
        location: Yup.number().required(true),
    }
}


export default FormData;
