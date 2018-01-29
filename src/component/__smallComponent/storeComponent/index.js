import React from 'react';
import { connect } from 'react-redux';
import "./storeComponent.scss";
import { setStore } from "../../../actions/storeActions";
import { Redirect } from 'react-router-dom';

let storeValues;
let storeList;
@connect((store) => {
    return {
        store: store.store.store
    };
})
class StoreComponent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            chooseStore: false,
        };
        this.init = this.init.bind(this);
    }

    handleClick(e){
        this.props.dispatch(setStore(e));
        this.setState({
            chooseStore: true
        });
    }

    init(){
        storeValues =  this.props.value;

        if(storeValues){
            storeList = storeValues.filter((storeValue) => storeValue.reservation).sort()
                .map( storeValue => (
                    <div className={`col-lg-6 col-md-6 col-sm-12 animated fadeInRight store-list ${storeValue.name.toLowerCase().replace(" ", "-")}`}
                         data-store={storeValue.id}
                         key={storeValue.id}
                         onClick={() => this.handleClick(storeValue.id)}>

                        <div className="store-info-holder">
                            <h3>{storeValue.name}</h3>
                            <p>{storeValue.address.string}</p>
                        </div>
                    </div>
                ));
        }else{
            storeList = null;
        }
    }

    render(){
        this.init();
        if(this.state.chooseStore){
            return(
                <Redirect to={{
                    pathname: '/action',
                    state: { from: '/' }

                }} />
            )
        }
        return(
            <div className="row store-list-holder">
                {storeList}

            </div>
        )

    }
}

export default StoreComponent;