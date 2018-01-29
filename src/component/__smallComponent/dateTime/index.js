import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

import { connect } from "react-redux";
import { setReservationDate, setReservationTime, getReservationDateTime } from "../../../actions/userActions"

import './dateTime.scss';

let allStores;
let selectStoreID;
let activeStore;
let userSelectDay;
let userSelectTime;
let userSelectDate;
let activeStoreDineInHours;
let choseTime;
let storeStatus;
let openday;
let storeStatusTime;
let chooseStore;
let openTimeList;
let notDateAfter;
let notDateAfterNotification;
let timeToClose;
let timeToCloseNotification;

@connect((store) => {
    return {
        store: store.store.store,
    };
})
class DateTime extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            startDate: moment(),
            startTime: moment().format("HH:mm"),
            inputDateValue: "Please choose Date"
        };
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleTimeChoose = this.handleTimeChoose.bind(this);
        this.dateClick = this.dateClick.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(getReservationDateTime());
    }

    dateClick(){
        this.setState({
            // startDate: date,
            inputDateValue: ""
        });
    }

    handleChangeDate(date) {
        this.setState({
            startDate: date,
            inputDateValue: date
        });



        let dateNow = Date.now();
        // console.log(moment(dateNow).format("DD-MM-YYYY"));

        userSelectDay = date.format("dddd");
        userSelectDate = new Date(date);

        if(moment(userSelectDate).format("x") >= (moment(dateNow).format("x"))){
            notDateAfter = true;
            notDateAfterNotification = "";
        }else{
            notDateAfter = false;
            notDateAfterNotification = <p className='has-error'>Please choose a date after today</p>;
        }


        openday = activeStoreDineInHours["dineInHours"].find(data => (data.dayOfWeek === _.toUpper(userSelectDay)));
        storeStatus = openday ? null : <p className='has-error'>Store is CLOSE please choose other date</p>;
        choseTime = openday ? null : "disabled";

        if(!storeStatus){
            let storeOpenHour = openday.startTime.split(":").slice(0,1).toString();
            let storeOpenMinute = openday.startTime.split(":").slice(1,2).toString();
            let storeCloseHour = openday.endTime.split(":").slice(0,1).toString();
            let storeCloseMinute = openday.endTime.split(":").slice(1,2).toString();
            let storeAvalibleTime = [];

            for(let x=storeOpenHour; x <= storeCloseHour; x++){
                if(x === storeOpenHour && storeOpenMinute === "00"){
                    storeAvalibleTime.push(""+ x +":00");
                    storeAvalibleTime.push(""+ x +":30");
                }else if(x === storeOpenHour && storeOpenMinute === "30"){
                    storeAvalibleTime.push(""+ x +":30");
                }
                if(x > storeOpenHour && x < storeCloseHour) {
                    storeAvalibleTime.push("" + x + ":00");
                    storeAvalibleTime.push("" + x + ":30");
                }
                if(x == storeCloseHour && storeCloseMinute === "00"){
                    storeAvalibleTime.push("" + x + ":00");
                }else if(x == storeCloseHour && storeCloseMinute === "30"){
                    storeAvalibleTime.push("" + x + ":00");
                    storeAvalibleTime.push("" + x + ":30");
                }
            }
            openTimeList = storeAvalibleTime.map(avail => ( <option key={avail} value={avail}>{avail}</option>));
        }
        if(openday){
            this.props.dispatch(setReservationDate(moment(userSelectDate).format("DD-MM-YYYY")))
        }

    }

    handleTimeChoose(event){
        this.setState({
            startTime: event.target.value
        });
        userSelectTime = moment(event.target.value, "HH:mm");

        let dateNow = Date.now();

        if(moment(dateNow).format("DD-MM-YYYY") === moment(userSelectDate).format("DD-MM-YYYY") ){

            let tanggalSekarang = moment(dateNow).format("DD-MM-YYYY").toString();
            let jampilihanUser = event.target.value.toString();
            let aha = ""+tanggalSekarang+" "+jampilihanUser;
            let userSelectTodayDateTime = moment(aha, "DD-MM-YYYY HH:mm");

            if(moment(userSelectTodayDateTime).format("x") > moment(dateNow).add(1,"h").format("x") ){

                this.props.dispatch(setReservationTime(moment(userSelectTime).format("HH:mm")));
                timeToClose=  false;
                timeToCloseNotification = "";
            }else{

                timeToClose = true;
                timeToCloseNotification = <p className='has-error'>Please choose other time</p>;

            }

        }else{

            timeToClose = null;
            timeToCloseNotification = "";
            this.props.dispatch(setReservationTime(moment(userSelectTime).format("HH:mm")));

        }

    }

    init(){
        allStores = this.props.store;
        selectStoreID = _.toNumber(this.props.selectStoreID);
        activeStore = allStores.filter((eachStore) => eachStore.id === selectStoreID);
        activeStoreDineInHours = _.pick(activeStore[0], "dineInHours");
        chooseStore = selectStoreID ? "" : "disabled";
        choseTime = openday ? "" : "disabled";
        choseTime = notDateAfter ? "" : "disabled";

    }

    render(){
       this.init();
        return(
            <div className="col-12 nopaddings">

                <div className="col-6 nopaddings float-left" style={{position: "static"}}>
                    <DatePicker
                        onFocus={this.dateClick}
                        dateFormat="DD-MM-YYYY"
                        selected={this.state.startDate}
                        onChange={this.handleChangeDate}
                        disabled={chooseStore}
                        value= {this.state.inputDateValue}
                    />
                </div>
                <div className="col-6 nopaddings float-left" >
                    <select onChange={this.handleTimeChoose} disabled={choseTime} >
                        <option value="null">Please choose Time</option>
                        {openTimeList}
                    </select>
                </div>
                <div className="clearfix" />
                {timeToCloseNotification}
                {storeStatus}
                {storeStatusTime}
                {notDateAfterNotification}
            </div>
        )
    }

}

export default DateTime