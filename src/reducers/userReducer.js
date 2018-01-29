export default function reducer(state={
    userSelect:{
        time:null,
        date:null
    },
    reservation: [],
    fetching: false,
    fetched:false
},action){
    switch(action.type){
        case "USER_SET_RESERVATION_DATE":{
            return{
                ...state,
                userSelect:{ ...state.userSelect, date:action.payload }
            }
        }

        case "USER_SET_RESERVATION_TIME":{
            return{
                ...state,
                userSelect:{ ...state.userSelect, time:action.payload }
            }
        }

        case "FETCH_DATA_RESERVATION_DATE_TIME":{
            return{
                ...state,
                userSelect:{ ...state.userSelect }
            }
        }

        case "USER_MAKE_RESERVATION":{
            return{
                ...state,
            }
        }

        case "FETCH_RESERVATION_STATUS":{
            return{
                ...state,
                reservation:{ ...state.resevation, reservation: action.payload }
            }
        }

    }

    return state
}