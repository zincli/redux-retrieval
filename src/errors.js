export function error(msg) {
  return `[redux-retrieval] ${msg}`;
}

export function actionError(action, msg) {
  return error(`[Action Error] type: ${action.type}, ${msg}`);
}
