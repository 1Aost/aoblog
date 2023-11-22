import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message, Pagination } from 'antd';
import {BookOutlined, LikeOutlined, MessageOutlined, EyeOutlined} from '@ant-design/icons';
import {all, changeId} from "../../../store/reducers/articleSlice"
import MySlider from '../../../components/MySlider';
import apiFun from '../../../api';
import "../../../assets/font_style_cn.css"
import "./index.css"
interface ArticleMessageType {
    code: string
    msg: string
    data: Array<ArticleType> | null
}
interface ArticleType {
    article_img: string
    article_introduction: string
    article_likes: number
    article_reviews: number
    article_time: string
    article_title: string
    article_type: string
    article_url: string
    article_views: number
    comments_length: number
    id: number
}
const PageSize: number = 5; // 每页展示的数据条数
const MyContainer:React.FC=()=>{
    // 通过useDispatch分发时间
    const dispatch=useDispatch();
    const location = useLocation();
    const [articlesList,setArticlesList]=useState<Array<ArticleType>>([]);
    const navigate=useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
    // 根据当前页码切片获取当前页要展示的数据
    const getCurrentPageData: () => Array<ArticleType> = ():Array<ArticleType> => {
        const startIndex: number = (currentPage - 1) * PageSize;
        const endIndex: number = startIndex + PageSize;
        return articlesList.slice(startIndex, endIndex);
    };
    function handleClick(id:number): () => void {
        return ()=>{
            dispatch(changeId(id));
            navigate(`/content/${id}`);
        }
    }
    useEffect(()=>{
        async function fn1() {
            try {
                const search: string=location.search;
                if(search==="") {
                    const res: ArticleMessageType=await apiFun.getBlogList();
                    if(res.code==='0000') {
                        setArticlesList(res.data as Array<ArticleType>);
                        dispatch(all(res.data));
                    }else {
                        message.error(res.msg);
                    }
                }else {
                    let type: number=Number(search.split("?")[1].split("=")[1]);
                    try {
                        const res: ArticleMessageType=await apiFun.getBlogByType({type:type});
                        if(res.code==='0000') {
                            setArticlesList(res.data as Array<ArticleType>);
                        }else {
                            message.error(res.msg);
                        }
                    }catch(err) {
                        message.error("出错了，请联系管理员");
                    }
                }
            }catch(err) {
                message.error("出错了，请联系管理员");
            }
        }
        fn1();
    },[location.search]);
    return (
        <div className='container'>
            <div className="container-left">
                {
                    articlesList.length===0?
                    <div className="none">
                        <div className="img">
                            <img src="./images/OIP.jpg" alt="" />
                        </div>
                        <div className='content'>这里什么都没有</div>
                    </div>:
                    getCurrentPageData().map((article:ArticleType)=>{
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
                {
                    articlesList.length===0?
                    null:
                    <Pagination
                        defaultCurrent={1}
                        total={articlesList.length} // 这里设置总的数据条数
                        pageSize={PageSize} // 每页展示的数据条数
                        onChange={(page) => setCurrentPage(page)} // 监听页码变化
                    />
                }
                
            </div>
            <MySlider></MySlider>
        </div>
    )
}
export default MyContainer;
