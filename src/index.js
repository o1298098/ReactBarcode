import React, { Component } from 'react'; 
import { render } from 'react-dom';
import InfoCase from "./components/InfoCase"
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
    <InfoCase/>,
    document.querySelector("#app")
    );
