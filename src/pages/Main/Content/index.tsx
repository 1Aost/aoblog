import React, { useEffect, useState } from 'react';
import { LikeOutlined, MessageOutlined } from "@ant-design/icons"
import ReactMarkdown from 'react-markdown';//引入
import MarkNav from 'markdown-navbar'
import remarkGfm from 'remark-gfm';// 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw'// 解析标签，支持html语法
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
//高亮的主题，还有很多别的主题，可以自行选择
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import 'github-markdown-css';
import 'markdown-navbar/dist/navbar.css'
import "./index.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import apiFun from '../../../api';
import { Button, Form, Input, message, Modal,Pagination } from 'antd';
import { timestampToTime } from '../../../api/utils';
import { useDispatch, useSelector } from 'react-redux';
import { all } from '../../../store/reducers/articleSlice';

type myObj = {
    id:Number,
    article_url:string,
    article_img:string,
    article_type:number,
    article_likes:number
}
const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 },
};
const {TextArea}=Input;
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
const Content:React.FC=()=>{
    const [form]=Form.useForm();
    const [comments,setComments]=useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    // 根据当前页码切片获取当前页要展示的数据
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * PageSize;
        const endIndex = startIndex + PageSize;
        return comments.slice(startIndex, endIndex);
    };
    const {id}=useParams();
    const [open, setOpen] = useState(false);
    const [mdContent,setMdContent]=useState<string>('');
    const {user}=useSelector((store:any)=>store.user);
    const {articleList}=useSelector((store:any)=>store.article);
    const newArticleList=articleList;
    const [isLiked,setIsLiked]=useState<boolean>(false);
    const navigate=useNavigate();
    const location=useLocation();
    const dispatch=useDispatch();
    const [article,setArticle]=useState<myObj>({
        id:0,
        article_url:"",
        article_img:"",
        article_type:-1,
        article_likes:0
    });
    useEffect(()=>{
        const article_id=Number(location.pathname.split("/")[2]);
        // 查询判断当前用户是否点赞
        apiFun.selectLikes({article_id:article_id,user_id:user.id}).then((res:any)=>{
            if(res.code==='0000') {
                if(res.data.length===0) {
                    setIsLiked(false);
                }else {
                    setIsLiked(true);
                }
            }else {
                message.error(res.msg);
            }
            
        })
    },[isLiked,location.pathname,user.id])
    // 注意：问题解决：页面在加载时并不显示内容以及请求发送了两次的问题
    useEffect(() => {
        async function fn() {
            await apiFun.getBlog1({id:id}).then((res:any)=>{
                setArticle(res.data[0]);
            })
        }
        fn();
    },[id]);
    useEffect(()=>{
        if(article.article_url) {
            // url是markdown文件的路径
            fetch(article.article_url)
            .then(res => {
                if(!res.ok) {
                    throw new Error('Network response was not ok'); // 处理HTTP请求错误
                }
                return res.text()
            })
            .then(text => setMdContent(text))
            .catch(error => console.error('Error fetching markdown:', error));
        }
    },[article.article_url]);
    const handleLike=async ()=>{
        const token=localStorage.getItem("token");
        apiFun.LegalToken({token:token}).then((res:any)=>{
            if(res.code==='1111') {
                message.warning(res.msg);
                navigate("/login");
                // localStorage.removeItem("token");
            }else if(res.code==='2222') {
                message.warning("尚未登录");
            }else {
                const article_id=Number(location.pathname.split("/")[2]);
                // 通过临时变量保存更新后的值
                const updatedIsLiked = !isLiked;
                setIsLiked(updatedIsLiked);
                if(updatedIsLiked) {
                    // 新增likes
                    apiFun.submitLikes({article_id:article_id,user_id:user.id}).then((res:any)=>{
                        if(res.code==='0000') {
                            // dispatch(all({...articleList,}))
                            // newArticleList.map((item:any)=>{
                            //     if(item.id===article.id) {
                            //         item.article
                            //     }
                            // })
                        }else {
                            message.error(res.msg);
                        }
                    })
                }else {
                    // 删除likes
                    apiFun.deleteLikes({article_id:article_id,user_id:user.id}).then((res:any)=>{
                        if(res.code==='0000') {

                        }else {
                            message.error(res.msg);
                        }
                    })
                }
            }
        })
    }
    const onFinish = (values: any) => {
        const {comments}=values.user;
        console.log(article.id);
        apiFun.submitComments({article_id:article.id,token:localStorage.getItem("token"),comments:comments}).then((res:any)=>{
            if(res.code==='0000') {
                message.success("提交留言成功,请等待管理员的审核");
                // 只展示已通过的评论
                const reviewData=res.data.filter((item:any)=>{
                    return item.comments_status===1;
                })
                setComments(reviewData);  
                setTimeout(()=>{
                    message.destroy();
                    form.resetFields();
                },1000)
            }else if(res.code==='1111') {
                message.warning(res.msg);
                navigate("/login")
            }else {
                message.error(res.msg);
                setTimeout(()=>{
                    message.destroy()
                },1000)
            }
        })
    };
    function handleOpen() {
        if(!localStorage.getItem("token")) {
            message.warning("尚未登录");
        }else {
            apiFun.getComments({id:article.id}).then((res:any)=>{
                // 只展示已通过的评论
                const reviewData=res.data.filter((item:any)=>{
                    return item.comments_status===1;
                })
                setComments(reviewData);
            })
            setOpen(true);
        }
    }
    return(
        <div className='article-content'>
            <div className='article-content-left'>
                <div className="markNav-title sidebar-title">文章目录</div>
                {/* 使用一个滚动容器来包裹 MarkNav 组件 */}
                {/* <div className='article-menu' ref={articleMenuRef}> */}
                    <MarkNav
                        className='md-navbar'
                        source={mdContent}
                        // 是否要编号
                        ordered={false}
                        headingTopOffset={80}
                    />
                {/* </div> */}
            </div>
            <div className="article-content-right">
                <ReactMarkdown
                    className='markdown-body'
                    children={mdContent}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        // // 使用自定义的图片组件
                        // img:ImageRenderer,
                        // 处理代码高亮
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={tomorrow}
                                    language={match[1]}
                                    PreTag="div"
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />
                {/* <a href="#top" className="icon icon1"><UpCircleTwoTone /></a>
                <a href="#bottom" className="icon icon2"><DownCircleTwoTone /></a> */}
            </div>
            <div className="some">
                <div className="like font-style" onClick={handleLike} style={isLiked?{color: "#42b983"}:{}}>
                    <LikeOutlined/>
                    {/* {article.article_likes} */}
                </div>
                <div className="mess font-style"  style={open?{color: "#42b983"}:{}}>
                    <MessageOutlined onClick={handleOpen}/>
                    <Modal
                        title="所有评论"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                    >
                        <div className="board-left">
                            <div className='card'>
                                <div className="card-content">
                                    <Form
                                        {...layout}
                                        name="nest-messages"
                                        onFinish={onFinish}
                                        style={{ maxWidth: 1000,width:1000 }}
                                        validateMessages={validateMessages}
                                        form={form}
                                    >
                                        <Form.Item name={['user', 'comments']} label="评价（不能为空）">
                                            <TextArea style={{height: 100}} />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                            <Button type="primary" htmlType="submit">
                                                提交评论
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                            <div className='card-mess'>
                                <div className="card-top">
                                    <h2>评论</h2>
                                </div>
                                {
                                    getCurrentPageData().map((comment:any) => {
                                        return (
                                            <div key={comment.comments_id} className="card-message font-style" style={{borderBottom:"1px solid #ddd",marginBottom:"10px"}}>
                                                <div className="c-content" style={{display: 'flex',flexDirection:"column",paddingLeft:"10px"}}>
                                                    <div className="cc-1" style={{display: 'flex',paddingLeft:"10px"}}>
                                                        <div className="cc-title" style={{color: "#42b983",marginRight:"10px"}}>{comment.user_name}</div>
                                                        <div className="cc-time">{timestampToTime(comment.comments_time, true)}</div>
                                                    </div>
                                                    <div className="cc-2" style={{paddingLeft:"10px"}}>{comment.comments}</div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <Pagination
                                defaultCurrent={1}
                                total={comments.length} // 这里设置总的数据条数
                                pageSize={PageSize} // 每页展示的数据条数
                                onChange={(page) => setCurrentPage(page)} // 监听页码变化
                            />
                        </div>
                    </Modal>
                </div>
            </div>            
        </div>
    )
}
export default Content;