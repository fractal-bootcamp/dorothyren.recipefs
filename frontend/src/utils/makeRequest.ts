import { SERVER_URL } from "../constants";
import z from "zod";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  endpoint: string;
  method: HTTPMethod;
  body?: any;
  schema?: z.ZodType<any>;
} & (AuthenticatedOptions | UnathenticatedOptions);

type AuthenticatedOptions = {
  token: string;
};

type UnathenticatedOptions = {
  authenticated: false;
  token?: false;
};

export const makeRequest = async <T>({
  endpoint,
  method,
  body,
  token,
}: RequestOptions): Promise<T | null> => {
  try {
    const url = `${SERVER_URL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    };

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};
