import { combineReducers } from "redux";
import auth from './auth';
import offers from './offers';
import users from "./users";
import account from "./account";

export default combineReducers({
    auth,
    offers,
    users,
    account
});