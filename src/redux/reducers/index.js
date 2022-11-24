import {combineReducers} from "redux";
import Products from "./products";
import Alert from "./alert";
import Management from "./management";
import Business from "./business_partners";
import Auth from "./auth";
import RawMaterial from "./raw_material";
import Quality from "./quality";
import Process from "./process_line";
import Logistic from "./logistic";
import Production from "./production";
import Report from "./report";

export default combineReducers({
    Products, Alert, Management, Business, Auth, RawMaterial, Quality, Process, Logistic, Production, Report
});
