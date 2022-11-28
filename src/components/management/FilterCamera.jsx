import React from 'react';
import {map} from 'lodash';
import {useFormik} from "formik";
import * as Yup from "yup";
import {get_data_location} from "../../redux/actions/management";

const Filter = ({dispatch, locations}) => {
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(get_data_location(form.camera));
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
                <select value={formik.values.camera}
                        onChange={(value) => formik.setFieldValue('camera', value.target.value)}
                        className={`${formik.errors.camera && 'border-2 border-red-300'} px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm`}>
                    <option value={''}>Todas las cámaras</option>
                    {locations && locations !== null && map(locations, (c, index) => <option key={index}
                                                                                             value={c.id}>{c.name}</option>)}
                </select>

            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        camera: '',
    }
}
const newSchema = () => {
    return {
        camera: Yup.number().required(),
    }
}
export default Filter;
