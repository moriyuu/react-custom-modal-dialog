import EventEmitter from "events";
import { ModalDialogState } from "./types";

class ModalDialogEventEmitter {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  alert = async (content?: ModalDialogState["content"]): Promise<undefined> => {
    this.emitter.emit("openAlert", content);
    return await new Promise((resolve, reject) => {
      this.emitter.once("alert", () => {
        resolve();
      });
    }).then(() => undefined);
  };

  confirm = async (content?: ModalDialogState["content"]): Promise<boolean> => {
    this.emitter.emit("openConfirm", content);
    return await new Promise((resolve, reject) => {
      this.emitter.once("confirm", (type: "ok" | "cancel") => {
        if (type === "ok") resolve();
        if (type === "cancel") reject();
      });
    })
      .then(() => true)
      .catch(() => false);
  };

  clickAlert = () => {
    this.emitter.emit("alert");
  };

  clickConfirm = (type: "ok" | "cancel") => {
    this.emitter.emit("confirm", type);
  };

  addEventListener = (
    type: "openAlert" | "openConfirm",
    callback: (content?: ModalDialogState["content"]) => void
  ) => {
    this.emitter.addListener(type, callback);
  };

  removeEventListener = (
    type: "openAlert" | "openConfirm",
    callback: (content?: ModalDialogState["content"]) => void
  ) => {
    this.emitter.removeListener(type, callback);
  };
}

export const ModalDialog = new ModalDialogEventEmitter();
