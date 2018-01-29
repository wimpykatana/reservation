export default function reducer(state={
    store: [],
    selectStore:{
        id: null
    },
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_DATA_STORE":{
            return {...state, fetching: true}
        }
        case "FETCH_DATA_STORE_FULFILLED":{
            return {
                ...state,
                fetching: false,
                fetched: true,
                store: action.payload
            }
        }
        case "FETCH_DATA_REJECTED":{
            return{...state, fetching: false, store: action.payload }
        }
        case "SET_STORE": {
            return {
                ...state,
                selectStore: {...state.selectStore, id: action.payload}
            }
        }
    }

    return state
}