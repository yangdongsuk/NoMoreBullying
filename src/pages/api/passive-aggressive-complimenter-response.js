// src/pages/api/passive-aggressive-complimenter-response.js
import { commonHandler } from "../common/commonHandler";
import { prompts } from "../common/handleRequest";

export default async function handler(req, res) {
  await commonHandler(req, res, prompts.passiveAggressiveComplimenter);
}
