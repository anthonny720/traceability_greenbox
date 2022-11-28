import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBox,
    faBus,
    faCalendar,
    faCircleInfo,
    faGlobe,
    faLeaf,
    faPersonChalkboard,
    faUsers,
    faWeight
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-styled-carousel";
import Humanize from 'humanize-plus'

const responsive = [{breakPoint: 1280, cardsToShow: 4},
    {breakPoint: 760, cardsToShow: 2}, {breakPoint: 600, cardsToShow: 1}];

const Data = ({Children}) => {
    return (
        <h1 className={"bg-white font-bold hover:text-white text-[#26d07d]  p-3 w-11/12 bg-white hover:bg-[#26d07d] rounded-md h-max text-center"}>
            {Children}
        </h1>
    )
}

const Cards = ({data}) => {
    return (
        <div className={"w-full"}>
            <Slider responsive={responsive} rightArrow={true} pauseOnMouseOver={true}>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faWeight} className={"block h-4 sm:h-8"}/>Peso neto <p
                    className={"text-xs font-light"}>{Humanize.formatNumber(data?.net_weight,2)}</p></p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faCircleInfo} className={"block h-4 sm:h-8"}/>Condición<p
                    className={"text-xs font-light"}>{data?.condition}</p></p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faBox} className={"block h-4 sm:h-8"}/>Jabas<p
                    className={"text-xs font-light"}>{data?.quantity_boxes}</p></p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faCalendar} className={"block h-4 sm:h-8"}/>Fechas<p
                    className={"text-xs font-light"}>{data?.starting_point_date} - {data?.entryDate} - {data?.downloadDate}</p>
                </p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faGlobe} className={"block h-4 sm:h-8"}/> Parcela<p
                    className={"text-xs font-light"}>{data?.parcel}</p></p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faLeaf} className={"block h-4 sm:h-8"}/> Origen<p
                    className={"text-xs font-light"}>{data?.origin}</p></p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faUsers} className={"block h-4 sm:h-8"}/> GR Proveedor<p
                    className={"text-xs font-light"}>{data?.providerGuide}</p></p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faBus} className={"block h-4 sm:h-8"}/> GR Transportista<p
                    className={"text-xs font-light"}>{data?.carrierGuide}</p></p>}/>
                <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                    icon={faPersonChalkboard} className={"block h-4 sm:h-8"}/> Proveedor<p
                    className={"text-xs font-light"}>{data?.provider_name}</p></p>}/>
            </Slider>
        </div>
    );
};

export default Cards;
