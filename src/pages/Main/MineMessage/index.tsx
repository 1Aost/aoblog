import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Button, message, Tooltip, Pagination, Space, Tag } from 'antd';
import { DeleteOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { timestampToTime } from '../../../api/utils';
import apiFun from '../../../api';
import "./index.css"
interface UserType {
    user: {
        id: number
        username: string
        password: string
        avatar: string
    }
}
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
interface ReviewType {
    id: number
    review_email: string
    review_message: string
    review_reply: string
    review_status: number
    review_time: string
    user_id1: number
}
const PageSize: number = 5; // 每页展示的数据条数
const MineMessage:React.FC=()=>{
    const [reviewsList,setReviewsList]=useState<Array<ReviewType>>([]);
    const {user}=useSelector((store: {user: UserType})=>store.user);
    const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
    const navigate=useNavigate();
    // 根据当前页码切片获取当前页要展示的数据
    const getCurrentPageData: () => Array<ReviewType> = (): Array<ReviewType> => {
        const startIndex: number = (currentPage - 1) * PageSize;
        const endIndex: number = startIndex + PageSize;
        return reviewsList.slice(startIndex, endIndex);
    };
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
    async function fetchReviews() {
        try {
            const res: MessageType=await apiFun.getReviewsById({id:user.id});
            if(res.code==='0000') {
                setReviewsList(res.data as Array<ReviewType>);
            }else {
                message.error(res.msg);
            }
        }catch(err) {
            message.error("出错了，请联系管理员");
        }
    }
    useEffect(()=>{
        if(user.id) {
            fetchReviews();
        }
    },[user])
    // 删除代码
    function handleDelete(id:number): () => void {
        return ()=>{
            apiFun.deleteReviews({id:id}).then((res: MessageType)=>{
                if(res.code==='0000') {
                    message.success(res.msg);
                    // 删除成功后重新获取数据
                    fetchReviews();
                }else {
                    message.error(res.msg);
                }
            })
        }
    }
    return (
        <div>
            <ul className='list'>
                {
                    getCurrentPageData().map((item: ReviewType)=>{
                        return (
                            <li key={item.id}>
                                <span className='message'>{item.review_message}</span>
                                <span className="reply">{item.review_reply!=='请期待管理员的回复'?"回复:"+item.review_reply:<Tag color={"cyan"}>{item.review_reply}</Tag>}</span>
                                <span className="time">发布时间：{timestampToTime(item.review_time,true)}</span>
                                <Space className='status' size={[0, 8]} wrap>
                                    {
                                        item.review_status===0?
                                        (
                                            <Tag icon={<CloseCircleOutlined />} color="error">
                                                未通过
                                            </Tag>
                                        ):
                                        (
                                            <Tag icon={<CheckCircleOutlined />} color="success">
                                                已通过
                                            </Tag>
                                        )
                                    }
                                </Space>
                                <Tooltip className='delete' title="delete">
                                    <Button onClick={handleDelete(item.id)} danger shape="circle" icon={<DeleteOutlined />} />
                                </Tooltip>
                            </li>
                        )
                    })
                }
            </ul>
            <Pagination
                defaultCurrent={1}
                total={reviewsList.length} // 这里设置总的数据条数
                pageSize={PageSize} // 每页展示的数据条数
                onChange={(page) => setCurrentPage(page)} // 监听页码变化
            />
        </div>
    )
}
export default MineMessage;