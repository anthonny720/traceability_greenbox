import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {update_packing} from "../../redux/actions/logistic";
import {Switch} from "@headlessui/react";


const FormPacking = ({close, data, slug}) => {

    const dispatch = useDispatch()
    const columns = [
        {name: 'date', title: 'Programa de despacho', type: 'date', maxLength: 50},
        {name: 'destine', title: 'Destino', type: 'text', maxLength: 20},
        {name: 'guide', title: 'Guia de remision', type: 'text', maxLength: 10},
        {name: 'order', title: 'Orden de Pedido', type: 'text', maxLength: 12},

    ]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            let data = new FormData();
            data.append('status', form.status);
            data.append('date', form.date);
            data.append('destine', form.destine);
            data.append('guide', form.guide);
            data.append('order', form.order);
            if (form.docs !== '') {
                data.append('docs', form.docs);
            }
            dispatch(update_packing(data, slug), close())

        },
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">


                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>))}

                <div>
                    <p className={`${formik.errors.docs ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Documentos:</p>
                    <input type={"file"} accept={"application/pdf"}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           onChange={text => formik.setFieldValue('docs', text.target.files[0])}/>
                </div>

                <div className={"w-full  mx-2"}>
                    <p className={`${formik.errors.status ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Estado:</p>
                    <Switch
                        checked={formik.values.status}
                        onChange={value => formik.setFieldValue('status', value)}
                        className={`${formik.values.status ? 'bg-blue-600' : 'bg-gray-200'} relative md:my-[15%] lg:my-[10%] inline-flex h-6 w-11 items-center rounded-full `}
                    >
                                <span
                                    className={`${formik.values.status ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
                                />
                    </Switch>
                </div>


                <div className="w-full flex justify-center">
                    <button onClick={formik.handleSubmit} type="button"
                            className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </form>

        </div>
    );
};
const initialValues = (data) => {
    return {
        status: data?.status || false,
        date: data?.date || "",
        destine: data?.destine || "",
        guide: data?.guide || "",
        order: data?.order || '',
        docs: '',
    }
}
const newSchema = () => {
    return {
        status: Yup.boolean().required(true),
        date: Yup.string().min(3).required(),
        destine: Yup.string().min(2).required(),
        guide: Yup.string().min(6).required(),
        order: Yup.string().min(1),
    }
}
export default FormPacking;