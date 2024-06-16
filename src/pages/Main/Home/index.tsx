import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBlogByType, getBlogList } from '../../../services/Articles';
import { Empty, Pagination } from 'antd';
import { BookOutlined, LikeOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { all, changeId } from "../../../store/reducers/articleSlice"
import MySlider from '../../../components/MySlider';
import "../../../assets/font_style_cn.css"
import "./index.css"
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
// const operations = {
//   article_type: { value: 'article_type', component: <BookOutlined /> },
//   article_likes: { value: 'article_likes', component: <LikeOutlined /> },
//   comments_length: { value: 'comments_length', component: <MessageOutlined /> },
//   article_views: { value: 'article_views', component: <EyeOutlined /> },
// };

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const PageSize: number = 5; // 每页展示的数据条数
const MyContainer = () => {
  // 通过useDispatch分发时间
  const dispatch = useDispatch();
  const location = useLocation();
  const [articlesList, setArticlesList] = useState<Array<ArticleType>>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
  // 根据当前页码切片获取当前页要展示的数据
  const getCurrentPageData = (): Array<ArticleType> => {
    const startIndex: number = (currentPage - 1) * PageSize;
    const endIndex: number = startIndex + PageSize;
    return articlesList.slice(startIndex, endIndex);
  };
  const handleClick = (id: number) => {
    return () => {
      dispatch(changeId(id));
      navigate(`/content/${id}`);
    }
  }
  useEffect(() => {
    const search: string = location.search;
    if (search === "") {
      getBlogList().then(res => {
        setArticlesList(res.data as Array<ArticleType>);
        dispatch(all(res.data));
      })
    } else {
      const type = Number(search.split("?")[1].split("=")[1]);
      getBlogByType({ type: type }).then(res => {
        setArticlesList(res.data as Array<ArticleType>);
      })
    }
  }, [location.search]);
  return (
    <div className='container'>
      <div className="container-left">
        {
          articlesList.length === 0 ? <Empty /> :
            getCurrentPageData().map((article: ArticleType) => {
              return (
                <div key={article.id} className='card' onClick={handleClick(article.id)}>
                  <div className="card-left">
                    <h2 className='title'>{article.article_title}</h2>
                    <div className='card-content'>&nbsp;&nbsp;{article.article_introduction}</div>
                    <div className='bottom'>
                      <span className='font-style'>
                        <BookOutlined />{article.article_type}
                      </span>
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
                    <img style={{ width: "100%" }} src={article.article_img} alt="" />
                  </div>
                </div>
              )
            })
        }
        {
          articlesList.length === 0 ? null :
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
