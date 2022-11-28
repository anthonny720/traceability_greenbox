import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {add_data_program} from "../../redux/actions/logistic";
import {setAlert} from "../../redux/actions/alert";


const Form = ({close, data, reception, slug, id}) => {

    const dispatch = useDispatch()
    const columns = [
        {name: 'date', title: 'Fecha de recepción', type: 'date', maxLength: 50},
    ]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.program = id
            data ? dispatch(setAlert('Actualizar', 'success')) : dispatch(add_data_program(form, slug))
            close()
        }
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">

                <div>
                    <p className={`${formik.errors.lot ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Lotes
                        liberados:</p>
                    <select
                        onChange={(value) => formik.setFieldValue("lot", value.target.value)}
                        value={formik.values.lot}
                        className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                        <option value={''}>Seleccione un lote de liberación</option>
                        ))}
                        {reception !== null && map(reception, lot => (
                            <option key={lot.id} value={lot.id}>{lot.summary}</option>))}
                    </select>
                </div>

                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>))}


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
        date: data?.date || "",
        lot: data?.lot || '',
    }
}
const newSchema = () => {
    return {
        date: Yup.string().min(1).required(),
        lot: Yup.number().integer().min(1).required(),
    }
}
export default Form;