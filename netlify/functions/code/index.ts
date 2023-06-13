import { Handler } from "@netlify/functions";
import { _codeList } from "../.data/_codeList";
import { _limit } from "../.data/_limit";
import { _res200, _res400, _res404 } from "../.util/_res";

const isPositiveInteger = /^[1-9]\d*$/;

export const handler: Handler = async event => {
  const query = event.queryStringParameters;
  const id = query?.id;

  // return 400 error, if id is invalid
  if (!id || !isPositiveInteger.test(id)) {
    return _res400({ body: "id is invalid or not specified" });
  }

  const limit = _limit;
  const idNumber = parseInt(id, 10);

  // return 404 error, if request id is grater than limit
  if (idNumber > limit) {
    return _res404({ body: "id is grater than limit" });
  }

  const db = _codeList;
  const data = db.find(data => data.id == idNumber);

  // return 404 error, if data is not found
  if (!data) {
    return _res404({ body: "data is not found" });
  }

  return _res200({ body: JSON.stringify(data) });
};
