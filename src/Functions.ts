import express, { response, Response } from "express";
import path from "path";
import fs, { PathOrFileDescriptor } from "fs";
import dotenv from "dotenv";
import type { Student } from "./Interfaces";

dotenv.config();
const pathToFile: string = process.env.DATAFILEPATH || "";
export const undefinedStudent: Student = { id: -1, name: "", credits: 0 };

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

// Function for handling file, file path, path descriptor, and file system operations
export function fileOperations(): Student[] | Buffer | string | undefined {
  if (pathToFile === "") {
    response.status(500).send(undefinedStudent);
    return;
  }
  const pathDescriptor: PathOrFileDescriptor = path.resolve(pathToFile);
  fs.readFile(
    pathDescriptor,
    "utf8",
    (err: NodeJS.ErrnoException | null, data: string | Buffer) => {
      if (err) {
        response.status(500).send(undefinedStudent);
        return;
      }
      return data;
    },
  );
}
