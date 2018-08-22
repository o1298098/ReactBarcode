import React, { Component } from 'react';
import { render, findDOMNode } from "react-dom";
class MaterialList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mtxt: "",
            material: this.props.source,
        }
    }
    ScanMaterialCode(e) {
        if (e.which === 13) {
            var t = document.getElementById("materialinput")
            var items=this.props.source;  
            items.forEach(function(item){
                if (item.fnumber === t.value)
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
            "border": "none"
        }
        const materialulstyle={
            "height":350,
            "overflow":"auto"
        }
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">物料列表</h3>
                        </div>
                        <div class="panel-body">
                            <div class="col-xs-12 col-md-6" style={materialulstyle}>
                                <ul class="list-group">                                   
                                    {this.props.source.map((item, index) => <MaterialItem name={item.fname} qty={item.qty} scantime={item.scantime} key={index} />)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-primary btn-lg btn-block">打包完成</button>
                    <input type="text" text={this.state.mtxt} id="materialinput" style={materialtextstyle} onKeyPress={(e) => this.ScanMaterialCode(e) } onfocus="this.blur()"></input>
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
            "font-size":20,
        }
        return (
            <li class={this.props.scantime == this.props.qty ? "list-group-item list-group-item-success" : "list-group-item"} style={fontstyle}>
                <span class="badge">{this.props.scantime}</span>{this.props.name}({this.props.qty})</li>
        );
    }
}
export default MaterialList