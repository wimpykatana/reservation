import React from 'react';
import './storeBanner.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

let activeStore = {};
let activeStoreName;
@connect((store) => {
    return {
        store: store.store.store,
        selectStore: store.store.selectStore,
    };
})
class StoreBanner extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        let allStore = this.props.store;
        let userSelectStore = this.props.selectStore.id;

        activeStore = allStore.filter((store) => (store.id === userSelectStore))[0];
        activeStoreName = activeStore.name.toLowerCase().replace(" ", "-");

    }

    render(){
        return(
            <div className={`store-banner-image ${activeStoreName}`}>
                <div className="container">
                    <div className="row">
                        <div className="store-details">
                            <h3 className="store-name">{activeStore.name}</h3>
                            <p className="store-address">{activeStore.address.string}</p>
                            <p className="store-phone">{activeStore.phone}</p>
                            <p className="store-email">{activeStore.email}</p>
                            <p className="store-city-postal-code">{activeStore.address.city} {activeStore.address.postalCode}</p>
                        </div>
                        <Link className="animated fadeInDown change-store-btn" to="/">Change Store</Link>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StoreBanner;