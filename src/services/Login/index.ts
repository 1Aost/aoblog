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