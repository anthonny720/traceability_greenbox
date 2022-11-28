import React, {useState} from 'react';
import {useFormik} from "formik";
import {filter, size} from "lodash";
import {TailSpin} from "react-loader-spinner";

const Filter = ({data, ft,lot}) => {
    const [loading, setLoading] = useState(false);
    /*Formik*/

    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            setLoading(true)
            ft({data: null, lot: '', category: '', date: '', quality: 0, net_weight: 0})
            setTimeout(() => {
                setLoading(false)
                const value = filter(data, ['dateIndicted', form.date])

                size(value) !== 0 && ft({
                    data: value,
                    lot: lot.lot,
                    category: lot.category_name,
                    date: form.date,
                    quality: lot.quality,
                    net_weight: lot.net_weight
                })

            }, 2000)

        }
    })
    return (<form className="w-full  shadow p-2 rounded-lg bg-white">

        <div className="flex items-center justify-between  gap-2 ">
            <p className="font-medium mt-2">
                Filtros:
            </p>

            <input type="date" value={formik.values.date}
                   onChange={text => formik.setFieldValue('date', text.target.value)}
                   className="w-max p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"/>

            <button onClick={formik.handleSubmit} type={'button'}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                {loading ? <TailSpin ariaLabel="loading-indicator" height={20}/> : 'Generar'}
            </button>

        </div>


    </form>);
};
const initialValues = () => {
    return {
        date: '',
    }
}
export default Filter;
