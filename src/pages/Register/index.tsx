import { message } from 'antd'
import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { SmileOutlined, KeyOutlined } from "@ant-design/icons"
import apiFun from '../../api'
import "../../assets/font_style_cn.css"
import "./index.css"

const Register:React.FC=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
  const [info,setInfo]=useState("");
    const navigate=useNavigate();
    function handleUsername(e:any) {
        setUsername(e.target.value)
    }
    function handlePassword(e:any) {
        setPassword(e.target.value)
    }
    function handleRegister() {
        if(username.trim().length<2 || username.trim().length>5) {
            setInfo("用户名的长度不能小于2位大于5位");
        }else if(password.trim().length<7 || password.trim().length>17) {
            setInfo("密码的长度不能小于7位大于17位");
        }else {
            apiFun.register({username:username.trim(),password:password.trim()}).then((res:any)=>{
                console.log(res);
                if(res.code==='0000') {
                    message.success("注册成功，请登录");
                    navigate("/login");
                }else if(res.code==='1004') {
                    message.warning(res.msg);
                }else {
                    message.error("请稍后重试")
                }
            })
        }
    }
    return (
        <main>
            <div className="register">
                <div className="register-left">
                    <div className="reg-ltcmt"></div>
                    <h1 className="font-style">有账号，直接登录</h1>
                    <p className="font-style">如果您有Aoblog账号，可点击下方登录按钮</p>
                    <NavLink className="font-style" to="/login">登录</NavLink>
                </div>
                <div className="register-right">
                    <h1 className="text-style-1 font-style">注册Aoblog账号</h1>
                    <i className="Rectangle-2"></i>
                    <p className="text_style_2 font-style">欢迎来到Aoblog！</p>
                    <div id="register">
                        <i className="user"><SmileOutlined style={{fontSize:"27px",color:"#666"}} /></i>
                        <input type="text" name={username} onChange={handleUsername} className="input font-style" placeholder="请输入您的用户名" id="hs_user"/>
                        <i className="password"><KeyOutlined style={{fontSize:"27px",color:"#666"}} /></i>
                        <input type="password" name={password} onChange={handlePassword} className="input" placeholder="请输入您的密码" id="hs_psw"/>
                        <div className="info font-style">{info}</div>
                        <button onClick={handleRegister} className="btn font-style">完成注册</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Register;