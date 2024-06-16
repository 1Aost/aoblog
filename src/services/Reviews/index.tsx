import request from "../../api/request";

interface SubmitReviewType {
  review_message: string
  review_email: string
  token: string | null
}

// 获取所有留言
export async function getReviews(): Promise<any> {
  return request.get("/api/reviews");
}
// 根据id获取留言
export async function getReviewsById(params: { id: number }): Promise<any> {
  return request.get("/api/reviews/reviewsById", params);
}
// 根据id删除留言
export async function deleteReviews(params: { id: any }): Promise<any> {
  return request.delete("/api/reviews", params);
}
// 提交留言
export async function submitReview(params: SubmitReviewType): Promise<any> {
  return request.post("/api/reviews", params);
}