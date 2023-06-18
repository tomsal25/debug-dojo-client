import { canUseWorker, limitedEval } from "./workerUtil";

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

export type CodeResponce = CodeJudge | CodeError | CodeTimeout;

export const testFunction = (sourceCode: string, testCode: string) => {
  const randomId = `${Math.random()}`;
  // remove trailing colon
  testCode = `(()=>{return ${testCode}})()`;
  const code = `${sourceCode};return[${testCode},"${randomId}"]`;

  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const result = new Function(code)() as unknown;

    // check if the origin id is equal to returned one
    if (
      Array.isArray(result) &&
      // expected return: [result: boolean, id: string]
      typeof result[0] === "boolean" &&
      randomId === result[1]
    ) {
      return { type: "code", flag: result[0] } as CodeJudge;
    } else {
      return {
        type: "error",
        name: "invalid input",
        message: "",
      } as CodeError;
    }
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
  timeLimit = 3000
): Promise<CodeResponce[]> => {
  const resultList = await Promise.all(
    testCode.split("\n").map(async test => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (useWorker && canUseWorker) {
        return await limitedEval(sourceCode, test, timeLimit);
      } else {
        return testFunction(sourceCode, test);
      }
    })
  );

  return resultList;
};
