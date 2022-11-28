import React from 'react';
import {map} from 'lodash';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {get_kardex} from "../../redux/actions/management";

const Filter = ({categories, action}) => {
    const dispatch = useDispatch()

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: true,
        validationSchema: Yup.object(newSchema()),
        onSubmit: (form) => {
            dispatch(get_kardex(form))
            action(form.category)

        }
    })
    return (<form className="w-full  shadow p-5 rounded-lg bg-white">

        <div className="flex items-center justify-between mt-4">
            <p className="font-medium">
                Filtros
            </p>

            <button onClick={formik.handleSubmit} type={'button'}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                Buscar
            </button>
        </div>

        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                <p className={`${formik.errors.category ? "text-red-500 text-base mt-4 font-medium leading-none" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Categoria:</p>
                <select value={formik.values.category}
                        onChange={(value) => formik.setFieldValue('category', value.target.value)}
                        className="px-4 py-3 w-full rounded-md scrollbar-hide bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Seleccione</option>
                    {map(categories, (c, index) => <option key={index} value={c.id}>{c.name}</option>)}
                </select>
            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        category: '',
    }
}
const newSchema = () => {
    return {
        category: Yup.number().required(),
    }
}
export default Filter;
