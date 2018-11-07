import React, { Component } from 'react';
import { render, findDOMNode } from "react-dom";
class MaterialList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mtxt: "",
            material: [
                { "name": "S原汁机", "qty": "4", "scantime": 0, "serialno": "1" },
                { "name": "S杯盖", "qty": "5", "scantime": 0, "serialno": "2" },
                { "name": "S刀盖", "qty": "6", "scantime": 0, "serialno": "3" },
                { "name": "绞肉机", "qty": "7", "scantime": 0, "serialno": "HSM30018411027" }
            ],
        }
    }
    ScanMaterialCode(e) {
        if (e.which === 13) {
            var t = document.getElementById("materialinput")
            var items=this.state.material;  
            items.forEach(function(item){
                if (item.serialno === t.value)
                item.scantime++;
            })          
            this.setState({
                material:items
            })
            t.value="";
            t.focus();
        }
    }
    render() {
        const materialtextstyle = {
            border: "none"
        }
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">物料列表</h3>
                        </div>
                        <div class="panel-body">
                            <div class="col-xs-12 col-md-6">
                                <ul class="list-group">
                                    <li class="list-group-item list-group-item-success">
                                        <span class="badge">2</span>S原汁机(2)</li>
                                    <li class="list-group-item">
                                        <span class="badge">1</span>S刀盖(3)</li>
                                    {this.state.material.map((item, index) => <MaterialItem name={item.name} qty={item.qty} scantime={item.scantime} key={index} />)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-primary btn-lg btn-block">打包完成</button>
                    <input type="text" text={this.state.mtxt} id="materialinput" style={materialtextstyle} onKeyPress={(e) => this.ScanMaterialCode(e)}></input>
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
        return (
            <li class={this.props.scantime == this.props.qty ? "list-group-item list-group-item-success" : "list-group-item"}>
                <span class="badge">{this.props.scantime}</span>{this.props.name}({this.props.qty})</li>
        );
    }
}
export default MaterialList