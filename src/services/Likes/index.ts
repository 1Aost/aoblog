import request from "../../api/request";


export async function submitLikes(params: { article_id: number, user_id: number }) {
  return request.post("/api/likes/new", params);
}
export async function selectLikes(params: { article_id: number, user_id: number }) {
  return request.post("/api/likes/search", params);
}
export async function deleteLikes(params: { article_id: number, user_id: number }) {
  return request.post("/api/likes/no", params);
}
export async function selectLikesByUserId(params: { id: number }) {
  return request.post("/api/likes/searchbyuserid", params);
}
