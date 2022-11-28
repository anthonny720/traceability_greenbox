import React from 'react';
import {useFormik} from "formik";
import {get_payments} from "../../redux/actions/management";

const Filter = ({dispatch,setParams}) => {
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: true,
        onSubmit: (form) => {
            setParams(form)
            dispatch(get_payments(form))
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
                <input type="date" value={formik.values.cancelled}
                       onChange={text => formik.setFieldValue('cancelled', text.target.value)}
                       className="px-4 py-3 w-full rounded-md bg-gray-100  focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"/>
            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        cancelled: '',
    }
}

export default Filter;
