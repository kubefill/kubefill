import { LOCAL_STORAGE, SERVER_PORT } from "../constants";

type ErrorWithMessage = {
  message: string;
};

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
};

export const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    if (typeof maybeError === "string") {
      return new Error(maybeError);
    }

    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

export const getErrorMessage = (error: unknown) => {
  return toErrorWithMessage(error).message;
};

/**
 * Simple helper method to make a GET request and return or throw the response.
 * @param {string | URL} url - URL to make request to
 * @param {object} options - Additional optional options
 * @param {object} options.headers - Additional headers to set on the fetch
 */
export const parseOrThrowRequest = async (
  url: RequestInfo | URL,
  { headers = {} as Record<string, string> } = {}
) => {
  const res = await fetch(url, { headers: { "Content-Type": "application/json", ...headers } });
  if (!res.ok) throw res;
  if (res.status === 204) return;
  return await res.json();
};

export const deleteRequest = async (
  url: string,
  data: Record<string, string | number>,
  { headers = {} } = {}
) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw res;
  if (res.status === 204) return;
  return await res.json();
};

export const post = async (url: string, data: any, { headers = {} } = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw res;
  if (res.status === 204) return;
  return await res.json();
};

export const put = async (url: string, data: any, { headers = {} } = {}) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw res;
  if (res.status === 204) return;
  return await res.json();
};

export const getServerPort = (): string => {
  if (SERVER_PORT) {
    return SERVER_PORT;
  }

  if (window.location.port) {
    return window.location.port;
  }

  return "";
};

export const getLocalStorageJWTKeys = () => {
  const jwtKeys = localStorage.getItem(LOCAL_STORAGE);

  if (jwtKeys) {
    return JSON.parse(jwtKeys);
  }

  return null;
};
