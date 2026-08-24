import type { ApiErrorCode } from "@/types/api.type";

export class ApiError extends Error {
  code: ApiErrorCode;
  api: string;

  constructor(message: string, code: ApiErrorCode, api: string) {
    super(message);

    this.code = code;
    this.api = api;
  }
}
