import React, { Component } from 'react'; 
import { render } from 'react-dom';
import MaterialList  from "./components/MaterialList";
import InfoCase from "./components/InfoCase"
import device from 'current-device'
if(device.type=="mobile")
{
    require('./style/main_P.css');
}
else
{
    require('./style/main.css');
}
render(<div>
    <InfoCase/>
    <MaterialList/>
    </div>,
    document.querySelector("#app")
    );
