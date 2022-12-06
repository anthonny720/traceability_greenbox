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
import Report from "./report";
import Commercial from "./commercial";

export default combineReducers({
    Products, Alert, Management, Business, Auth, RawMaterial, Quality, Process, Logistic, Report, Commercial
});
