import * as p from '@clack/prompts';

export interface Progress {
  start(message: string): void;
  stop(message: string): void;
  error(message: string): void;
}

/** A clack spinner in a terminal; plain log lines in CI or piped output, where frames would flood the log. */
export function createProgress(isTTY = Boolean(process.stdout.isTTY)): Progress {
  if (isTTY) {
    const spin = p.spinner();
    return {
      start: (message) => spin.start(message),
      stop: (message) => spin.stop(message),
      error: (message) => spin.error(message),
    };
  }
  return {
    start: (message) => p.log.step(message),
    stop: (message) => p.log.success(message),
    error: (message) => p.log.error(message),
  };
}
