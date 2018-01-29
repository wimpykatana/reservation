import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import Logo from "../../__smallComponent/logo";
import Title from '../../__smallComponent/title/title';
import Selectstore from "../../__smallComponent/selectStore";
import DateTime from "../../__smallComponent/dateTime";
import { withRouter, Redirect } from 'react-router-dom';
import "./reservation.scss";
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from "react-redux";
import { fetchDataBrand } from "../../../actions/brandActions";
import { fetchDataStore } from "../../../actions/storeActions";
import { getReservationDateTime, makeReservation, getReservation, makeReservationGET } from "../../../actions/userActions";

let brandApp;
let brandAppProperties;
let brandLogo;
let brandBackgroundColor;
let primaryColor;
let store;
let occasionLists;
let occasionListsSelectValue;
let dateTimeHolder;
let paxHolder;
let minPax;
let maxPax;
let btnStatus = "disabled";


@connect((store) => {
    return {
        brand: store.brand.brand,
        store: store.store.store,
        selectStore: store.store.selectStore,
        userSelectDateTime: store.user.userSelect,
        userReservation: store.user.reservation
    };
})
class Reservation extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            fnameValue: null,
            lnameValue: null,
            emailValue: null,
            paxValue: null,
            phonenumberValue: null,
            specialreqValue: null,
            occasionValue: null,
            validateFName: null,
            validateLName: null,
            validateEmail: null,
            validatePhone: null,
            validatePax: null,
            notification: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePax = this.handlePax.bind(this);
        this.handlePhonenumber = this.handlePhonenumber.bind(this);
        this.specialReq = this.specialReq.bind(this);
        this.handleOccasion = this.handleOccasion.bind(this);
    }

    componentWillMount() {

        this.props.dispatch(fetchDataBrand());
        this.props.dispatch(fetchDataStore());
        this.props.dispatch(getReservationDateTime());
        this.props.dispatch(getReservation());
        // this.props.dispatch(makeReservation());

    }

    handleFirstNameChange(event){
        if(!(/^[a-zA-Z]+$/g).test(event.target.value)){
            this.setState({
                validateFName: <p className="has-error">Please input alphabet only without number and punctuation mark</p>
            });
            //input contain not letter character
        }else{
            this.setState({
                fnameValue: event.target.value,
                validateFName: null
            });
            //input contain only letter character
        }
    }

    handleLastNameChange(event){
        if(!(/^[a-zA-Z]+$/g).test(event.target.value)){
            this.setState({
                validateLName: <p className="has-error">Please input alphabet only without number and punctuation mark</p>
            });
            //input contain not letter character
        }else{
            this.setState({
                lnameValue: event.target.value,
                validateLName: null
            });
            //input contain only letter character
        }
    }

    handleEmailChange(event){
        if((/\S+@\S+\.\S+/).test(event.target.value)){
            //email valid
            this.setState({
                emailValue: event.target.value,
                validateEmail: null
            });
        } else {
            this.setState({
                validateEmail: <p className="has-error">Please input valid email address</p>
            });
        }

    }

    handlePax(event){
        let pax = event.target.value;
        if(pax <= maxPax && pax >= minPax){
            this.setState({ paxValue: pax, validatePax: null });
        }else{
            this.setState({
                validatePax: <p className="has-error">Please choose between {minPax} and {maxPax} </p>
            });
        }
    }



    handlePhonenumber(event){
        if((/^[0-9]+$/g).test(event.target.value)){
            this.setState({
                phonenumberValue: event.target.value,
                validatePhone: null
            });
        }else{
            this.setState({
                validatePhone: <p className="has-error">Please input numeric value only</p>
            });
        }
    }

    handleOccasion(event){
        this.setState({
            occasionValue: event.target.value
            // submitBtn: ''
        });
    }

    specialReq(event){
        this.setState({
            specialreqValue: event.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let datetime = moment(''+this.props.userSelectDateTime.date+' '+this.props.userSelectDateTime.time, "DD-MM-YYYY HH:mm" ).format("x");

        let obj = JSON.stringify({
            store: this.props.selectStore.id,
            fromTime: datetime,
            pax: this.state.paxValue,
            customer: {
                firstName: this.state.fnameValue,
                lastName: this.state.lnameValue,
                phone: "+65" + this.state.phonenumberValue,
                email: this.state.emailValue
            },
            specialRequest: this.state.specialreqValue,
            occasion: this.state.occasionValue
        });

        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF8'
            }
        };


        if(!this.props.selectStore.id){
            this.setState({
                notification: <p className="has-error">Reservation Store must be filled</p>
            });
        }else if(!moment(this.props.userSelectDateTime.date, "DD-MM-YYYY").isValid()){
            this.setState({
                notification: <p className="has-error">Reservation Date must be filled</p>
            });
        }else if(!moment(this.props.userSelectDateTime.time, "HH:mm").isValid()){
            this.setState({
                notification: <p className="has-error">Reservation Time must be filled</p>
            });
        }else if(!this.state.paxValue){
            this.setState({
                notification: <p className="has-error">Reservation Pax must be filled</p>
            });
        }else if(!this.state.fnameValue){
            this.setState({
                notification: <p className="has-error">Reservation First Name must be filled</p>
            });
        }else if(!this.state.lnameValue){
            this.setState({
                notification: <p className="has-error">Reservation Last Name must be filled</p>
            });
        }else if(!this.state.emailValue){
            this.setState({
                notification: <p className="has-error">Reservation Email must be filled</p>
            });
        }else if(!this.state.phonenumberValue){
            this.setState({
                notification: <p className="has-error">Reservation Phone Number must be filled</p>
            });
        }else if(!this.state.occasionValue){
            this.setState({
                notification: <p className="has-error">Reservation Occasion must be filled</p>
            });
        }
        else{
            // console.log("looks ok");
            // this.props.dispatch(makeReservation(obj,config));
            this.props.dispatch(makeReservationGET(obj));
        }



    }

    init() {
        brandApp = this.props.brand.app;
        store = this.props.store;
        brandAppProperties = _.pick(brandApp, "properties");
        brandLogo = _.pick(this.props.brand, "defaultImageId");
        brandBackgroundColor = _.pick(brandAppProperties, "backgroundColor");
        primaryColor = _.pick(brandAppProperties, "primaryColor");



        let choosenStoreID = this.props.selectStore.id;
        let choosenStoreValue = store.find(store => (store.id == choosenStoreID));

        if(choosenStoreValue){
            occasionLists = choosenStoreValue.reservationSetting.occasions;
            minPax = choosenStoreValue.reservationSetting.minPax;
            maxPax = choosenStoreValue.reservationSetting.maxPax;
            btnStatus = null;
        }

        if(occasionLists){
            occasionListsSelectValue = <select onChange={this.handleOccasion}>
                <option value="null">Choose Occasion</option>
                {
                    occasionLists.map(occasion => (
                        <option key={occasion} value={occasion}>{occasion}</option>
                    ))
                }
            </select>;
        }else{
            occasionListsSelectValue = <select>
                <option value="null">Choose Occasion</option>
            </select>;
        }

        if(choosenStoreID){
            dateTimeHolder = <DateTime selectStoreID={this.props.selectStore.id} />;

            paxHolder = <div className="number-of-pax">
            <input type="number" placeholder="Number of Pax" onChange={this.handlePax}/>
                {this.state.validatePax}
            </div>;
        }else{
            dateTimeHolder = null;
            paxHolder = null;
        }

    }
    render(){
        this.init();
        let successInput = _.map(this.props.userReservation, 'success').shift();
        if(successInput){
            return (
                <Redirect to={{
                    pathname: '/confirmation'
                }}/>
            )
        }
        return(
            <div className="content-holder" style={{backgroundColor: brandBackgroundColor}}>
                <div className="content content-reservation">
                    <h3 className="brand-name">{this.props.brand.name}</h3>

                    <Logo filename={brandLogo["defaultImageId"]}/>

                    <div className="animated fadeInRight reservation-holder">


                        <div className="reservation-form-holder">
                            <Title name="Reservation Detail" color={primaryColor}/>
                            <form onSubmit={this.handleSubmit}>
                                <Selectstore value={this.props.store}/>
                                {dateTimeHolder}
                                {paxHolder}

                                <input type="text" placeholder="First Name" onChange={this.handleFirstNameChange} />
                                {this.state.validateFName}
                                <input type="text" placeholder="Last Name" onChange={this.handleLastNameChange} />
                                {this.state.validateLName}
                                <input type="email" placeholder="Email" onBlur={this.handleEmailChange}/>
                                {this.state.validateEmail}

                                <div className="phone-number container">
                                    <div className="row">
                                        <div className="col-2 d-flex align-items-center nolrpadding phone-area-code-holder"><p className="phone-area-code text-center">+65</p></div>
                                        <div className="col-10 nolrpadding">
                                            <input type="number" placeholder="Mobile Number" onChange={this.handlePhonenumber} />
                                        </div>
                                    </div>
                                </div>

                                <div className="special-remarks">
                                    <input type="text" placeholder="Special Remarks e.g. Al Fresco" onChange={this.specialReq} />
                                </div>
                                {occasionListsSelectValue}
                                <div className="notification-holder">
                                    {this.state.notification}
                                </div>
                                <input type="submit" value="submit" className="btn btn-eunoia center-block" disabled={btnStatus}/>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reservation