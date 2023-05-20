import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { API_DATA_ERROR_STATUS, getInfo } from "../utils/getApiData";
import ValidateCode from "./Code";
import NetworkError from "./NetworkError";

interface Init {
  type: 0;
}

interface NetworkError {
  type: 2;
}

interface Normal {
  type: 3;
  id: number;
}

type Status = Init | NetworkError | Normal;

export default function RandomCode() {
  const [status, setStatus] = useState<Status>({ type: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    getInfo(abortController.signal)
      .then(data => {
        const id = Math.floor(Math.random() * data.limit) + 1;
        setStatus({ type: 3, id });
      })
      .catch(error => {
        // ignore aborted fetch
        if (error == API_DATA_ERROR_STATUS.ABORT) return;
        console.log(error);

        return setStatus({ type: 2 });
      });

    return () => {
      abortController.abort();
    };
  }, [navigate]);

  if (status.type == 2) return <NetworkError />;
  if (status.type == 3) return <ValidateCode id={status.id} />;
  return <Loading />;
}
