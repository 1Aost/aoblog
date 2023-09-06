import React, { useEffect, useState } from 'react'
import "./index.css"
import { Button, message, Tooltip, Pagination, Space, Tag } from 'antd';
import { DeleteOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import apiFun from '../../../api';
import { useSelector } from 'react-redux'
import { timestampToTime } from '../../../api/utils';
import { useNavigate } from 'react-router-dom';
const PageSize = 5; // 每页展示的数据条数
const MineMessage:React.FC=()=>{
    const [reviewsList,setReviewsList]=useState([]);
    const {user}=useSelector((store:any)=>store.user);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const navigate=useNavigate();
    // 根据当前页码切片获取当前页要展示的数据
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * PageSize;
        const endIndex = startIndex + PageSize;
        return reviewsList.slice(startIndex, endIndex);
    };
    useEffect(()=>{
        const token=localStorage.getItem("token");
        apiFun.LegalToken({token:token}).then((res:any)=>{
            if(res.code==='1111') {
                message.warning(res.msg);
                // localStorage.removeItem("token");
                navigate("/login");
            }else if(res.code==='2222') {
                message.warning(res.msg);
                navigate("/home");
            }
        })
    },[navigate])
    /* async function fetchData() {
        let token=localStorage.getItem("token");
        await apiFun.getUserByToken({token:token}).then((res:any)=>{
            if(res.code==='0000') {
                setUser(res.data[0]);
                console.log(user);
                
            }else if(res.code==='1111') {
                message.error(res.msg);
                navigate("/login");
            }else {
                message.error(res.msg);
            }
        })
        console.log(user);
    } */
    function fetchReviews() {
        apiFun.getReviewsById({id:user.id}).then((res:any)=>{
            if(res.code==='0000') {
                setReviewsList(res.data);
            }else {
                message.error(res.msg);
            }
        })
    }
    useEffect(()=>{
        if(user.id) {
            fetchReviews();
        }
    },[user])
    // 删除代码
    function handleDelete(id:number) {
        return ()=>{
            apiFun.deleteReviews({id:id}).then((res:any)=>{
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
                    getCurrentPageData().map((item:any)=>{
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