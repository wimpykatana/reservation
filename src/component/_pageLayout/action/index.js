import React from 'react';
import './action.scss';
import { Link } from 'react-router-dom';
import StoreBanner from '../../__smallComponent/storeBanner';

class Actionpage extends React.Component{


    init(){

    }

    render(){
        this.init();
        return(
            <div className="action-page-holder container-fluid">
                <div className="row">
                    <StoreBanner/>
                    <div className="container">
                        <div className="col-md-2 col-xs-6 action-holder reservations nopaddings">
                            <div>
                                <Link to="/makereservation">
                                    <img src={require('../../../assets/bell.png')} />
                                    <p>Make Reservation</p>
                                </Link>
                            </div>
                        </div>
                        {/*<div className="col-md-2 col-xs-6 action-holder order nopaddings">*/}
                            {/*<div>*/}
                                {/*<img src={require('../../../assets/order.png')} />*/}
                                {/*<p style={{color: "#000"}}>Takeaway</p>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>

            </div>
        )
    }
}

export default Actionpage;