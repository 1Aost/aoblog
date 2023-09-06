import React from 'react'
import { 
    GithubOutlined, 
    TwitterOutlined,
    WeiboCircleOutlined,
    YoutubeOutlined,
    InstagramOutlined
} from "@ant-design/icons"
import MySlider from '../../../components/MySlider';
import "./index.css"
const About:React.FC=()=>{
    return (
        <div className='about'>
            <div className="about-left font-style">
                <div className="content">&nbsp;&nbsp;&nbsp;该网站是我的个人博客网站，成功实现各种功能，
                包括博客的展示，留言板的实现，markdown格式文章的展示，用户的登陆注册功能，以及博客的留言和点赞功能。</div>
                <div className="content">希望大家喜欢，有任何问题欢迎邮箱交流：499443716@qq.com</div>
                <div className="icons">
                    <span>友情链接：</span>
                    <a href='https://github.com/' target="_blank" ><GithubOutlined /></a>
                    <a href='https://twitter.com/?lang=zh' target="_blank" ><TwitterOutlined /></a>
                    <a href='https://weibo.com/' target="_blank" ><WeiboCircleOutlined /></a>
                    <a href='https://www.youtube.com/' target="_blank" ><YoutubeOutlined /></a>
                    <a href='https://www.instagram.com/' target="_blank" ><InstagramOutlined /></a>
                </div>
                <div className="ye">
                    <img src="./images/ye.jpg" alt="" />
                </div>
            </div>
            <MySlider></MySlider>

        </div>
    )
}
export default About;