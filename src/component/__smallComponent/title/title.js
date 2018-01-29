import React from "react"
import "./title.scss"

class Title extends React.Component{
    render(){
        return(
            <div className="login-title title">
                <h3>{ this.props.name }</h3>
            </div>
        )
    }
}

export default Title