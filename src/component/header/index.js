import React from 'react';
import "./header.scss";
import { connect } from 'react-redux';
import { fetchDataBrand } from "../../actions/brandActions";

@connect((store) => {
    return {
        brand: store.brand.brand,
    };
})
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.dispatch(fetchDataBrand());
    }

    render(){
        return(
            <div className="header-container">
                <h3>{this.props.brand.name}</h3>
            </div>
        )
    }
}

export default Header