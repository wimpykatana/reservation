import axios from "axios";
import config from "../config/config.json"

export function fetchDataStore() {
    return function (dispatch) {
        dispatch({type: "FETCH_DATA_STORE"});

        axios.get(config.apiURL + "/stores/" + BRAND_CODE +"?app=brand-reservations")
            .then((response) => {
                dispatch({type: "FETCH_DATA_STORE_FULFILLED", payload: response.data.stores})
            })
            .catch((err) => {
                dispatch({type: "FETCH_DATA_REJECTED", payload: err})
            })
    }
}

export function setStore(storeId) {
    return{
        type: "SET_STORE",
        payload: storeId,
    }
}

/*************** SOME NOTE

 fetchDataStore()
    function to get stores data from API and put all get data to "redux store"

 setStore(val)
    function to set an active store chosen by user and put the store ID at "Redux Store"

 */