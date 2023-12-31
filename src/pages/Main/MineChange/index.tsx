import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { userMess } from '../../../store/reducers/userSlice';
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
const MineChange:React.FC=()=>{
    const {user}=useSelector((store: {user: UserType})=>store.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
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
    const [form]=Form.useForm();
    /**
     *  上传图片
     */
    // 图片地址
    const [imageUrl, setImageUrl] = useState<string>();
    // 加载
    const [loading, setLoading] = useState<boolean>(false);
    // 上传前
    const beforeUpload: (file: {
        type: string;
        size: number;
    }) => boolean = (file: { type: string; size: number; }):boolean => {
        // 图片格式
        const isJpgOrPng: boolean = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/JPEG/PNG/WEBP file!');
        }
        const isLt2M: boolean = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    // 转为base64
    const getBase64: (img: Blob, callback: any) => void = (img: Blob, callback: any): void => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    // 上传图片
    const handleChange: (info: any) => void = (info: any): void => {
        // console.log(info.file, 'info');
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {    
            getBase64(info.file.originFileObj, (imageUrl: any) => {
                setImageUrl(imageUrl);
                setLoading(false);
            });
        }
    };
    // 自定义上传函数
    const customUpload = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('file', file);
        const res: {url: string}=await apiFun.uploadAvatar(formData);
        setImageUrl("./avatar/"+res.url);
    };
    const onFinish: (values: {
        username: string;
        password: string;
    }) => void = (values: {username: string,password: string}): void => {
        (async function() {
            try {
                const res: MessageType=await apiFun.changeUser({id:user.id,...values,avatar:imageUrl});
                if(res.code==='0000') {
                    message.success(res.msg);
                    dispatch(userMess({id:user.id,...values,avatar:imageUrl}));
                    navigate("/mine");
                }else {
                    message.error(res.msg);
                }
            }catch(err) {
                message.error("出错了，请联系管理员");
            }
        })()
    };

    const onFinishFailed = (errorInfo: object) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(()=>{
        form.setFieldsValue(user);
    },[form,user])
    return (
        <div className='mine'>
            <div className="mine-left">
                <div className="mine-header">
                    <NavLink to="/mine">返回个人中心</NavLink>
                </div>
                <div className="mine-center">
                    <div className="top">修改个人资料</div>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600,padding:"20px" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="头像">
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                customRequest={({ file, onSuccess, onError }) => customUpload({ file, onSuccess, onError })}
                                onPreview={(event:any) => event.preventDefault()} // 阻止默认行为
                            >
                            {imageUrl ? (
                                <img src={imageUrl} alt="avatar" style={{ width: '100%', marginTop: '10px' }} />
                            ) : (
                                <div>
                                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                            </Upload>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            修改
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <MySlider></MySlider>
        </div>
    )
}
export default MineChange;