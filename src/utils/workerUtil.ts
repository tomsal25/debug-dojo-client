import { CodeResponce } from "./testCode";

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const canUseWorker: boolean = !!window.Worker;

export const limitedEval = async (
  sourceCode: string,
  timeLimit: number
): Promise<CodeResponce> => {
  return new Promise(resolve => {
    const worker = new Worker(new URL("./eval.worker.ts", import.meta.url));

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
