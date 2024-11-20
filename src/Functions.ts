import { Response } from "express";
import dotenv from "dotenv";
import type { Student } from "./Interfaces";

dotenv.config();
export const undefinedStudent: Student[] = [{ id: -1, name: "", credits: 0 }];

// Whitelist of allowed origins for backend
export const backendWhitelist: string[] = [
  `${process.env.PROXYURL}:${process.env.PROXYPORT}`,
];

// Function for checking if the request is from a whitelisted origin
export function isOriginAllowed(origin: string, whitelist: string[]): boolean {
  return whitelist.indexOf(origin) !== -1;
}

// Function for setting headers for CORS
export function setHeaders(res: Response, origin: string): void {
  res.header("Access-Control-Allow-Origin", origin);
}
