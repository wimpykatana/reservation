import React from "react";
import { Switch, Route, browserHistory, IndexRoute } from 'react-router-dom';
import Login from "../_pageLayout/login";
// import Register from "../_pageLayout/register";
import Landing from '../_pageLayout/landing';
import Actionpage from '../_pageLayout/action';
import Makereservation from '../_pageLayout/makeReservation';
// import Reservation from "../_pageLayout/reservation";
// import Confirmation from "../_pageLayout/confirmation";



import Header from "../header";


class Main extends React.Component {
    render(){
        return(

            <main className="main-holder">
                {/*<Header/>*/}
                <Switch>

                    <Route history={browserHistory} exact path="/" component={Landing}/>
                    <Route history={browserHistory} exact path="/action" component={Actionpage}/>
                    <Route history={browserHistory} exact path="/makereservation" component={Makereservation}/>

                    {/*<Route history={browserHistory} path="/reservation" component={Reservation}/>*/}
                    {/*<Route history={browserHistory} path="/confirmation" component={Confirmation}/>*/}
                    {/*<Route component={Reservation} />*/}
                </Switch>

            </main>

        )
    }
}

export default Main