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
        this.input.focus();
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
            t.focus();
            const xhr = new XMLHttpRequest();
            var data = {
                format: 1,
                useragent: "ApiClient",
                rid: "",
                parameters: "[\"5ab05fc34e03d1\",\"" + l.value + "\"]",/*630601266464*/
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
                <div class="container-fluid">
                    <div class="row">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title">订单信息</h3>
                            </div>

                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">物流单号</span>
                                <input type="text" class="form-control" placeholder="物流单号" aria-describedby="basic-addon1" id="logno" ref={(input) => this.input = input} onKeyPress={(e) => this.onKeyPress(e)} />
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