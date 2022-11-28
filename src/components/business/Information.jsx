import React from 'react';

const Information = ({data}) => {
    return (<div className={"w-full flex md:flex-row flex-col"}>
        <div className={"w-full md:w-1/2"}>
            <h1 className={"font-bold"}>Nombre: <span className={"font-light"}>{data?.name}</span></h1>
            <h1 className={"font-bold"}>Razón social: <span className={"font-light"}>{data?.business_name}</span></h1>
            <h1 className={"font-bold"}>RUC: <span className={"font-light"}>{data?.ruc}</span></h1>
            <h1 className={"font-bold"}>Dirección: <span className={"font-light"}>{data?.address}</span></h1>
            <h1 className={"font-bold"}>Ciudad: <span className={"font-light"}>{data?.city}</span></h1>
            <h1 className={"font-bold"}>País: <span className={"font-light"}>{data?.country}</span></h1>
            <h1 className={"font-bold"}>ZIP: <span className={"font-light"}>{data?.zip_code}</span></h1>
        </div>
        <div className={"w-full md:w-1/2"}>
            <h1 className={"font-bold"}>Contacto: <span className={"font-light"}>{data?.contact}</span></h1>
            <h1 className={"font-bold"}>Posición: <span className={"font-light"}>{data?.position}</span></h1>
            <h1 className={"font-bold"}>Correo: <span className={"font-light"}>{data?.email}</span></h1>
            <h1 className={"font-bold"}>Teléfono: <span className={"font-light"}>{data?.phone}</span></h1>
            <h1 className={"font-bold"}>Forma de pago: <span className={"font-light"}>{data?.payment}</span></h1>
            <h1 className={"font-bold"}>Moneda: <span className={"font-light"}>{data?.money}</span></h1>
        </div>


    </div>);
};

export default Information;
