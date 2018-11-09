import React, { Component } from 'react';
import { render, findDOMNode } from "react-dom";
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
    onSubmitClick(e){
        //待添加接口
        this.setState({
            material:[],
            btnstate: true,
        });
        var l = document.getElementById("logno");
        l.readOnly = false;
        l.value="";
        l.placeholder="成功";
        l.focus();

    }
    ScanMaterialCode(e) {
        if (e.which === 13) {
            let count = 0;
            var t = document.getElementById("materialinput")
            var items = this.props.source;
            items.forEach(function (item) {
                if (item.fnumber === t.value)
                    item.scantime++;
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
            "border": "none"
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
            <li className={this.props.scantime == this.props.qty ? "list-group-item list-group-item-success" : "list-group-item"} style={fontstyle}>
                <span className="badge">{this.props.scantime}</span>{this.props.name}({this.props.qty})</li>
        );
    }
}
export default MaterialList