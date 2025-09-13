import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { connectDB } from "./connectDB";

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

// 비밀번호 일치 체크
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// 액세스 토큰 생성
export function generateAccessToken(payload: {
  userId: string;
  email: string;
}): string {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
    issuer: "kali",
  });
}

// 리프레시 토큰 생성
export function generateRefreshToken(payload: {
  userId: string;
  email: string;
}): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "1d",
    issuer: "kali",
  });
}

// CSRF토큰 생성
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// 액세스 토큰 검증
export function verifyAccessToken(
  token: string
): { userId: string; email: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      userId: string;
      email: string;
    };
  } catch (error) {
    return null;
  }
}

// 리프레시 토큰 검증
export function verifyRefreshToken(
  token: string
): { userId: string; email: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      userId: string;
      email: string;
    };
  } catch (error) {
    return null;
  }
}

// db에 리프레시 토큰 저장 ( userId, refreshToken )
export async function saveRefreshToken(
  userId: string,
  refreshToken: string
): Promise<void> {
  const client = await connectDB();
  const db = client.db();
  const tokens = db.collection("refresh_tokens");

  await tokens.deleteMany({ userId });
  await tokens.insertOne({
    userId,
    refreshToken,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
}

// 리프레시 토큰 검증 및 사용자 정보 반환
export async function verifyAndGetUserFromRefreshToken(
  refreshToken: string
): Promise<{ userId: string; email: string } | null> {
  try {
    // 1. 토큰 자체 검증
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) return null;

    // 2. 데이터베이스에서 토큰 존재 확인
    const client = await connectDB();
    const db = client.db();
    const tokens = db.collection("refresh_tokens");

    const tokenDoc = await tokens.findOne({
      userId: payload.userId,
      refreshToken,
    });

    if (!tokenDoc) return null;

    // 3. 만료 시간 확인
    if (new Date() > tokenDoc.expiresAt) {
      await tokens.deleteOne({ _id: tokenDoc._id });
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

// 리프레시 토큰 삭제
export async function deleteRefreshToken(userId: string): Promise<void> {
  const client = await connectDB();
  const db = client.db();
  const tokens = db.collection("refresh_tokens");

  await tokens.deleteMany({ userId });
}
