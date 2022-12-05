import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {add_lots} from "../../redux/actions/commercial";


const Form = ({
                  data,
                  close,
                  products,
                  family,
                  group,
                  type_inf,
                  cut,
                  variety,
                  client,
                  presentation,
                  packaging,
                  packing,
                  provider,
                  condition
              }) => {
    const dispatch = useDispatch()

    const columns = [
        {name: 'name', title: 'Nombre', type_input: 'text', maxLength: 50},
        {name: 'stock', title: 'Stock', type_input: 'text', maxLength: 5},
        {name: 'production_date', title: 'Fecha de Producción', type_input: 'date', maxLength: 12},
        {name: 'expiring_date', title: 'Fecha de vencimiento', type_input: 'date', maxLength: 12},
        {name: 'boxes', title: 'Cajas', type_input: 'text', maxLength: 4},
        {name: 'fcl', title: 'FCL', type_input: 'text', maxLength: 25},
        {name: 'observation', title: 'Observación', type_input: 'text', maxLength: 100},
    ]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? console.log("Edit") : dispatch(add_lots(form))
            close()
        }
    })
    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                {/*Products*/}
                <div>
                    <p className={`${formik.errors.product ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Producto:</p>
                    <select value={formik.values.product}
                            onChange={(value) => formik.setFieldValue('product', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un producto</option>
                        {products !== null && map(products, product => (
                            <option key={product.id} value={product.id}>{product.name}</option>))}
                    </select>
                </div>
                {/*Family*/}
                <div>
                    <p className={`${formik.errors.family ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Familia:</p>
                    <select value={formik.values.family}
                            onChange={(value) => formik.setFieldValue('family', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione una familia</option>
                        {family !== null && map(family, f => (
                            <option key={f.id} value={f.id}>{f.name}</option>))}
                    </select>
                </div>
                {/*Group*/}
                <div>
                    <p className={`${formik.errors.group ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Grupo:</p>
                    <select value={formik.values.group}
                            onChange={(value) => formik.setFieldValue('group', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un grupo</option>
                        {group !== null && map(group, g => (
                            <option key={g.id} value={g.id}>{g.name}</option>))}
                    </select>
                </div>
                {/*Type*/}
                <div>
                    <p className={`${formik.errors.type_inf ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Tipo:</p>
                    <select value={formik.values.type_inf}
                            onChange={(value) => formik.setFieldValue('type_inf', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un tipo</option>
                        {type_inf !== null && map(type_inf, t => (
                            <option key={t.id} value={t.id}>{t.name}</option>))}
                    </select>
                </div>
                {/*Cut*/}
                <div>
                    <p className={`${formik.errors.cut ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Corte:</p>
                    <select value={formik.values.cut}
                            onChange={(value) => formik.setFieldValue('cut', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un corte</option>
                        {cut !== null && map(cut, c => (
                            <option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                </div>
                {/*Variety*/}
                <div>
                    <p className={`${formik.errors.variety ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Variedad:</p>
                    <select value={formik.values.variety}
                            onChange={(value) => formik.setFieldValue('variety', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione una variedad</option>
                        {variety !== null && map(variety, v => (
                            <option key={v.id} value={v.id}>{v.name}</option>))}
                    </select>
                </div>
                {/*Client*/}
                <div>
                    <p className={`${formik.errors.client ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Cliente:</p>
                    <select value={formik.values.client}
                            onChange={(value) => formik.setFieldValue('client', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un cliente</option>
                        {client !== null && map(client, c => (
                            <option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                </div>
                {/*Presentation*/}
                <div>
                    <p className={`${formik.errors.presentation ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Presentación:</p>
                    <select value={formik.values.presentation}
                            onChange={(value) => formik.setFieldValue('presentation', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione una presentación</option>
                        {presentation !== null && map(presentation, p => (
                            <option key={p.id} value={p.id}>{p.name}</option>))}
                    </select>
                </div>
                {/*Packaging*/}
                <div>
                    <p className={`${formik.errors.packaging ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Embalaje:</p>
                    <select value={formik.values.packaging}
                            onChange={(value) => formik.setFieldValue('packaging', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un embalaje</option>
                        {packaging !== null && map(packaging, p => (
                            <option key={p.id} value={p.id}>{p.name}</option>))}
                    </select>
                </div>
                {/*Packing*/}
                <div>
                    <p className={`${formik.errors.packing ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Empaque:</p>
                    <select value={formik.values.packing}
                            onChange={(value) => formik.setFieldValue('packing', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un empaque</option>
                        {packing !== null && map(packing, p => (
                            <option key={p.id} value={p.id}>{p.name}</option>))}
                    </select>
                </div>
                {/*Provider*/}
                <div>
                    <p className={`${formik.errors.provider ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Proveedor:</p>
                    <select value={formik.values.provider}
                            onChange={(value) => formik.setFieldValue('provider', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un proveedor</option>
                        {provider !== null && map(provider, p => (
                            <option key={p.id} value={p.id}>{p.name}</option>))}
                    </select>
                </div>
                {/*Condition*/}
                <div>
                    <p className={`${formik.errors.condition ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Condición:</p>
                    <select value={formik.values.condition}
                            onChange={(value) => formik.setFieldValue('condition', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione una condición</option>
                        {condition !== null && map(condition, c => (
                            <option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                </div>


                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                    <input type={column.type_input} maxLength={column.maxLength}
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
        product: data?.product || '',
        family: data?.family || '',
        group: data?.group || '',
        type_inf: data?.type_inf || '',
        cut: data?.cut || '',
        condition: data?.condition || '',
        presentation: data?.presentation || '',
        packaging: data?.packaging || '',
        packing: data?.packing || '',
        provider: data?.provider || '',
        variety: data?.variety || '',
        client: data?.client || '',
        name: data?.name || '',
        production_date: data?.production_date || '',
        expiring_date: data?.expiring_date || '',
        boxes: data?.boxes || '',
        fcl: data?.fcl || '',
        observation: data?.observation || '',
        stock: data?.stock || '',


    }
}
const newSchema = () => {
    return {
        product: Yup.number().min(1).required(),
        family: Yup.number().min(1).required(),
        group: Yup.number().min(1).required(),
        type_inf: Yup.number().min(1).required(),
        cut: Yup.number().min(1).required(),
        condition: Yup.number().min(1).required(),
        presentation: Yup.number().min(1).required(),
        packaging: Yup.number().min(1).required(),
        packing: Yup.number().min(1).required(),
        stock: Yup.number().min(0).required(),
        variety: Yup.number().min(1).required(),
        provider: Yup.number().min(1).required(),
        client: Yup.number().min(1).required(),
        name: Yup.string().min(1).required(),
        production_date: Yup.string().min(1).required(),
        expiring_date: Yup.string().min(1).required(),
        boxes: Yup.number().min(0).positive().integer().required(),
        fcl: Yup.string(),
        observation: Yup.string(),
    }
}
export default Form;