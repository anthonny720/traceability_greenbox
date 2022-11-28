import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {map} from "lodash";
import {add_contact, update_contact} from "../../redux/actions/business_partners";

const Form = ({close, data}) => {
    const dispatch = useDispatch();

    const columns = [{name: 'name', title: 'Nombre', type: 'text', maxLength: 50,}, {
        name: 'dni', title: 'DNI', type: 'text', maxLength: 8,
    }, {name: 'phone', title: 'Celular', type: 'text', maxLength: 12,}, {
        name: 'email', title: 'Email', type: 'email', maxLength: 50,
    }, {name: 'licence', title: 'Licencia', type: 'text', maxLength: 9,}, {
        name: 'reference', title: 'Referencia', type: 'text', maxLength: 50,
    },

    ]

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_contact(form, data.id)) : dispatch(add_contact(form));
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
        name: data?.name || "",
        dni: data?.dni || "",
        phone: data?.phone || "",
        email: data?.email || "",
        licence: data?.licence || "",
        reference: data?.reference || "",
    }
}
const newSchema = () => {
    return {
        name: Yup.string().min(3).required(true),
        dni: Yup.number().min(8).required(true),
        phone: Yup.number().required(true),
        email: Yup.string().email(),
        licence: Yup.string().min(9).max(9),
        reference: Yup.string().min(3),
    }
}

export default Form;
