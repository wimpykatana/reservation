import React from 'react'
import Title from "../../__smallComponent/title/title"
import "./login.scss"
import Logo from "../../__smallComponent/logo/index";

import { connect } from "react-redux"
import { fetchDataBrand } from "../../../actions/brandActions";


@connect((store) => {
    return {
        brand: store.brand.brand
    };
})

class Login extends React.Component{

    componentWillMount() {

        this.props.dispatch(fetchDataBrand())
    }

    render(){

        const brandApp = this.props.brand.app
        const brandAppProperties = _.pick(brandApp, "properties")
        const brandBackgroundColor = _.map(brandAppProperties,"backgroundColor")

        return(
            <div className="content-holder" style={{backgroundColor: brandBackgroundColor}}>

                <div className="content">
                    <Logo/>
                    <div className="animated fadeInRight login-holder">

                        <Title name="Please Login"/>

                        <div className="login-form-holder">
                            <input type="text" placeholder="Email"/>
                            <input type="password" placeholder="Password"/>
                            <p><a href="#">Forget Password?</a></p>
                            <a href="#" className="btn btn-eunoia">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login