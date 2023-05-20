export interface API_INFO {
  limit: string;
}

export const getInfo = async (signal: AbortSignal) => {
  return new Promise<API_INFO>((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/info`, { signal })
      .then(res => res.json())
      .then((apiData: API_INFO) => resolve(apiData))
      .catch(reject);
  });
};

export interface API_DATA {
  id: number;
  code: string;
  test: string;
  summary: string;
}

export const API_DATA_ERROR_STATUS = {
  OUT: 1, //out of bounds
  INVALID: 2,
  ABORT: 3,
  OTHER: 10,
} as const;

const rejectHandler = (err: Error, reject: (reason: unknown) => void) => {
  if (err.name == "AbortError") {
    return reject(API_DATA_ERROR_STATUS.ABORT);
  }
  return reject(API_DATA_ERROR_STATUS.OTHER);
};

export const getCode = async (id: number, signal: AbortSignal) => {
  return new Promise<API_DATA>((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/code?id=${id}`, { signal })
      .then(res => {
        if (!res.ok) {
          if (res.status == 400) {
            return reject(API_DATA_ERROR_STATUS.OUT);
          }
          if (res.status == 404) {
            return reject(API_DATA_ERROR_STATUS.INVALID);
          }
          return reject(API_DATA_ERROR_STATUS.OTHER);
        }

        return res.json();
      })
      .then((apiData: API_DATA) => resolve(apiData))
      .catch((err: Error) => rejectHandler(err, reject));
  });
};

export const getList = async (page: number, signal: AbortSignal) => {
  return new Promise<API_DATA[]>((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/list?p=${page}`, { signal })
      .then(res => {
        if (!res.ok) {
          if (res.status == 400) {
            return reject(API_DATA_ERROR_STATUS.OUT);
          }
          if (res.status == 404) {
            return reject(API_DATA_ERROR_STATUS.INVALID);
          }
          return reject(API_DATA_ERROR_STATUS.OTHER);
        }

        return res.json();
      })
      .then((apiData: API_DATA[]) => resolve(apiData))
      .catch((err: Error) => rejectHandler(err, reject));
  });
};
