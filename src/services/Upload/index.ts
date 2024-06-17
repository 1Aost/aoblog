import request from "../../api/request";

// 上传头像
export async function uploadAvatar(params: FormData): Promise<any> {
  return request.postImg("/api/Upload/avatar", params)
}