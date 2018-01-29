import React from "react"
import { render } from "react-dom"
import { MemoryRouter } from 'react-router'
import App from "./component/app"
import 'babel-polyfill';

window.React = React;

render(
    (
        <div>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </div>
    ),
    document.getElementById('root')
);