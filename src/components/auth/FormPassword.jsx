import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {change_password} from "../../redux/actions/auth";
import {map} from "lodash";

const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(change_password(form));
        }
    })

    const columns = [{
        name: 'current_password',
        title: 'Contraseña actual',
        type: 'password',
        maxLength: 50,
    }, {name: 'new_password', title: 'Nueva contraseña', type: 'password', maxLength: 50,}, {
        name: 're_new_password',
        title: 'Repetir nueva contraseña',
        type: 'password',
        maxLength: 50,
    },

    ]

    return (<form className="bg-white px-8 pt-6 pb-8 mb-4">
        {map(columns, (column, index) => (<div key={index}>
            <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
            <input type={column.type} maxLength={column.maxLength}
                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                   value={`${formik.values[column.name]}`}
                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
        </div>))}
         <p>{formik.errors.re_new_password}</p>
        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>
    </form>);
}
const initialValues = () => {
    return {
        current_password: "", new_password: "", re_new_password: "",
    }
}

const newSchema = (data) => {
    return {
        new_password: Yup.string().required('Password is required').min(5, 'Your password is too short.'),
        re_new_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Las contraseñas no coinciden'),
    }
}

export default ChangePasswordForm;
