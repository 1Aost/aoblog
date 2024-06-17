import request from "../../api/request";

export async function login(params: {
  username: string;
  password: string;
}): Promise<any> {
  return request.post("/api/users/login", params);
}

export async function register(params: {
  username: string;
  password: string;
}): Promise<any> {
  return request.post("/api/users/register", params);
}

// 根据token获取用户信息
export async function getUserByToken(params: { token: string | null }): Promise<any> {
  return request.post("/api/users/bytoken", params);
}

// 修改用户
export async function changeUser(params: {
  id: number,
  username: string,
  password: string,
  avatar: string | undefined,
}): Promise<any> {
  return request.put("/api/users", params);
}

// 判断token是否失效
export async function LegalToken(params: { token: string | null }): Promise<any> {
  return request.post("/api/users/tokenStatus", params);
}