import React from "react";

import { connect } from "react-redux";
import { setStore } from "../../../actions/storeActions";
import "./selectStore.scss";

let stores = null;
let storeValues;


@connect((store) => {
    return {
        brand: store.brand.brand,
        store: store.store
    };
})
class Selectstore extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){

        this.setState({ value: event.target.value });
        this.props.dispatch(setStore(event.target.value));

    }


    init(){
        storeValues = this.props.value;

        if(storeValues){
            // stores = <select onChange={event => this.setState({ value: event.target.value })}>
            stores = <select ref='input' onChange={this.handleChange}>

                    <option value="null">Please choose store</option>
                {

                    storeValues.filter((storeValue) => storeValue.reservation).sort()
                        .map( storeValue =>(
                            <option value={storeValue.id} key={storeValue.name}>{storeValue.name}</option>
                        ))
                }

            </select>
        }else{
            stores = null;
        }
    }

    render(){
        this.init();
        return(
            <div className="store">
                {stores}
            </div>
        )
    }
}

export default Selectstore;