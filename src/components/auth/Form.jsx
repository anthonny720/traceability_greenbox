import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {add_user, update_user} from "../../redux/actions/auth";
import {map} from "lodash";


const Form = ({close, data}) => {
    const dispatch = useDispatch();
    const columns = [
        {name: 'email', title: 'Email', type: 'email', maxLength: 50,},
        {name: 'first_name', title: 'Nombre', type: 'text', maxLength: 50,},
        {name: 'last_name', title: 'Apellidos', type: 'text', maxLength: 50,},
        {name: 'password', title: 'Contraseña', type: 'password', maxLength: 20,}
    ]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema(data)),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_user(form, data.id), close()) : dispatch(add_user(form), close())
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
        {map(columns, (column, index) => (<div key={index}>
            <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
            <input type={column.type} maxLength={column.maxLength}
                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                   value={`${formik.values[column.name]}`}
                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
        </div>))}
        <div>
            <p className="text-base mt-4 font-medium leading-none text-gray-800">Rol:</p>
            <select onChange={(value) => formik.setFieldValue('role', value.target.value)}
                    value={formik.values.role} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value={"1"}>{"Operaciones"}</option>
                <option value={"2"}>{"Logística"}</option>
                <option value={"3"}>{"Acopio"}</option>
                <option value={"4"}>{"Administración"}</option>
                <option value={"5"}>{"Calidad"}</option>
                <option value={"6"}>{"Materia Prima"}</option>
                <option value={"7"}>{"Producción"}</option>
                <option value={"7"}>{"Visualizador"}</option>
            </select>
        </div>


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
        email: data?.email || "",
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        password: "",
        role: data?.role || "",
    }
}
const newSchema = (data) => {
    return {
        email: Yup.string().email().required(true),
        first_name: Yup.string().required(true),
        last_name: Yup.string().required(true),
        password: data ? Yup.string().min(8) : Yup.string().min(8).required(true),
        role: Yup.string().required(true),
    }
}


export default Form;
