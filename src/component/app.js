import React from 'react';
import Main from "./main";
import Header from "./header";
import { Provider } from "react-redux";
import store from "../store";

class App extends React.Component{

    render(){
        return(
            <Provider store={store}>
                <div>
                    <Header/>
                    <Main/>
                </div>
            </Provider>
        )
    }
}

export default App