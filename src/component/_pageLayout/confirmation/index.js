import React from "react";
import { connect } from "react-redux";
import { fetchDataBrand } from "../../../actions/brandActions";
import { getReservationDateTime } from "../../../actions/userActions"
import Logo from "../../__smallComponent/logo";

import "./confirmation.scss";

let brandApp;
let brandAppProperties;
let brandBackgroundColor;
let primaryColor;
let brandLogo;

@connect((store) => {
    return {
        brand: store.brand.brand,
        user: store.user.userSelect
    };
})
class Confirmation extends React.Component{

    constructor (props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(fetchDataBrand());
        this.props.dispatch(getReservationDateTime());
    }

    init(){
        brandApp = this.props.brand.app;
        brandAppProperties = _.pick(brandApp, "properties");
        brandBackgroundColor = _.map(brandAppProperties,"backgroundColor");
        primaryColor = _.toString(_.map(brandAppProperties, "primaryColor"));
        brandLogo = _.pick(this.props.brand, "defaultImageId");
    }

    render() {
        this.init();
        return (
            <div className="content-holder" style={{backgroundColor: brandBackgroundColor}}>
                <div className="content">
                    <h3 className="brand-name">{this.props.brand.name}</h3>
                    <Logo filename={brandLogo["defaultImageId"]}/>

                    <div className="animated fadeInRight confirmation-holder">
                        {/*<Title name="Confirmation page" color={primaryColor}/>*/}
                        <div className="content-text">
                            <h3 className="text-center">Thank You !</h3>
                            <p>&nbsp;</p>
                            <p>
                                We have received your reservation at {this.props.user.date} by time {this.props.user.time}.
                            </p>
                            <p>
                                A confirmation email just sent to you. And we looking foward to seeing you at our outlet.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default Confirmation