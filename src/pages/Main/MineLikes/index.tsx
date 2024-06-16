import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Empty, message, Pagination } from 'antd';
import {
  BookOutlined,
  LikeOutlined,
  MessageOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { changeId } from '../../../store/reducers/articleSlice';
import "./index.css"
import { LegalToken } from '../../../services/Users';
import { selectLikes } from '../../../services/Likes';
import { getBlogList } from '../../../services/Articles';
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
};
interface LikeType {
  article_id1: number
  article_name: string
  likes_id: number
  user_id2: number
};
interface UserType {
  user: {
    id: number
    username: string
    password: string
    avatar: string
  }
};
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const PageSize: number = 3; // 每页展示的数据条数

const MineLikes = () => {
  const [articleList, setArticleList] = useState<Array<ArticleType>>([]);
  const { user } = useSelector((store: { user: UserType }) => store.user);
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 根据当前页码切片获取当前页要展示的数据
  const getCurrentPageData: () => Array<ArticleType> = (): Array<ArticleType> => {
    const startIndex: number = (currentPage - 1) * PageSize;
    const endIndex: number = startIndex + PageSize;
    return articleList.slice(startIndex, endIndex);
  };
  useEffect(() => {
    LegalToken({ token: localStorage.getItem("token") }).then(res => {
      // 身份信息过期
      if (res.code === '1111') {
        message.warning(res.msg);
        navigate("/login");
        // localStorage.removeItem("token");
      } else if (res.code === '2222') {
        // 尚未登录
        message.warning(res.msg);
        navigate("/home");
      }
    }).catch(_err => {
      message.error("出错了，请联系管理员");
    });
  }, [navigate]);

  const fetchLikes = () => {
    selectLikes({ user_id: user.id }).then(res => {
      // setLikesList(res.data);
      fetchArticle(res.data as LikeType[]);
    }).catch(_err => {
      message.error("出错了，请联系管理员");
    });
  };
  const fetchArticle = (likesList: LikeType[]) => {
    getBlogList().then(res => {
      const filteredData: ArticleType[] = (res.data as Array<ArticleType>).filter((item: ArticleType) => {
        return likesList.some((likeItem: LikeType) => likeItem.article_id1 === item.id);
      });
      setArticleList(filteredData);
    })
  };
  useEffect(() => {
    user.id && fetchLikes();
  }, [user]);

  const handleClick = (id: number) => {
    return () => {
      dispatch(changeId(id));
      navigate(`/content/${id}`);
    }
  };

  return (
    <div>
      <ul className='list' style={{ padding: 10 }}>
        {
          articleList.length > 0 ?
            getCurrentPageData().map((article: ArticleType) => {
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
                    <img style={{ width: "100%" }} src={article.article_img} alt="" />
                  </div>
                </div>
              )
            }) : (
              <Empty />
            )
        }
      </ul>
      {articleList.length > 0 && (
        <Pagination
          defaultCurrent={1}
          total={articleList.length} // 这里设置总的数据条数
          pageSize={PageSize} // 每页展示的数据条数
          onChange={(page) => setCurrentPage(page)} // 监听页码变化
        />
      )}
    </div>
  )
}
export default MineLikes;