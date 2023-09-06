import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import {BookOutlined, LikeOutlined, MessageOutlined, EyeOutlined} from '@ant-design/icons';
import {all, changeId} from "../../../store/reducers/articleSlice"
import MySlider from '../../../components/MySlider';
import apiFun from '../../../api';
import "../../../assets/font_style_cn.css"
import "./index.css"
const PageSize = 5; // 每页展示的数据条数
const MyContainer:React.FC=()=>{
    // 通过useDispatch分发时间
    const dispatch=useDispatch();
    const location = useLocation();
    const [articlesList,setArticlesList]=useState<any>([]);
    /* const [reviews,setReviews]=useState<any>([]);
    let reviews: any[]=[]; */
    const navigate=useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    // 根据当前页码切片获取当前页要展示的数据
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * PageSize;
        const endIndex = startIndex + PageSize;
        return articlesList.slice(startIndex, endIndex);
    };
    const {articleList}=useSelector((store:any)=>store.article);
    function handleClick(id:Number) {
        return ()=>{
            dispatch(changeId(id));
            navigate(`/content/${id}`);
        }
    }
    useEffect(()=>{
        async function fn1() {
            const search=location.search;
            if(search==="") {
                apiFun.getBlogList().then((res:any)=>{
                    if(res.code==='0000') {
                        setArticlesList(res.data);
                        dispatch(all(res.data));
                    }
                })
            }else {
                let type=Number(search.split("?")[1].split("=")[1]);
                await apiFun.getBlogByType({type:type}).then((res:any)=>{
                    setArticlesList(res.data);
                    // dispatch(all(articlesList));
                })
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
