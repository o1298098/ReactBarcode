import React, { Component } from 'react';
import { render, findDOMNode } from "react-dom";
import httpclient from '../js/HttpClient';
import toastit from 'toastit.js';
require('../style/toastit.css');
class MaterialList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mtxt: "",
            material: this.props.source,
            btnstate: true,
        }
    }    
    componentWillReceiveProps(nextProps) {
        this.setState({
            material: nextProps.source
        })
    }
    onListClick(e) {
        var l = document.getElementById("logno");
        var t = document.getElementById("materialinput");
        if (JSON.stringify(this.props.source) === '[]')
            l.focus();
        else
            t.focus();

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
    onSubmitClick(e) {
        //待添加接口        
        var l = document.getElementById("logno");
        var data = {
            format: 1,
            useragent: "ApiClient",
            rid: "",
            parameters: "[\"5b7cd1cd74ef2e\",\"kingdee\",\"kd!123456\",2052]",/*59a12c8ba824d2*//*630601229084*/
            timestamp: "",
            v: "1.0"
        };
        var myDate = new Date();
        var guid = this.newGuid();
        data.timestamp = myDate.getTime().toString();
        data.rid = guid;
        var e=this;
        httpclient.post({
            url:'/k3cloud/Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser.common.kdsvc',data:data,timeout:5000}
            ,function(err,result){
                console.log(result);
            });
            data.parameters=["ECC_DeliveryManagement","CreateOutStock","{\"Parameters\":\"ECC_DeliveryManagement\",\"Model\":{\"FID\":\""+this.state.material[0].FID+"\",\"FIsPicking\":\"true\"}}"];
            httpclient.post({
                url:'/k3cloud/Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.ExcuteOperation.common.kdsvc',data:data,timeout:5000}
                ,function(err,result){
                    console.log(result);
                    if(err===null)
                    {
                    if(result.Result.ResponseStatus.IsSuccess)
                    {
                        e.setState({
                            material: [],
                            btnstate: true,
                        });
                        l.readOnly = false;
                        l.value = '';
                        toastit('出库成功',2000,{fontSize: '18px'});
                        l.focus();
                    }
                    else
                    {
                        toastit('失败',2000,{fontSize: '18px'}) ;
                    }
                }
                else
                {
                    toastit('网络不稳定',2000,{fontSize: '18px'});
                }
                   
                });

    }
    ScanMaterialCode(e) {
        if (e.which === 13) {
            let count = 0;
            var t = document.getElementById("materialinput")
            var items = this.state.material;
            items.forEach(function (item) {
                if (item.fnumber === t.value)
                {
                    if(item.qty >item.scantime)
                    {
                        item.scantime++;
                    }
                    else
                    {
                        toastit("超出扫描数量",2500,{fontSize: '18px'}) ;
                    }
                    
                }
                if (item.qty === item.scantime)
                    count++;
            })
            this.setState({
                material: items
            })
            t.value = "";
            t.focus();
            if (items.length === count)
                this.setState({
                    btnstate: false
                })
        }
    }
    render() {
        const materialtextstyle = {
            "border": "none",
            "color": "transparent",
            "zIndex":-1,
            "top":"50%",
            "left":"50%",
            "position": "absolute"
        }
        const materialulstyle = {
            "height": 350,
            "overflow": "auto"
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">物料列表</h3>
                        </div>
                        <div className="panel-body" onClick={(e) => this.onListClick(e)}>
                            <div className="col-xs-12 col-md-6" style={materialulstyle} onClick={(e) => this.onListClick(e)}>
                                <ul className="list-group">
                                    {this.state.material.map((item, index) => <MaterialItem name={item.fname} qty={item.qty} scantime={item.scantime} key={index} />)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-primary btn-lg btn-block" ref={(btn) => this.btn = btn} disabled={this.state.btnstate} onClick={(e) => this.onSubmitClick(e)}>打包完成</button>
                    <input type="text" text={this.state.mtxt} id="materialinput" style={materialtextstyle} onKeyPress={(e) => this.ScanMaterialCode(e)} ></input>
                </div>
            </div>
        )
    }
}
class MaterialItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const fontstyle = {
            "fontSize": 20,
        }
        return (
            <li className={this.props.scantime == this.props.qty ? "list-group-item list-group-item-success" : "list-group-item"} style={fontstyle}  >
                <span className="badge">{this.props.scantime}</span>{this.props.name}({this.props.qty})</li>
        );
    }
}
export default MaterialList