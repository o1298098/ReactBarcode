import React from 'react'; 
import { render } from 'react-dom';
import InfoCase from "./components/InfoCase";
import LoginCase from './components/LoginCase';
import {BrowserRouter, Route,browserHistory,history} from 'react-router-dom';
/*import device from 'current-device'
if(device.type=="mobile")
{
    require('./style/main_P.css');
}
else
{
    require('./style/main.css');
}*/
require('./style/main.css');
render(
    <BrowserRouter basename="/" history={history}>
    <div>
    <Route exact  path="/" component={InfoCase}></Route>
    <Route path="/login" component={LoginCase}></Route>
    </div>    
    </BrowserRouter>,
    document.querySelector("#app")
    );
