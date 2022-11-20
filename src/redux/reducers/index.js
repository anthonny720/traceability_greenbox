import {combineReducers} from "redux";
import Products from "./products";
import Alert from "./alert";
import Management from "./management";
import Business from "./business_partners";
import Auth from "./auth";
import RawMaterial from "./raw_material";

export default combineReducers({Products, Alert, Management, Business, Auth,RawMaterial});
