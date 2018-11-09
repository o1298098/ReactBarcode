import React, { Component } from 'react';
import MaterialList from "./MaterialList";
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
                parameters: "[\"59a12c8ba824d2\",\"" + l.value + "\"]",/*630601266464*/
                timestamp: "",
                v: "1.0"
            };
            var myDate = new Date();
            var guid = this.newGuid();
            data.timestamp = myDate.getTime().toString();
            data.rid = guid;
            var jsontxt = JSON.stringify(data);
            xhr.open("POST", "/k3cloud/Kingdee.BOS.WebAPI.ServiceExtend.ServicesStub.CustomBusinessService.GetPickDeliveryInfo.common.kdsvc", true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.send(jsontxt);

            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) { return; }
                if (xhr.status == 200) {
                    
                    if (xhr.responseText!== '[]'){
                        let gotServices = JSON.parse(xhr.responseText);
                        this.setState({
                            material: gotServices
                        });
                        this.input.readOnly = true; 
                        t.focus();
                       
                    }
                    else
                    {
                        this.input.value=""; 
                        this.input.placeholder="系统没有记录"
                        this.input.focus();
                    }
                    /*gotServices.map((item,index)=>{
                        this.state.material.push(item);
                    });*/
                    
                }
                else {
                    console.log("请求失败！");
                }
            }
        }
        else {
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