import * as React from "react";
import { useState, useEffect } from "react";
import { ModalDialog } from "./ModalDialogEventEmitter";
import { ModalDialogState } from "./types";
import { DefaultAlert, DefaultConfirm } from "./DefaultComponents";

/**
 * useAlert
 */
const useAlert = () => {
  const [alertState, setAlertState] = useState<ModalDialogState>({
    isOpen: false,
    text: ""
  });

  useEffect(() => {
    ModalDialog.addEventListener("openAlert", openAlert);

    return () => ModalDialog.removeEventListener("openAlert", openAlert);
  }, []);

  const openAlert = async (text: string) => {
    setAlertState({ isOpen: true, text: text || "" });
  };

  const clickAlert = () => {
    ModalDialog.clickAlert();
    setAlertState(_state => ({ isOpen: false, text: _state.text }));
  };

  return { alertState, clickAlert };
};

/**
 * useConfirm
 */
const useConfirm = () => {
  const [confirmState, setConfirmState] = useState<ModalDialogState>({
    isOpen: false,
    text: ""
  });

  useEffect(() => {
    ModalDialog.addEventListener("openConfirm", openConfirm);

    return () => ModalDialog.removeEventListener("openConfirm", openConfirm);
  }, []);

  const openConfirm = async (text: string) => {
    setConfirmState({ isOpen: true, text: text || "" });
  };

  const clickConfirm = (type: "ok" | "cancel") => {
    ModalDialog.clickConfirm(type);
    setConfirmState(_state => ({ isOpen: false, text: _state.text }));
  };

  return { confirmState, clickConfirm };
};

/**
 * ModalDialogContainer
 */
export const ModalDialogContainer: React.FC = () => {
  const { confirmState, clickConfirm } = useConfirm();
  const { alertState, clickAlert } = useAlert();

  return (
    <>
      <DefaultAlert {...alertState} clickAlert={clickAlert} />
      <DefaultConfirm {...confirmState} clickConfirm={clickConfirm} />
    </>
  );
};
