import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BookOutlined, BarsOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { changetype } from "../../store/reducers/articleSlice"
import "./index.css"
interface ArticleType {
  articleList: Array<ArticleMessType>
}
interface ArticleMessType {
  id: number
  article_url: string
  article_img: string
  article_type: string
  article_likes: number
  article_views: number
  article_reviews: number
  article_title: string
  article_introduction: string
  article_time: string
  comments_length: number
}
const MySlider = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [article, setArticle] = useState([
    { type: 0, name: "前端基础", total: 0 },
    { type: 1, name: "前端进阶", total: 0 },
    { type: 2, name: "前端八股文", total: 0 },
    { type: 3, name: "算法", total: 0 },
  ])
  let allarticlesList: Array<ArticleMessType> = [];
  const { articleList } = useSelector((store: { article: ArticleType }) => store.article);
  allarticlesList = articleList;
  // 根据浏览量排序
  // 从 Redux 中获取的状态，是一个只读的数组，不能直接对其进行修改或排序。
  /* const hotarticle=articleList.sort((a,b)=>{
      return b.article_views-a.article_views
  }).slice(0,3) */
  const hotarticle: Array<ArticleMessType> = articleList.slice().sort((a: any, b: any) => {
    return b.article_views - a.article_views;
  }).slice(0, 3);

  const handleType = (record: {
    type: number;
    name: string;
    total: number;
  }): () => void => {
    return () => {
      naviagte("/home?type=" + record.type);
      message.success("查询成功");
    }
  }
  useEffect(() => {
    const newArticle = [
      { type: 0, name: "前端基础", total: 0 },
      { type: 1, name: "前端进阶", total: 0 },
      { type: 2, name: "前端八股文", total: 0 },
      { type: 3, name: "算法", total: 0 },
    ];
    allarticlesList.forEach((item: ArticleMessType) => {
      if (item.article_type === '前端基础') newArticle[0].total += 1;
      else if (item.article_type === '前端进阶') newArticle[1].total += 1;
      else if (item.article_type === '前端八股文') newArticle[2].total += 1;
      else if (item.article_type === '算法') newArticle[3].total += 1;
    });
    setArticle(newArticle);
    // 放入articleSlice中
    dispatch((changetype(newArticle)))
    // })
  }, [])
  // 右侧点击排行榜跳转至专门内容区域
  function handleClick(id: number): () => void {
    return () => {
      naviagte(`/content/${id}`);
    }
  }
  return (
    <div className="container-right font-style">
      <div className="container-right-top">
        <div className="avtar"></div>
        <div className="motto">你好珍贵的人</div>
        <div className="content">
          &nbsp;&nbsp;&nbsp;&nbsp;Hi，我是Ao,<br></br>欢迎来到我的个人博客
          <br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AoBlog
        </div>
        <div className="btns">
          <button>
            <a target="_blank" href="https://github.com/1Aost" className='font-style' rel="noreferrer">GitHub</a>
          </button>
        </div>
      </div>
      <div className="container-right-center">
        <div className="r-top">
          <BookOutlined />&nbsp;个人博客
        </div>
        <ul className="r-content">
          {
            hotarticle.map((item: ArticleMessType) => {
              return (
                <li onClick={handleClick(item.id)} key={item.id}>
                  {item.article_title}
                  <span>{item.article_views}人看过</span>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="container-right-bottom">
        <div className="r-top">
          <BarsOutlined />&nbsp;分类
        </div>
        <ul className="r-content">
          {
            article.map((item: {
              type: number;
              name: string;
              total: number;
            }) => {
              return (
                <li onClick={handleType(item)} key={item.name}>
                  {item.name}
                  <span>{item.total}</span>
                </li>
              )
            })

          }
        </ul>
      </div>
    </div>
  )
}
export default MySlider;