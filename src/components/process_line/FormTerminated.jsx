import React from 'react';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {add_process_terminated, update_process_terminated} from "../../redux/actions/process_line";

const FormTerminated = ({close, data, cuts, process,lot}) => {
    const dispatch = useDispatch();

    const columns = [
        {name: 'packing_date', title: 'Fecha de envasado', type: 'date', maxLength: 50,}, {
            name: 'brix_pt',
            title: 'Brix',
            type: 'text',
            maxLength: 5,
        }, {name: 'ph_pt', title: 'pH', type: 'text', maxLength: 5,}, {
            name: 'humidity',
            title: 'Humedad',
            type: 'text',
            maxLength: 5,
        }, {name: 'aroma', title: 'Aroma', type: 'text', maxLength: 1,}, {
            name: 'color',
            title: 'Color',
            type: 'text',
            maxLength: 1,
        }, {name: 'flavor', title: 'Sabor', type: 'text', maxLength: 1,}, {
            name: 'texture',
            title: 'Textura',
            type: 'text',
            maxLength: 5,
        }, {name: 'defects', title: 'Defectos', type: 'text', maxLength: 5,}, {
            name: 'width_pt',
            title: 'Espesor',
            type: 'text',
            maxLength: 5,
        }, {name: 'quantity', title: 'Cantidad', type: 'text', maxLength: 4,},]

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_process_terminated(form, data.id, lot), close()) : dispatch(add_process_terminated(form, lot), close());
        }
    })


    return (<form className="bg-white px-8 pt-6 pb-8 mb-4">
        <div className={"w-full  z-30"}>
            {/*Proceso*/}
            <p className={`${formik.errors.process ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Proceso:</p>

            <select value={formik.values.process}
                    onChange={(value) => {
                        formik.setFieldValue('process', value.target.value);
                    }}
                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value={''}>Seleccione una fecha del proceso previo</option>
                {map(process, p => (
                    <option key={p.id} value={p.id}>{p.process_date}</option>))}
            </select>

        </div>
        <div className={"w-full  z-30"}>
            {/*Tipo de corte*/}
            <p className={`${formik.errors.type_cut ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Tipo de corte:</p>

            <select value={formik.values.type_cut}
                    onChange={(value) => {
                        formik.setFieldValue('type_cut', value.target.value);
                    }}
                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value={''}>Seleccione un corte</option>
                {map(cuts, c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.category_name}</option>))}
            </select>

        </div>
        {map(columns, (column, index) => (<div key={index}>
            <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
            <input type={column.type} maxLength={column.maxLength}
                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                   value={`${formik.values[column.name]}`}
                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
        </div>))}
        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>
    </form>);
};

const initialValues = (data) => {
    return {
        packing_date: data?.packing_date || '',
        type_cut: data?.type_id || "",
        process: data?.process_id || "",
        brix_pt: data?.brix_pt || 0,
        ph_pt: data?.ph_pt || 0,
        humidity: data?.humidity || 0,
        aroma: data?.aroma || 0,
        color: data?.color || 0,
        flavor: data?.flavor || 0,
        texture: data?.texture || 0,
        defects: data?.defects || 0,
        width_pt: data?.width_pt || 0,
        quantity: data?.quantity || 0,
    }
}
const newSchema = () => {
    return {
        packing_date: Yup.string().min(3).required(true),
        type_cut: Yup.number().required(true),
        process: Yup.number().required(true),
        brix_pt: Yup.number().min(0).max(100).required(true),
        ph_pt: Yup.number().min(0).max(100).required(true),
        humidity: Yup.number().min(0).max(100).required(true),
        aroma: Yup.number().min(0).max(100).integer().required(true),
        color: Yup.number().min(0).max(100).integer().required(true),
        flavor: Yup.number().min(0).max(100).integer().required(true),
        texture: Yup.number().min(0).max(100).required(true),
        defects: Yup.number().min(0).max(100).required(true),
        width_pt: Yup.number().min(0).max(100).required(true),
        quantity: Yup.number().integer().min(0).max(9999).required(true),

    }
}
export default FormTerminated;
