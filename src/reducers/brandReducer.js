export default function reducer(state={
    brand: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_DATA_BRAND":{
            return {...state, fetching: true}
        }
        case "FETCH_DATA_BRAND_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                brand: action.payload
            }
        }
        case "FETCH_DATA_REJECTED":{
            return{...state, fetching: false, brand: action.payload }
        }
    }

    return state
}