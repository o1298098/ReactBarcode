import React, { Component } from 'react';
import MaterialList from "./MaterialList";
import httpclient from '../js/HttpClient';
import toastit from 'toastit.js';
class InfoCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material: []
        }
    }
    componentDidMount() {
       /* this.input.focus();*/
        /*document.getElementById("logno").focus();*/
      
    }

    newGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    }
    onKeyPress(e) {
        if (e.which === 13) {
            var l = document.getElementById("logno");
            var t = document.getElementById("materialinput");
            const xhr = new XMLHttpRequest();
            var data = {
                format: 1,
                useragent: "ApiClient",
                rid: "",
                parameters: "[\"5b7cd1cd74ef2e\",\"" + l.value + "\"]",/*59a12c8ba824d2,5b7cd1cd74ef2e*/
                timestamp: "",
                v: "1.0"
            };            
            this.input.readOnly = true; 
            var myDate = new Date();
            var guid = this.newGuid();
            data.timestamp = myDate.getTime().toString();
            data.rid = guid;
            var e=this;
            httpclient.post({
                url:'/k3cloud/Kingdee.BOS.WebAPI.ServiceExtend.ServicesStub.CustomBusinessService.GetPickDeliveryInfo.common.kdsvc',data:data,timeout:5000}
                ,function(err,result){
                    if(err===null)
                    {
                        if(JSON.stringify(result)!=='[]')
                        {
                            let gotServices = result;
                            e.setState({
                                material: gotServices
                            });
                            t.focus();
                        }
                        else
                        {
                            e.input.readOnly = false; 
                            e.input.value=""; 
                            toastit('系统没有记录',2000,{fontSize: '18px'});
                            e.input.focus();
                        }                       
                    }
                    else{
                        toastit('网络不稳定',2000,{fontSize: '18px'});
                        e.input.readOnly = false;                        
                        e.input.value=""; 
                    }
                    console.log(result);
                });
            
        }

    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">订单信息</h3>
                            </div>

                            <div className="input-group">
                                <span className="input-group-addon" id="basic-addon1">物流单号</span>
                                <input type="text" className="form-control" placeholder="物流单号" aria-describedby="basic-addon1" id="logno" ref={(input) => this.input = input} onKeyPress={(e) => this.onKeyPress(e)} autoFocus/>
                            </div>
                        </div>
                    </div>
                </div>
                <MaterialList source={this.state.material} />
            </div>
        )
    }
}
export default InfoCase