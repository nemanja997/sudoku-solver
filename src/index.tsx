import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Solve from './pages/Solve';
import Examples from './pages/Examples';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header";

ReactDOM.render(
    <div className="text-indigo-400">
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Solve} />
                <Route path="/examples" component={Examples} />
            </Switch>
        </BrowserRouter>
    </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
