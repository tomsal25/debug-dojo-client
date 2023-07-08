import { _headers } from "./_cors";

interface ResponseArg {
  headers?: {
    [header: string]: boolean | number | string;
  };
  body?: string;
}

export const _res200 = ({ body, headers }: ResponseArg) => {
  return {
    statusCode: 200,
    headers: { ...headers, ..._headers },
    body: body,
  };
};

export const _res400 = ({ body, headers }: ResponseArg) => {
  return {
    statusCode: 400,
    headers: { ...headers, ..._headers },
    body: body,
  };
};

export const _res404 = ({ body, headers }: ResponseArg) => {
  return {
    statusCode: 404,
    headers: { ...headers, ..._headers },
    body: body,
  };
};
