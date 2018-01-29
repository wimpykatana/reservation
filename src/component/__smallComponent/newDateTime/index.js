import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import './dateTime.scss';
import { connect } from "react-redux";
import { setReservationDate } from "../../../actions/userActions";


let dateVal;
let timeVal;
let storeListOpenHours;
let storeStartTime;
let storeEndTime;
let getAvailableStoreHours;
let activeStore;
let openDay;
let isOpen;
let storeStatus = null;

@connect((store) => {
    return {
        stores: store.store.store,
        selectStore : store.store.selectStore.id
    };
})
class Datetimeselect extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            showDatePopup: false,
            showTimePopup:false,
            noScroll: false,
            startDate: moment(),
        }
        this.init = this.init.bind(this);
        this.dateHandleClick = this.dateHandleClick.bind(this);
        this.timeHandleClick = this.timeHandleClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.closeTimePopup = this.closeTimePopup.bind(this);
        dateVal = moment().format("DD-MM-YYYY");
    }

    componentWillMount(){
        // this.props.dispatch(getReservationDateTime());
        storeStatus = null;
        document.getElementById("root").className = this.state.noScroll ? 'noscroll' : '';
        timeVal = moment().add(2, 'hours').format("HH:mm");

    }

    componentDidUpdate() {
        document.getElementById("root").className = this.state.noScroll ? 'noscroll' : '';
        document.getElementById("value-date-holder-content").className = this.state.showDatePopup ? 'container value-date-holder nopaddings active' : 'container value-date-holder nopaddings ';
        document.getElementById("value-time-holder-content").className = this.state.showTimePopup ? 'container value-time-holder nopaddings active' : 'container value-time-holder nopaddings ';
    }

    handleDateChange(date){
        this.setState({
            startDate: date,
        });

        let dateNow = moment().format('x');
        let userSelectDate = moment(date).format("x");
        let useSelectDay = moment(date).format("dddd");

        isOpen = openDay.find(data => data.dayOfWeek === useSelectDay.toUpperCase());
        document.getElementById("date-holder-scroll").scrollTo(0, 0);
        console.log(isOpen);

        if(isOpen){
            //get time value
            storeStartTime = isOpen.startTime;
            storeEndTime = isOpen.endTime;
            let storeOpenHour = isOpen.startTime.split(":").slice(0,1).toString();
            let storeCloseHour = isOpen.endTime.split(":").slice(0,1).toString();
            let storeAvalibleTime = [];

            for(let x=storeOpenHour; x <= storeCloseHour; x++){
                storeAvalibleTime.push(x);
            }

            getAvailableStoreHours = storeAvalibleTime.map(avail => ( <div key={avail} value={avail}>{avail}</div>));


            storeStatus = null;
            if(userSelectDate > dateNow){
                //user can make reservation
                dateVal = moment(date).format("DD-MM-YYYY");
                this.setState({
                    showDatePopup: false,
                    noScroll: false
                });
                this.props.dispatch(setReservationDate(moment(date).format("DD-MM-YYYY")));
            }else{
                storeStatus = <p className='has-error'>Please choose a date after today</p>;
                this.setState({
                    showDatePopup: true,
                    noScroll: true
                });
            }
        }else{
            storeStatus = <p className='has-error'>Store is CLOSE please choose other date</p>;
        }
    }

    dateHandleClick(){
        document.getElementById("root").scrollTo(0, 0);
        this.setState({
            showDatePopup: true,
            showTimePopup: false,
            noScroll: true
        });
    }

    timeHandleClick(){
        console.log("time click");
        document.getElementById("root").scrollTo(0, 0);
        this.setState({
            showTimePopup: true,
            showDatePopup: false,
            noScroll: true
        });
    }

    closeTimePopup(){
        console.log("close this");
        this.setState({
            showTimePopup: false,
            noScroll: false
        });
    }

    init(){
        activeStore = this.props.stores.filter((store) => (store.id === this.props.selectStore));
        openDay = activeStore[0].dineInHours;

        if(!isOpen){
            storeListOpenHours = <p className='has-error text-center' onClick={this.closeTimePopup}>
                Please choose a date first
            </p>;
        }else{
            storeListOpenHours = getAvailableStoreHours;
        }
    }
    render(){
        this.init();
        return(
            <div className="form-holder-3 col-xs-12">
                <div className="container date-time-holder">
                    <div className="col-xs-6 norpadding date-holder text-center" onClick={this.dateHandleClick}>
                        <p>DATE</p>
                        <p className="value-date">{dateVal}</p>
                    </div>
                    <div className="col-xs-6 nolpadding time-holder text-center" onClick={this.timeHandleClick}>
                        <p>TIME</p>
                        <p className="value-time">{timeVal}</p>
                    </div>
                </div>
                <div id="value-date-holder-content" className="container value-date-holder nopaddings">
                    <div id="date-holder-scroll" className="col-xs-12">
                        <div className="row text-center">
                            {storeStatus}
                        </div>
                        <DatePicker
                            inline
                            selected={this.state.startDate}
                            onChange={this.handleDateChange}
                            dateFormat="DD-MM-YYYY"
                        />


                    </div>
                </div>
                <div id="value-time-holder-content" className="container value-time-holder nopaddings">
                    <div className="col-xs-12">
                        <div className="row text-center">
                            {storeStatus}
                        </div>
                        /*****
                        *  for time popup is not finish yet get distraction
                        *  right now just drop a value from api nothing cant do
                        */
                        <div className="choose-time-content">
                            <div className="row">{`Store is available from ${storeStartTime} and will close at ${storeEndTime}`}</div>
                            {storeListOpenHours}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Datetimeselect;