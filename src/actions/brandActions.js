import axios from "axios";
import config from "../config/config.json"

export function fetchDataBrand() {
    return function (dispatch) {
        dispatch({type: "FETCH_DATA_BRAND"});

        axios.get(config.apiURL + "/stores/"+ BRAND_CODE +"?app=brand-reservations")
            .then((response) => {
                dispatch({type: "FETCH_DATA_BRAND_FULFILLED", payload: response.data.brand})
            })
            .catch((err) => {
                dispatch({type: "FETCH_DATA_REJECTED", payload: err})
            })
    };

}

/************* SOME NOTE

 fetchDataBrand()
    function to get a brand data from api and put all get data to "redux store"

 */