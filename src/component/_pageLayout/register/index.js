import React from 'react'
import Title from "../../__smallComponent/title/title"
import "./register.scss"
import Logo from "../../__smallComponent/logo/index";

import { connect } from "react-redux"
import { fetchDataBrand } from "../../../actions/brandActions";


@connect((store) => {
    return {
        brand: store.brand.brand
    };
})

class Register extends React.Component{

    componentWillMount() {

        this.props.dispatch(fetchDataBrand())
    }

    render(){

        const brandApp = this.props.brand.app
        const brandAppProperties = _.pick(brandApp, "properties")
        const brandBackgroundColor = _.map(brandAppProperties,"backgroundColor")

        return (
            <div className="content-holder" style={{backgroundColor: brandBackgroundColor}}>

                <div className="content">
                    <Logo/>

                    <div className="animated fadeInRight register-holder">
                        <Title name="Please register your account"/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Register
