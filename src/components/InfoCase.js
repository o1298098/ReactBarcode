import React, { Component } from 'react';
class InfoCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">订单信息</h3>
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon" id="basic-addon1">物流单号</span>
                            <input type="text" class="form-control" placeholder="物流单号" aria-describedby="basic-addon1" id="logno" />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default InfoCase