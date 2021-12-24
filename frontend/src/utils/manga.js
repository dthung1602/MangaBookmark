import { MG_FINISHED, MG_LAST_CHAP_READ, MG_REREAD, MG_MANY_TO_READ, MG_NEW_CHAP } from "./constants";

export const statusToClassMapping = {
  [MG_NEW_CHAP]: "new-chap",
  [MG_MANY_TO_READ]: "many-to-read",
  [MG_REREAD]: "reread",
  [MG_LAST_CHAP_READ]: "last-chap-reached",
  [MG_FINISHED]: "finished",
};
