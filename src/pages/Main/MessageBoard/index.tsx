import React, { useEffect, useState } from 'react'
import MySlider from '../../../components/MySlider';
import "./index.css"
import { Button, Form, Input,Pagination, message } from 'antd';
import apiFun from '../../../api';
import { timestampToTime } from '../../../api/utils';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const PageSize = 5; // 每页展示的数据条数
// const {TextArea}=Input;
const MessageBoard:React.FC=()=>{
    // const [articlesList,setArticlesList]=useState([]);
    const [form]=Form.useForm();
    const [reviews,setReviews]=useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const navigate=useNavigate();
    // const {articleList}=useSelector((store:any)=>store.article);
    // 根据当前页码切片获取当前页要展示的数据
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * PageSize;
        const endIndex = startIndex + PageSize;
        return reviews.slice(startIndex, endIndex);
    };
    function fn1() {
        apiFun.getReviews().then((res:any)=>{
            // 判断：当留言的状态为通过的时候，才会展示出来
            const statusData=res.data.filter((item:any)=>{
                return item.review_status===1;
            })
            setReviews(statusData);
        })
    }
    const onFinish = (values: any) => {
        if(values) {
            const reviews=values.user;
            const token=localStorage.getItem("token");
            apiFun.LegalToken({token:token}).then((res:any)=>{
                if(res.code==='1111') {
                    message.warning(res.msg);
                    navigate("/login");
                    // localStorage.removeItem("token");
                }else if(res.code==='2222') {
                    message.warning(res.msg);
                }else {
                    apiFun.submitReview({review_message:reviews.review_message,review_email:reviews.review_email,token:localStorage.getItem("token")}).then((res:any)=>{
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
                    })
                }
            })
        }
        
    }
    useEffect(() => {
        fn1();
        // apiFun.getBlogList().then((res:any)=>{
        //     console.log(res);
            // console.log(articleList);
            
            // setArticlesList(res.data);
        //     console.log(articlesList);
        // })
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
                            {/* <Form.Item 
                                name={['user', 'review_message']} 
                                label="评价（不能为空）"
                                rules={[{ required: true, message: 'review is required' }]}
                            >
                                <TextArea />
                            </Form.Item> */}
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
                        getCurrentPageData().map((review:any) => {
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