import React from 'react';
import './landing.scss';
import { connect } from "react-redux";
import { fetchDataStore } from "../../../actions/storeActions";
import StoreComponent from '../../__smallComponent/storeComponent';


@connect((store) => {
    return {
        brand: store.brand.brand,
        store: store.store.store,
        selectStore: store.store.selectStore,
    };
})
class Landing extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            brand: null,
        };
        this.init = this.init.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchDataStore());

    }

    init(){

    }

    render(){
        this.init();
        return(
            <div className="welcome-holder">
                <div className="container">
                        <StoreComponent value={this.props.store} />
                </div>
            </div>
        )
    }
}

export default Landing