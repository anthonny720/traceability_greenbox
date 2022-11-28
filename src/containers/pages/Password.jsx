import React from 'react';

import background from "../../assets/logistics.png";
import Layout from "../../hocs/Layout";
import ChangePasswordForm from "../../components/auth/FormPassword";

const ChangePassword = () => {
    return (<Layout>
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div
                        className="w-full h-auto bg-transparent hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        style={{backgroundImage: `url(${background})`}}>
                    </div>
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <div className="px-8 mb-4 text-center">
                            <h3 className="pt-4 mb-2 text-2xl">Cambia tu contraseña</h3>
                        </div>
                        <ChangePasswordForm/>
                    </div>
                </div>
            </div>
        </div>
    </Layout>);
};
export default ChangePassword;
