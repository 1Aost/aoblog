import request from "../../api/request";

// 点赞
export async function submitLikes(params: { article_id: number, user_id: number }): Promise<any> {
  return request.post("/api/likes", params);
}

// 取消点赞
export async function deleteLikes(params: { article_id: number, user_id: number }): Promise<any> {
  return request.delete("/api/likes", params);
}

// 查找点赞信息
export async function selectLikes(params: { article_id?: number, user_id?: number }): Promise<any> {
  return request.get("/api/likes", params);
}