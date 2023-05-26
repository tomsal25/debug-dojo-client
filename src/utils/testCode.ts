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
  timeLimit = 3000
): Promise<CodeResponce[]> => {
  const resultList = await Promise.all(
    testCode.split("\n").map(async e => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (useWorker && canUseWorker) {
        // FIXME: if sourceCode is "return true;", any test will be passed.
        return await limitedEval(sourceCode + ";return " + e, timeLimit);
      } else {
        return testFunction(sourceCode + ";return " + e);
      }
    })
  );

  return resultList;
};
