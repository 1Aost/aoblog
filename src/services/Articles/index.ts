import request from "../../api/request";

// 获取文章列表
export async function getBlogList(headers?): Promise<any> {
  return request.get("/api/articles/all", { headers });
}

// 获取指定类型type的文章
export async function getBlogByType(params: {
  type: number
}): Promise<any> {
  return request.get("/api/articles/types", params);
}

// 获取指定id的文章并同时修改访问人数
export async function getBlogAndChangePeople(params: {
  id: number,
}): Promise<any> {
  return request.get("/api/articles/some", params);
}

// 根据指定的id修改文章的点赞人数
export async function changeLikes(params): Promise<any> {
  return request.get("/api/articles/likes", params)
}

// 根据文章的id获取所有评论
export async function getComments(params: { id: number }): Promise<any> {
  return request.get("/api/articles/comments", params);
}

// 根据文章的id以及用户id提交文章评论
export async function submitComments(params: {
  article_id: number,
  token: string | null,
  comments: string,
}): Promise<any> {
  return request.post("/api/articles/newcomments", params);
}

// 获取所有的分类
export async function getAllTypes(): Promise<any> {
  return request.get("/api/types/all");
}