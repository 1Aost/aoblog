import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import {change} from "../../store/reducers/userSlice"
import { Button, message, Tooltip, Pagination, Space, Tag } from 'antd';
import { DeleteOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import apiFun from '../../../api';
import { timestampToTime } from '../../../api/utils';
import "./index.css"
import { useNavigate } from 'react-router-dom';

const PageSize = 5; // 每页展示的数据条数
const MineComments:React.FC=()=>{
    const [commentsList,setCommentsList]=useState([]);
    const {user}=useSelector((store:any)=>store.user);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const navigate=useNavigate();
    // 根据当前页码切片获取当前页要展示的数据
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * PageSize;
        const endIndex = startIndex + PageSize;
        return commentsList.slice(startIndex, endIndex);
    };
    function fetchComments() {
        apiFun.getCommentsById({id:user.id}).then((res:any)=>{
            if(res.code==='0000') {
                setCommentsList(res.data);
            }else {
                message.error(res.msg);
            }
        })
    }
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
    useEffect(()=>{
        if(user.id) {
            fetchComments();
        }
    },[user])
    // 删除代码
    function handleDelete(id:number) {
        return ()=>{
            apiFun.deleteComments({comments_id:id}).then((res:any)=>{
                if(res.code==='0000') {
                    message.success(res.msg);
                    // 删除成功后重新获取数据
                    fetchComments();
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
                            <li key={item.comments_id}>
                                <span className='message'>{item.comments}</span>
                                <span className="reply">{item.comments_reply!=='请期待管理员的回复'?"回复:"+item.comments_reply:<Tag color={"green"}>{item.comments_reply}</Tag>}</span>
                                <span className="time">发布时间：{timestampToTime(item.comments_time,true)}</span>
                                <Space className='status' size={[0, 8]} wrap>
                                    <Tag color={"cyan"}>{item.article_name}</Tag>
                                    {
                                        item.comments_status===0?
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
                                    <Button onClick={handleDelete(item.comments_id)} danger shape="circle" icon={<DeleteOutlined />} />
                                </Tooltip>
                            </li>
                        )
                    })
                }
            </ul>
            <Pagination
                defaultCurrent={1}
                total={commentsList.length} // 这里设置总的数据条数
                pageSize={PageSize} // 每页展示的数据条数
                onChange={(page) => setCurrentPage(page)} // 监听页码变化
            />
        </div>
    )
}
export default MineComments;