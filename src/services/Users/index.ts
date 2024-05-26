import request from "../../api/request";

interface UserType {
  id: number
  username: string
  password: string
  avatar: string
}

export async function login(params: {
  username: string;
  password: string;
}): Promise<any> {
  return request.post("/api/token", params);
}

export async function register(params: {
  username: string;
  password: string;
}): Promise<any> {
  return request.post("/api/register", params);
}

// 根据token获取用户信息
export async function getUserByToken(params: { token: string }) {
  return request.post("/users/bytoken", params);
}

// 修改用户
export async function changeUser(params: UserType) {
  return request.post("/users/oldtonew", params);
}

// 上传头像
export async function uploadAvatar(params: FormData) {
  return request.postImg("/api/Upload/avatar", params)
}

// 判断token是否失效
export async function LegalToken(params: string) {
  return request.post("/users/token", params);
}