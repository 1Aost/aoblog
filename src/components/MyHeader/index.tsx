import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, message, Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { userMess, change } from "../../store/reducers/userSlice";
import type { MenuProps } from 'antd';
import "../../assets/font_style_cn.css";
import "./index.css";
import { getUserByToken } from '../../services/Users';
interface UserType {
  user: {
    id: number
    username: string
    password: string
    avatar: string
  }
};

const MyHeader = () => {
  // const [user1,setUser1]=useState<any>({});
  const [size, setSize] = useState<SizeType>('large');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((store: { user: UserType }) => store.user);
  // 头部导航栏
  const list = [
    { id: 0, name: "首页", url: "/home" },
    { id: 1, name: "前端基础", url: "/home?type=0" },
    { id: 2, name: "前端进阶", url: "/home?type=1" },
    { id: 3, name: "前端八股文", url: "/home?type=2" },
    { id: 4, name: "算法", url: "/home?type=3" },
    { id: 5, name: "留言板", url: "/board" },
    { id: 6, name: "历程", url: "/process" },
    { id: 7, name: "个人感想", url: "/feeling" },
    { id: 8, name: "关于", url: "/about" },
  ];

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
        <a rel="noopener noreferrer" href="###" onClick={() => handleLogout()}>
          退出登录
        </a>
      ),
    },
  ];

  const fetchUser = () => {
    getUserByToken({ token: localStorage.getItem("token") }).then(res => {
      dispatch(userMess((res.data)[0]));
    }).catch(_err => {
      message.error("出错了，请联系管理员");
    });
  };

  useEffect(() => {
    fetchUser();
  }, [location.search, localStorage.getItem("token")]);

  // 退出登录
  const handleLogout = () => {
    const url: string = location.pathname + location.search;
    localStorage.removeItem("token");
    dispatch(userMess({}));
    dispatch(change(false));
    navigate(url);
  };

  return (
    <div className="header font-style">
      <ul>
        {
          list.map((item) => {
            return (
              <li key={item.id}>
                <NavLink
                  to={item.url}>{item.name}</NavLink>
              </li>
            )
          })
        }
      </ul>
      <div className="mess">
        {
          localStorage.getItem("token") ?
            <div className="avatar" onClick={() => navigate("/mine")}>
              <Dropdown menu={{ items }} placement="bottom">
                <img src={user.avatar} alt="" />
              </Dropdown>
            </div> :
            <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
              <Radio.Button onClick={() => navigate("/login")} value="large">登录</Radio.Button>
              <Radio.Button onClick={() => navigate("/register")} value="large">注册</Radio.Button>
            </Radio.Group>
        }
      </div>
    </div>
  )
};

export default MyHeader;