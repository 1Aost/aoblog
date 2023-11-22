// 引入刚才的http.js文件
import https from './request';	
// 设置个对象，就不用一个个暴露了，直接暴露对象
interface MyObject {
	[key: string]: any;
}
interface UserMessage {
	username: string
	password: string
}
let apiFun :MyObject={};
/* 登录 */
apiFun.login=function(params: UserMessage) {
	return https.post("/api/token",params);
}
/* 注册 */
apiFun.register=function(params: UserMessage) {
	return https.post("/api/register",params);
}


/* 获取文章列表 */
apiFun.getBlogList=function() {
	return https.get("/api/articles/all");
}
/* 获取指定类型type的文章 */
apiFun.getBlogByType=function(params:{type: number}) {
	return https.get("/api/articles/types",params);
}
/* 获取指定id的文章并同时修改访问人数 */
apiFun.getBlog1=function(params: {id: number}) {
	return https.get("/api/articles/some",params);
}
/* 根据指定的id修改文章的点赞人数 */
apiFun.changeLikes=function(params:any) {
	return https.get("/api/articles/likes",params);
}
/* 根据文章的id获取所有评论 */
apiFun.getComments=function(params: {id: number}) {
	return https.get("/api/articles/comments",params);
}
/* 根据文章的id以及用户id提交文章评论 */
apiFun.submitComments=function(params: {article_id: number,token: string,comments: string}) {
	return https.post("/api/articles/newcomments",params);
}
/* 获取所有的分类 */
apiFun.getAllTypes=function() {
	return https.get("/api/types/all");
}
/* 根据用户id获取评论 */
apiFun.getCommentsById=function(params: {id: number}) {
	return https.get("/api/articles/commentsbyid",params);
}
/* 根据id删除评论 */
apiFun.deleteComments=function(params: {comments_id: number}) {
	return https.get("/api/articles/nocomment",params);
}
interface SubmitReviewType {
	review_message: string
	review_email: string
	token: string | null
}

/* 获取所有留言 */
apiFun.getReviews=function() {
	return https.get("/api/reviews");
}
/* 根据id获取留言 */
apiFun.getReviewsById=function(params: {id: number}) {
	return https.get("/api/reviews/reviewsbyid",params);
}
/* 根据id删除留言 */
apiFun.deleteReviews=function(params: {id: number}) {
	return https.get("/api/reviews/noreview",params);
}
/* 提交留言 */
apiFun.submitReview=function(params: SubmitReviewType) {
	return https.post("/api/reviews/newreview",params);
}
/* 根据token获取用户信息 */
apiFun.getUserByToken=function(params: {token: string}) {
	return https.post("/users/bytoken",params);
}
interface UserType {
	id: number
	username: string
	password: string
	avatar: string
}
/* 修改用户 */
apiFun.changeUser=function(params: UserType) {
	return https.post("/users/oldtonew",params);
}
/* 上传头像 */
apiFun.uploadAvatar=function(params: FormData) {
	return https.postImg("/api/Upload/avatar",params)
}
/* 判断token是否失效 */
apiFun.LegalToken=function(params: string) {
	return https.post("/users/token",params);
}

apiFun.submitLikes=function(params: {article_id: number,user_id: number}) {
	return https.post("/api/likes/new",params);
}
apiFun.selectLikes=function(params: {article_id: number,user_id: number}) {
	return https.post("/api/likes/search",params);
}
apiFun.deleteLikes=function(params: {article_id: number,user_id: number}) {
	return https.post("/api/likes/no",params);
}
apiFun.selectLikesByUserId=function(params: {id: number}) {
	return https.post("/api/likes/searchbyuserid",params);
}
//暴露出这个对象
export default apiFun;