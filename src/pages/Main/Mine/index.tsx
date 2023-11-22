import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Button, Tooltip, Menu, message, MenuProps } from 'antd';
import { EditOutlined, HeartOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import MySlider from '../../../components/MySlider';
import apiFun from '../../../api';
import "./index.css"
interface MessageType {
    code: string
    msg: string
    data: null | DataType
}
interface DataType {
    username: string
    password: string
    iat: number
    exp: number
}
interface UserType {
    user: {
        id: number
        username: string
        password: string
        avatar: string
    }
}
const Mine:React.FC=()=>{
    const {user}=useSelector((store: {user: UserType})=>store.user);
    const navigate=useNavigate();
    const [current, setCurrent] = useState<string>('review');
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
    /* useEffect(() => {
        apiFun.getBlogList().then((res:any)=>{
            setArticlesList(res.data);
        })
    }, []) */
    useEffect(()=>{
        const token: string | null=localStorage.getItem("token");
        (async function() {
            try {
                const res: MessageType=await apiFun.LegalToken({token:token});
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
            }catch(err) {
                message.error("出错了，请联系管理员");
            }
        })();
    },[navigate])
    function handleChangeUser(): void {
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