import React from 'react';
import './makeReservation.scss';
import StoreBanner from "../../__smallComponent/storeBanner";
import {Link} from 'react-router-dom';
import Datetimeselect from '../../__smallComponent/newDateTime';

let form1st;
let form2nd;

class MakeReservation extends React.Component{
    constructor(props){
        super(props);
        this.init = this.init.bind(this);

    }

    init(){


        form1st = <div className="form-holder-1 col-xs-12">
                    <div className="form-group">
                        <label>Please input your first name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Your answer" />
                    </div>
                    <div className="form-group">
                        <label>Please input your last name</label>
                        <input type="text" className="form-control" id="LastName" placeholder="Your answer" />
                    </div>
                    <div className="form-group">
                        <label>Please input your email</label>
                        <input type="email" className="form-control" id="email" placeholder="Your answer" />
                    </div>
                    <div className="form-group phone-number-holder">
                        <label>Please input your phone number</label>
                        <div className="phone-group">
                            <input type="number" className="form-control" id="phoneNumber" placeholder="Your answer" />
                            <span className="phoneArea">+65</span>
                        </div>
                    </div>
                </div>;

        form2nd = <div className="form-holder-2 col-xs-12">
                    <div className="form-group">
                        <label>Please input number of pax</label>
                        <input type="number" className="form-control" id="paxNumber" placeholder="Your answer" />
                    </div>
                    <div className="form-group">
                        <label>Please input special remarks</label>
                        <input type="text" className="form-control" id="specialRemarks" placeholder="Your answer" />
                    </div>
                    <div className="form-group">
                        <label>Please choose occasion</label>
                        <select>
                            <option>option 1</option>
                            <option>option 2</option>
                        </select>
                    </div>
                </div>;

    }

    render(){
        this.init();
        return(
            <div className="make-reservation-holder">
                <StoreBanner/>
                <div className="container-fluid nopaddings breadcrumb-holder">
                    <div className="container nopaddings">

                            <div className="breadcrumb">
                                <Link to="/action">
                                <span>
                                    Back
                                </span>
                                </Link>
                            </div>

                    </div>
                </div>
                <h1 className="title-page text-center">Make Your Reservation</h1>
                <Datetimeselect/>
                {form1st}
                {form2nd}

                <div className="clearfix" />
            </div>
        )
    }
}

export default MakeReservation;