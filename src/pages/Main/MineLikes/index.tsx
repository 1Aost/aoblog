import React, { useEffect, useState } from 'react'
import "./index.css"
import { message, Pagination } from 'antd';
import apiFun from '../../../api';
import {
    BookOutlined,
    LikeOutlined,
    MessageOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { changeId } from '../../../store/reducers/articleSlice';
const PageSize = 3; // 每页展示的数据条数
const MineLikes:React.FC=()=>{
    // const [likesList,setLikesList]=useState([]);
    const [articleList,setArticleList]=useState([]);
    const {user}=useSelector((store:any)=>store.user);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // 根据当前页码切片获取当前页要展示的数据
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * PageSize;
        const endIndex = startIndex + PageSize;
        return articleList.slice(startIndex, endIndex);
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
    function fetchLikes() {
        apiFun.selectLikesByUserId({id:user.id}).then((res:any)=>{
            if(res.code==='0000') {
                // setLikesList(res.data);
                fetchArticle(res.data);
            }else {
                message.error(res.msg);
            }
        })
    }
    function fetchArticle(likesList:any) {
        apiFun.getBlogList().then((res:any)=>{
            const filteredData = res.data.filter((item: any) => {
                return likesList.some((likeItem: any) => likeItem.article_id1 === item.id);
            });
            setArticleList(filteredData);
        })
    }
    useEffect(()=>{
        if(user.id) {
            fetchLikes();
        }
    },[user])
    function handleClick(id:Number) {
        return ()=>{
            dispatch(changeId(id));
            navigate(`/content/${id}`);
        }
    }
    return (
        <div>
            <ul className='list'>
                {
                    getCurrentPageData().map((article:any)=>{
                        return (
                            <div key={article.id} className='card' onClick={handleClick(article.id)}>
                                <div className="card-left">
                                    <h2 className='title'>{article.article_title}</h2>
                                    <div className='card-content'>&nbsp;&nbsp;{article.article_introduction}</div>
                                    <div className='bottom'>
                                        <span className='font-style'>
                                            <BookOutlined />{
                                                // fn1(article.article_type)
                                                article.article_type
                                            }
                                        </span>
                                        {/* <HeartOutlined /> */}
                                        <span className='font-style'>
                                            <LikeOutlined />{article.article_likes}
                                        </span>
                                        <span className='font-style'>
                                            <MessageOutlined />{article.comments_length}
                                        </span>
                                        <span className='font-style'>
                                            <EyeOutlined />{article.article_views}
                                        </span>
                                    </div>
                                </div>
                                <div className="card-right">
                                    <img style={{width:"100%"}} src={article.article_img} alt="" />
                                </div>
                            </div>
                        )
                    })
                }
            </ul>
            <Pagination
                defaultCurrent={1}
                total={articleList.length} // 这里设置总的数据条数
                pageSize={PageSize} // 每页展示的数据条数
                onChange={(page) => setCurrentPage(page)} // 监听页码变化
            />
        </div>
    )
}
export default MineLikes;