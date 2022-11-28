import React from 'react';
import {useFormik} from "formik";
import {get_lots} from "../../redux/actions/raw_material";

const Filter = ({dispatch, setParams}) => {
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            setParams(form)
            dispatch(get_lots(form))
        }
    })
    return (<form className="w-full  shadow p-5 rounded-lg bg-white" onChange={formik.handleSubmit}>
        <div className={"flex w-full gap-6 flex-wrap justify-center"}>
            <div className={"flex w-max flex-col"}>
                <p className={`${formik.errors.lot ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Lote:</p>
                <input
                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                    value={formik.values.lot}
                    onChange={text => formik.setFieldValue('lot', text.target.value)}/>
            </div>
            <div className={"flex w-max flex-col"}>
                <p className={`${formik.errors.variety ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Variedad:</p>
                <input
                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                    value={formik.values.variety}
                    onChange={text => formik.setFieldValue('variety', text.target.value)}/>
            </div>
            <div className={"flex w-max flex-col"}>
                <p className={`${formik.errors.condition ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Condición:</p>
                <input
                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                    value={formik.values.condition}
                    onChange={text => formik.setFieldValue('condition', text.target.value)}/>
            </div>
            <div className={"flex w-max flex-col"}>
                <p className={`${formik.errors.category ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Producto:</p>
                <input
                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                    value={formik.values.category}
                    onChange={text => formik.setFieldValue('category', text.target.value)}/>
            </div>
        </div>

    </form>);
};
const initialValues = () => {
    return {
        lot: '', category: '', variety: '',condition:''
    }
}

export default Filter;
