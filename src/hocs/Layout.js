import React, {useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from 'react-toastify';
import {Footer} from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import {useSelector} from "react-redux";

export const Layout = (props) => {
    const alert = useSelector(state => state.Alert);
     useEffect(() => {

        alert?.text && alert?.type && toast(alert.text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            type: alert.type
        });
    }, [alert]);

    return (<>
        <div className={"sticky top-0 z-[117]"}>
            <Navbar/>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100  scrollbar-hide rounded-md z-2 ">
            <div className="max-w-screen min-h-screen mx-auto p-4">
                {props.children}
            </div>
        </div>
        <Footer/>
        <ToastContainer autoClose={5000}/>
    </>);
};
export default Layout;
