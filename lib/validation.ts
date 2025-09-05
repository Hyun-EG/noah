import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(6, "아이디를 입력해주세요"),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
});
