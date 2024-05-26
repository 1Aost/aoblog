import request from "../../api/request";

// 根据用户id获取评论
export async function getCommentsById(params: { id: number }): Promise<any> {
  return request.get("/api/articles/commentsbyid", params);
}

// 根据id删除评论
export async function deleteComments(params: { comments_id: number }): Promise<any> {
  return request.get("/api/articles/nocomment", params);
}