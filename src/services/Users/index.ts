import request from "../../api/request";

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
export async function getUserByToken(params: { token: string | null }): Promise<any> {
  return request.post("/users/bytoken", params);
}

// 修改用户
export async function changeUser(params: {
  id: number,
  username: string,
  password: string,
  avatar: string | undefined,
}): Promise<any> {
  return request.post("/users/oldtonew", params);
}

// 上传头像
export async function uploadAvatar(params: FormData): Promise<any> {
  return request.postImg("/api/Upload/avatar", params)
}

// 判断token是否失效
export async function LegalToken(params: { token: string | null }): Promise<any> {
  return request.post("/users/token", params);
}