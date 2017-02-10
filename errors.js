"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = error;
exports.actionError = actionError;
function error(msg) {
  return "[redux-retrieval] " + msg;
}

function actionError(action, msg) {
  return error("[Action Error] type: " + action.type + ", " + msg);
}