import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input,Pagination, message } from 'antd';
import { timestampToTime } from '../../../api/utils';
import apiFun from '../../../api';
import MySlider from '../../../components/MySlider';
import "./index.css"
interface MessageType {
    code: string
    msg: string
    data: null | DataType | Array<ReviewType>
}
interface DataType {
    username: string
    password: string
    iat: number
    exp: number
}
// 接口返回评论数据信息
interface ReviewType {
    id: number
    user_id1: number
    user_name: string
    review_time: string
    review_email: string
    review_message: string
    review_reply: string
    review_status: number
}
interface FinishType {
    user: UserType
}
interface UserType {
    review_message: string
    review_email: string
}
interface LayoutType {
    labelCol: {
        span: number;
    };
    wrapperCol: {
        span: number;
    }
}
const layout: LayoutType = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages: object = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const PageSize:number = 5; // 每页展示的数据条数
// const {TextArea}=Input;
const MessageBoard:React.FC=()=>{
    // const [articlesList,setArticlesList]=useState([]);
    const [form]=Form.useForm();
    const [reviews,setReviews]=useState<Array<ReviewType>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
    const navigate=useNavigate();
    // const {articleList}=useSelector((store:any)=>store.article);
    // 根据当前页码切片获取当前页要展示的数据
    const getCurrentPageData: () => Array<ReviewType> = ():Array<ReviewType> => {
        const startIndex:number = (currentPage - 1) * PageSize;
        const endIndex:number = startIndex + PageSize;
        return reviews.slice(startIndex, endIndex);
    };
    async function fn1(): Promise<void> {
        try {
            const res:MessageType=await apiFun.getReviews();
            // 判断：当留言的状态为通过的时候，才会展示出来
            const statusData: Array<ReviewType>=(res.data as Array<ReviewType>).filter((item:any)=>{
                return item.review_status===1;
            })
            setReviews(statusData);
        }catch(err) {
            message.error("出错啦，请联系管理员");
        }
    }
    const onFinish = (values: FinishType) => {
        if(values) {
            const reviews: UserType=values.user;
            const token: string | null=localStorage.getItem("token") as string | null;
            (async function() {
                try {
                    const res: MessageType=await apiFun.LegalToken({token:token});
                    if(res.code==='1111') {
                        message.warning(res.msg);
                        navigate("/login");
                        // localStorage.removeItem("token");
                    }else if(res.code==='2222') {
                        message.warning(res.msg);
                    }else {
                        (async function() {
                            const res: MessageType=await apiFun.submitReview({review_message:reviews.review_message,review_email:reviews.review_email,token:localStorage.getItem("token")})
                            if(res.code==='0000') {
                                message.success(res.msg);
                                setTimeout(()=>{
                                    message.destroy();
                                    form.resetFields();
                                    fn1();
                                },1000)
                            }else {
                                message.error(res.msg);
                                setTimeout(()=>{
                                    message.destroy()
                                },1000)
                            }
                        })()
                    }
                }catch(err) {
                    message.error("出错了，请稍后重试");
                }
            })()
        }
        
    }
    useEffect(() => {
        fn1();
    }, [])
    
    return (
        <div className='board'>
            <div className="board-left">
                <div className='card'>
                    <div className="card-top">
                        <h2>留言板</h2>
                    </div>
                    <div className="card-content">
                        <Form
                            {...layout}
                            name="nest-messages"
                            onFinish={onFinish}
                            style={{ maxWidth: 1000,width:1000 }}
                            validateMessages={validateMessages}
                            form={form}
                        >
                            <Form.Item name={['user', 'review_message']} label="评价（不能为空）">
                                <Input />
                            </Form.Item>
                            <Form.Item name={['user','review_email']} label="邮箱（不能为空）" rules={[{ type: 'email' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    提交留言
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className='card-mess'>
                    <div className="card-top">
                        <h2>所有留言</h2>
                    </div>
                    {
                        getCurrentPageData().map((review:ReviewType) => {
                            return (
                                <div key={review.id} className="card-message font-style">
                                <div className="c-content">
                                    <div className="cc-1">
                                    <div className="cc-title">{review.user_name}</div>
                                    <div className="cc-time">{timestampToTime(review.review_time, true)}</div>
                                    </div>
                                    <div className="cc-2">{review.review_message}</div>
                                </div>
                                </div>
                            );
                        })
                    }
                </div>
                <Pagination
                    defaultCurrent={1}
                    total={reviews.length} // 这里设置总的数据条数
                    pageSize={PageSize} // 每页展示的数据条数
                    onChange={(page) => setCurrentPage(page)} // 监听页码变化
                />
            </div>
            <MySlider></MySlider>

        </div>
    )
}
export default MessageBoard;