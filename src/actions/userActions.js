import axios from 'axios';
import config from "../config/config.json";


export function setReservationDate(dateVal) {
    return{
        type: "USER_SET_RESERVATION_DATE",
        payload: dateVal,
    }
}

export function setReservationTime(timeVal) {
    return{
        type: "USER_SET_RESERVATION_TIME",
        payload: timeVal,
    }
}

export function getReservationDateTime() {
    return{
        type: "FETCH_DATA_RESERVATION_DATE_TIME"
    }
}

export function makeReservation(data,type) {

    return function (dispatch) {
        dispatch({type: "USER_MAKE_RESERVATION"});

        axios.post( config.apiURL + "/reservation/" + BRAND_CODE,
            data,
            type)
            .then((response) => {
                dispatch({type: "FETCH_RESERVATION_STATUS", payload: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function makeReservationGET(data) {

    return function (dispatch) {
        dispatch({type: "USER_MAKE_RESERVATION'"});

        axios.get(config.apiURL + "/reservation/" + BRAND_CODE + "?body=" + data)
            .then((response) => {
                dispatch({type: "FETCH_RESERVATION_STATUS", payload: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });

    }
}

export function getReservation() {
    return{
        type: "FETCH_RESERVATION_STATUS"
    }

}

/*************** SOME NOTE

 setReservationDate()
    function to set reservation date by user chosen reservation date

 setReservationTime()
    function to set reservation time by user chosen reservation time

 getReservationDateTime()
    function to get date and time value was set by user

 makeReservation()
    function to make a reservation and post it to API

 getReservation()
    function to get reservation value was set by user

 */