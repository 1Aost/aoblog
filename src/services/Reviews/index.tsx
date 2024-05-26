import request from "../../api/request";

interface SubmitReviewType {
  review_message: string
  review_email: string
  token: string | null
}

// 获取所有留言
export async function getReviews() {
  return request.get("/api/reviews");
}
// 根据id获取留言
export async function getReviewsById(params: { id: number }) {
  return request.get("/api/reviews/reviewsbyid", params);
}
// 根据id删除留言
export async function deleteReviews(params: { id: number }) {
  return request.get("/api/reviews/noreview", params);
}
// 提交留言
export async function submitReview(params: SubmitReviewType) {
  return request.post("/api/reviews/newreview", params);
}