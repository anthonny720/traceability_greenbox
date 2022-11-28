import React from 'react';
import {map} from 'lodash';
import {useFormik} from "formik";
import {useSelector} from "react-redux";

const Filter = ({action, dispatch, setParams}) => {
    const products = useSelector(state => state.Products.categories);

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            setParams(form)
            dispatch(action(form))
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
                <select value={formik.values.category}
                        onChange={(value) => formik.setFieldValue('category', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Todas las categorías</option>
                    {products && products !== null && map(products, (p, index) => <option key={index}
                                                                                          value={p.name}>{p.name}</option>)}
                </select>

                <select value={formik.values.year}
                        onChange={(value) => formik.setFieldValue('year', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Todos los años</option>
                    {Array.from(Array(20).keys()).map(year => (
                        <option key={2022 + year} value={2022 + year}>{2022 + year}</option>))}
                </select>


                <select value={formik.values.month}
                        onChange={(value) => formik.setFieldValue('month', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Todos los meses</option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>

            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        year: "", month: "", category: "",
    }
}

export default Filter;
