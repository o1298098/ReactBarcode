import React, { Component } from 'react';
import toastit from 'toastit.js';
import httpclient from '../js/HttpClient';
class LoginCase extends Component {    
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
    LoginSubmit(){
        var u=document.getElementById("inputUser");
        var p=document.getElementById("inputPassword");
        if(u.value.length==0||p.value.length==0)
        {
            toastit('用户名或密码不能为空',2000,{fontSize: '18px'});
            return;
        }            
        else
        {
            var data = {
                format: 1,
                useragent: "ApiClient",
                rid: "",
                parameters: "[\""+global.ServerInfo.datacenterid+"\",\""+u.value+"\",\""+p.value+"\",2052]",/*59a12c8ba824d2*//*630601229084*/
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
                    if(err==null)
                    {
                        console.log(result);
                        if(result.IsSuccessByAPI)
                        {
                            localStorage.setItem('user',result.Context.UserName);
                            localStorage.setItem('userid',result.Context.UserId);
                            e.props.history.goBack();
                        }
                        else
                        {
                            toastit(result.Message,2000,{fontSize: '18px'});
                        }
                    }
                    else
                    toastit('网络异常',2000,{fontSize: '18px'});
                });
        }

    }
    render() {
        return (
            <div className="container-fluid">
                <form className="form-horizontal" >
                <div className="form-group">
                <div className="col-xs-offset-3 col-md-offset-5 col-xs-6 col-md-2">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542352775556&di=b635e75f01108767953f984a38048f8a&imgtype=0&src=http%3A%2F%2Fimg0.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1801%2Fzzpic9547_sc115.com.jpg"  className="img-circle userico"/>
                </div>
                </div>
                    <div className="form-group">
                        <label htmlFor="inputUser" className="col-md-offset-2 col-sm-2 control-label">用户名</label>
                        <div className="col-sm-10 col-md-4">
                            <input type="text" className="form-control" id="inputUser" placeholder="User" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword" className="col-md-offset-2 col-sm-2 control-label">密码</label>
                        <div className="col-sm-10 col-md-4">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-4 col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" /> 记住账号
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-4 col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-default" onClick={()=>this.LoginSubmit()}>登陆</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}
export default LoginCase