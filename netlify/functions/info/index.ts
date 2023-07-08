import { Handler } from "@netlify/functions";
import { _limit } from "../.data/_limit";
import { _res200 } from "../.util/_res";

export const handler: Handler = async () => {
  const limit = _limit;

  return _res200({
    body: JSON.stringify({ limit: limit }),
  });
};
