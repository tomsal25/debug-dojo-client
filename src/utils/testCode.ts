import evalWorker from "./eval.worker?worker&inline";

export interface CodeJudge {
  type: "code";
  flag: boolean;
}

export interface CodeError {
  type: "error";
  name: string;
  message: string;
}

interface CodeTimeout {
  type: "timeout";
}

type CodeResponce = CodeJudge | CodeError | CodeTimeout;

const limitedEval = async (
  sourceCode: string,
  timeLimit: number
): Promise<CodeResponce> => {
  return new Promise(resolve => {
    const worker = new evalWorker();

    // set execution time limit
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ type: "timeout" });
    }, timeLimit);

    worker.addEventListener("message", result => {
      clearTimeout(timer);
      worker.terminate();
      resolve(result.data as CodeResponce);
    });

    // unknown error (it shouldn't called usually)
    worker.addEventListener("error", error => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ type: "error", name: "unknown", message: "worker error" });
      if (import.meta.env.DEV) {
        console.error("Error in worker");
        console.log(error);
      }
    });

    worker.postMessage(sourceCode);
  });
};

const testFunction = (sourceCode: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const result = new Function(sourceCode)() as boolean;
    return { type: "code", flag: result } as CodeJudge;
  } catch (error) {
    if (error instanceof Error) {
      return {
        type: "error",
        name: error.name,
        message: error.message,
      } as CodeError;
    } else {
      return {
        type: "error",
        name: "unknown",
        message: "eval function error",
      } as CodeError;
    }
  }
};

export const testCode = async (
  sourceCode: string,
  testCode: string,
  useWorker = true,
  timeLimit = 15000
): Promise<CodeResponce[]> => {
  const resultList = await Promise.all(
    testCode.split("\n").map(async e => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (useWorker && window.Worker) {
        // FIXME: if sourceCode is "return true;", any test will be passed.
        return await limitedEval(sourceCode + ";return " + e, timeLimit);
      } else {
        return testFunction(sourceCode + ";return " + e);
      }
    })
  );

  return resultList;
};
