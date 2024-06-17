import { prompts } from "./common/handleRequest";
import { commonHandler } from "./common/commonHandler";

export default async function handler(req, res) {
  await commonHandler(req, res, prompts.girlfriend);
}
