import { message } from 'antd'
import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { SmileOutlined, KeyOutlined } from "@ant-design/icons"
import apiFun from '../../api'
import "../../assets/font_style_cn.css"
import "./index.css"
import { useDispatch } from 'react-redux'
import {change} from "../../store/reducers/userSlice"
const Login:React.FC=()=>{
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [info,setInfo]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  function handleLogin() {
    if(username.trim().length<2 || username.trim().length>5) {
      setInfo("用户名的长度不能小于2位大于5位");
    }else if(password.trim().length<7 || password.trim().length>17) {
      setInfo("密码的长度不能小于7位大于17位");
    }else {
      apiFun.login({username:username.trim(),password:password.trim()}).then((res:any) => {
        console.log(res);
        if(res.code==='0000') {
          localStorage.setItem("token",res.data);
          message.success("成功登录，欢迎欢迎");
          dispatch(change(true));
          navigate("/home");
        }else if(res.code==='1002') {
          message.warning(res.msg);
        }else if(res.code==='1001') {
          message.error("出现错误，请稍后重试");
        }
      });
    }
  }
  function handleUsername(e:any) {
    setUsername(e.target.value)
  }
  function handlePassword(e:any) {
    setPassword(e.target.value)
  }
  return (
    <main>
        <div className="login">
            <div className="login-left">
                <div className="login-ltcmt"></div>
                <h1 className="font-style">没有账号</h1>
                <p className="font-style">您可以通过下方点击注册按钮，拥有Aoblog账号</p>
                <NavLink className="font-style" to="/register">注册</NavLink>
            </div>
            <div className="login-right">
            <h1 className="text-style-1 font-style">欢迎来到Aoblog</h1>
            <i className="Rectangle-2"></i>
            <p className="text_style_2 font-style">欢迎来到Aoblog！</p>
            {/* <Form
                name="basic"
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 16, }}
                style={{ maxWidth: 600, }}
                initialValues={{ remember: true, }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
                
            </Form> */}
            <div id="login">
                <i className="user"><SmileOutlined style={{fontSize:"27px",color:"#666"}} /></i>
                <input type="text" name={username} onChange={handleUsername} className="input" placeholder="请输入您的用户名" id="hs_user"/>
                <i className="password"><KeyOutlined style={{fontSize:"27px",color:"#666"}} /></i>
                <input type="password" name={password} onChange={handlePassword} className="input" placeholder="请输入您的密码" id="hs_psw"/>
                <div className="info font-style">{info}</div>
                <button onClick={handleLogin} className="btn font-style">登录</button>
            </div>
            </div>
        </div>
    </main>
  )
}
export default Login;