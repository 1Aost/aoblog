import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LegalToken } from '../../../services/Users';
import { Button, Menu, message, MenuProps } from 'antd';
import { EditOutlined, HeartOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import MySlider from '../../../components/MySlider';
import "./index.css";
interface UserType {
  user: {
    id: number
    username: string
    password: string
    avatar: string
  }
};

const Mine = () => {
  const { user } = useSelector((store: { user: UserType }) => store.user);
  const navigate = useNavigate();
  const [current, setCurrent] = useState<string>('message');
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate("/mine/" + e.key);
  };
  const items: MenuProps['items'] = [
    {
      label: '留言',
      key: 'message',
      icon: <MailOutlined />,
    },
    {
      label: '赞',
      key: 'liked',
      icon: <HeartOutlined />,
    },
    {
      label: '评论',
      key: 'comment',
      icon: <MessageOutlined />,
      // children: articletype
    },
  ];
  /* useEffect(() => {
    apiFun.getBlogList().then((res:any)=>{
      setArticlesList(res.data);
    })
  }, []) */
  useEffect(() => {
    const token = localStorage.getItem("token");
    LegalToken({ token: token })
      .then(res => {
        // 身份信息过期
        if (res.code === '1111') {
          message.warning(res.msg);
          navigate("/login");
          // localStorage.removeItem("token");
        } else if (res.code === '2222') {
          // 尚未登录
          message.warning(res.msg);
          navigate("/home");
        }
      }).catch(_err => {
        message.error("出错了，请联系管理员");
      })
  }, [navigate]);

  return (
    <div className='mine'>
      <div className="mine-left">
        <div className="mess font-style">
          <div className="mess-left">
            <div className="avatar">
              <img src={user.avatar} alt="" />
            </div>
          </div>
          <div className="mess-right">
            <div className="username">{user.username}</div>
            <Button onClick={() => navigate("/change")} type="primary" icon={<EditOutlined />} >设置</Button>
          </div>
        </div>
        <div className="contents">
          <div className="contents-top">
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
          </div>
          <div className="contents-center">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <MySlider></MySlider>
    </div>
  )
}
export default Mine;