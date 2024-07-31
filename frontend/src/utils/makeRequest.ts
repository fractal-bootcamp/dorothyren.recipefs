import { useAuth } from "@clerk/clerk-react";
import { SERVER_URL } from "../constants";
import z from "zod";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  endpoint: string;
  method: HTTPMethod;
  token?: string;
  body?: string;
  schema?: z.ZodType<any>;
}

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
      Authorization: `Bearer ${token}`,
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

/** Creating a custom hook */
export const useRequest = () => {
  // we're using the clerk hook to grab the token
  const { getToken } = useAuth();

  // we are wrapping the makeRequest function and passing in a token
  const makeRequestWithToken = async <T>(args: Omit<RequestOptions, "token">) =>
    makeRequest<T>({ ...args, token: (await getToken()) || undefined });

  return { makeRequest: makeRequestWithToken };
};
