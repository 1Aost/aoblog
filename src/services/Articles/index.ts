import request from "../../api/request";

// 获取文章列表
export async function getBlogList(headers?): Promise<any> {
  return request.get("/api/articles", { headers });
}

// 获取指定类型type的文章
export async function getBlogByType(params: {
  type: number
}): Promise<any> {
  return request.get("/api/articles/types", params);
}

// 获取指定id的文章
export async function getBlogById(params: {
  id: number,
}): Promise<any> {
  return request.get("/api/articles/getBlogById", params);
}

// 获取文章评论
export async function getComments(params: { article_id?: number, user_id?: number }): Promise<any> {
  return request.get("/api/articles/comments", params);
}

// 提交文章评论
export async function submitComments(params: {
  article_id: number,
  token: string | null,
  comments: string,
}): Promise<any> {
  return request.post("/api/articles/comments", params);
}

// 删除评论
export async function deleteComments(params: { comments_id: number }): Promise<any> {
  return request.delete("/api/articles/comments", params);
}

// 获取所有的分类
export async function getAllTypes(): Promise<any> {
  return request.get("/api/types/all");
}