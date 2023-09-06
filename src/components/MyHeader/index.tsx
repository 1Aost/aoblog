import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, message, Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import {userMess,change} from "../../store/reducers/userSlice"
import type { MenuProps } from 'antd';
import apiFun from '../../api';
import "../../assets/font_style_cn.css"
import "./index.css"
import { useDispatch, useSelector } from 'react-redux';
const MyHeader: React.FC = () => {
  const [user1,setUser1]=useState<any>({});
  const [size, setSize] = useState<SizeType>('large');
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  const {user}=useSelector((store:any)=>store.user);
  // 头部导航栏
  const list=[
    {id:0,name:"首页",url:"/home"},
    {id:1,name:"前端基础",url:"/home?type=0"},
    {id:2,name:"前端进阶",url:"/home?type=1"},
    {id:3,name:"前端八股文",url:"/home?type=2"},
    {id:4,name:"算法",url:"/home?type=3"},
    {id:5,name:"留言板",url:"/board"},
    {id:6,name:"历程",url:"/process"},
    {id:7,name:"个人感想",url:"/feeling"},
    {id:8,name:"关于",url:"/about"},
  ]
  // 用户头像导航栏
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to="/mine">
          个人中心
        </NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href="###" onClick={handleLogout}>
          退出登录
        </a>
      ),
    },
  ];
  function fetchUser() {
    let token=localStorage.getItem("token");
    apiFun.getUserByToken({token:token}).then((res:any)=>{
      if(res.code==="0000") {
        setUser1(res.data[0]);
        dispatch(userMess(res.data[0]));
      }
    })
  }
  useEffect(() => {
    fetchUser();
  // }, [location.search,localStorage.getItem("token")])
  }, [location.search,localStorage.getItem("token")])
  // 退出登录
  function handleLogout() {
    const url=location.pathname+location.search;
    message.success("成功退出");
    localStorage.removeItem("token");
    dispatch(userMess({}));
    dispatch(change(false));
    navigate(url);
  }
  return (
    <div className="header font-style">
      <ul>
        {
          list.map((item)=>{
            return (
              <li key={item.id}>
                <NavLink 
                  onClick={()=>message.success("查询成功")}  
                  to={item.url}>{item.name}</NavLink>
              </li>
            )
          })
        }
      </ul>
      <div className="mess">
        {
          localStorage.getItem("token")?
          <div className="avatar"  onClick={()=>navigate("/mine")}>
            <Dropdown menu={{ items }} placement="bottom">
              <img src={user.avatar} alt="" />
            </Dropdown>
          </div>:
          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
            <Radio.Button onClick={()=>navigate("/login")} value="large">登录</Radio.Button>
            <Radio.Button onClick={()=>navigate("/register")} value="large">注册</Radio.Button>
          </Radio.Group>
        }
      </div>
    </div>
  )
};

export default MyHeader;