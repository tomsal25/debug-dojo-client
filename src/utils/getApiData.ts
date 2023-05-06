export interface API_DATA {
  id: number;
  code: string;
  test: string;
  description: string;
}

export const API_DATA_ERROR_STATUS = {
  OUT: 1, //out of bounds
  OTHER: 10,
} as const;

export const getApiData = async (id: number) => {
  return new Promise<API_DATA[]>((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}?p=${id}`)
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
