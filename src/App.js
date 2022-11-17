import React from 'react';
import store, {Persistor} from "./store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import Error404 from "./containers/errors/Error404";
import {PersistGate} from "redux-persist/integration/react";
import Home from "./containers/Home";
import Error404 from "./containers/errors/Error404";


const App = () => {

    return (<Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>

            <Router>
                <Routes>
                    {/*Error Display*/}
                    <Route path="*" element={<Error404/>}/>

                    <Route exact path="/" element={<Home/>}/>

                </Routes>
            </Router>
        </PersistGate>

    </Provider>);
}

export default App;
