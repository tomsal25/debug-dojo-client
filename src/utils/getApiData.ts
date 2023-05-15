export interface API_INFO {
  limit: string;
}

export const getInfo = async () => {
  return new Promise<API_INFO>((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/info`)
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
  OTHER: 10,
} as const;

export const getCode = async (id: number) => {
  return new Promise<API_DATA>((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/code?id=${id}`)
      .then(res => {
        if (!res.ok) {
          if (res.status == 400) {
            return reject(API_DATA_ERROR_STATUS.OUT);
          }
          return reject(API_DATA_ERROR_STATUS.OTHER);
        }

        return res.json();
      })
      .then((apiData: API_DATA) => resolve(apiData))
      .catch(() => {
        return reject(API_DATA_ERROR_STATUS.OTHER);
      });
  });
};

export const getList = async (page: number) => {
  return new Promise<API_DATA[]>((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/list?p=${page}`)
      .then(res => {
        if (!res.ok) {
          if (res.status == 400) {
            return reject(API_DATA_ERROR_STATUS.OUT);
          }
          return reject(API_DATA_ERROR_STATUS.OTHER);
        }

        return res.json();
      })
      .then((apiData: API_DATA[]) => resolve(apiData))
      .catch(() => {
        return reject(API_DATA_ERROR_STATUS.OTHER);
      });
  });
};
