import React, { useEffect, useState } from 'react'
import MySlider from '../../../components/MySlider';
import "./index.css"
import { Button, Tooltip, Menu, message } from 'antd';
import { EditOutlined, HeartOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux'
import apiFun from '../../../api';
const Mine:React.FC=()=>{
    // const [articlesList,setArticlesList]=useState([]);
    const {user}=useSelector((store:any)=>store.user);
    const navigate=useNavigate();
    const [current, setCurrent] = useState('review');
    // const {articleList}=useSelector((store:any)=>store.article);
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        navigate("/mine/"+e.key);
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
    useEffect(() => {
        /* apiFun.getBlogList().then((res:any)=>{
            setArticlesList(res.data);
        }) */
    }, [])
    useEffect(()=>{
        const token=localStorage.getItem("token");
        apiFun.LegalToken({token:token}).then((res:any)=>{
            // 身份信息过期
            if(res.code==='1111') {
                message.warning(res.msg);
                navigate("/login");
                // localStorage.removeItem("token");
            }else if(res.code==='2222') {
                // 尚未登录
                message.warning(res.msg);
                navigate("/home");
            }
        })
    },[navigate])
    function handleChangeUser() {
        navigate("/change")
    }
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
                        <Tooltip placement="bottom" title="Edit">
                            <Button onClick={handleChangeUser} type="primary" icon={<EditOutlined />} >设置</Button>
                        </Tooltip>
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