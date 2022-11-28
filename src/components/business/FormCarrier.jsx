import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {map} from "lodash";
import {add_carrier, update_carrier} from "../../redux/actions/business_partners";

const FormCarrier = ({close, data}) => {
    const dispatch = useDispatch();

    const columns = [{name: 'name', title: 'Nombre', type: 'text', maxLength: 50,}, {
        name: 'ruc', title: 'RUC', type: 'text', maxLength: 11,
    }, {name: 'code', title: 'Placa', type: 'text', maxLength: 10,},]

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_carrier(form, data.id)) : dispatch(add_carrier(form));
            close()
        }
    })
    return (<form className="bg-white px-8 pt-6 pb-8 mb-4">
            {map(columns, (column, index) => (<div key={index}>
                <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                <input type={column.type} maxLength={column.maxLength}
                       className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                       value={`${formik.values[column.name]}`}
                       onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                <p className={"text-red-400 text-xs text-italic"}>{formik.errors[column.name]}</p>
            </div>))}
            <div className="w-full flex justify-center">
                <button onClick={formik.handleSubmit} type="button"
                        className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>
        </form>

    );
};


const initialValues = (data) => {
    return {
        name: data?.name || "", ruc: data?.ruc || "", code: data?.code || "",

    }
}
const newSchema = () => {
    return {
        name: Yup.string().min(5, 'Ingrese un nombre válido de la empresa de transportes').required(true),
        ruc: Yup.string().min(11, 'Ingrese un RUC válido').required(true),
        code: Yup.string().required(true),
    }
}

export default FormCarrier;
