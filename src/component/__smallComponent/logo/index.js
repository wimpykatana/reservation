import React from 'react';
import "./logo.scss";
import config from "../../../config/config.json";

let logoImage = null;
class Logo extends React.Component{

    init(){
        if(this.props.filename){
            logoImage = <img className="align-items-center" src={ config.imageLogoURL +  this.props.filename}/>;
        }else{
            logoImage = <img className="align-items-center" src="" />;
        }
    }

    render() {
        this.init();
        return (
            <div className="Logo-holder text-center">
                {logoImage}
            </div>
        );
    }
}

export default Logo
