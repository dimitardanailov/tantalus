'use strict';

function defaultLogger() {
}

let logger = defaultLogger();

export function getLogger() {
  return logger;
}
