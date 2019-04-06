import * as React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import EventEmitter from "events";

class ModalDialogEventEmitter {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  confirm = async (text?: string): Promise<boolean> => {
    this.emitter.emit("openConfirm", text);
    return await new Promise((resolve, reject) => {
      this.emitter.once("confirm", (type: "ok" | "cancel") => {
        if (type === "ok") resolve();
        if (type === "cancel") reject();
      });
    })
      .then(() => true)
      .catch(() => false);
  };

  clickConfirm = (type: "ok" | "cancel") => {
    this.emitter.emit("confirm", type);
  };

  addConfirmListener(callback: (text: string) => void) {
    this.emitter.addListener("openConfirm", callback);
  }

  removeConfirmListener(callback: (text: string) => void) {
    this.emitter.removeListener("openConfirm", callback);
  }
}

export const ModalDialog = new ModalDialogEventEmitter();

// ModalDialog.confirm("本当にOKですか？");

/**
 * ================================================================================
 */

const Wrapper = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 480px;
  height: 200px;
  background-color: #f5f5f5;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 16px;
  border-radius: 3px;
  opacity: 1;
  transition: all 0.05s ease-out;

  ${p =>
    !p.isOpen &&
    css`
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
    `}
`;

type ModalDialogState = {
  isOpen: boolean;
  text: string;
};

const useConfirm = () => {
  const [confirmState, setConfirmState] = useState<ModalDialogState>({
    isOpen: false,
    text: ""
  });

  useEffect(() => {
    ModalDialog.addConfirmListener(openConfirm);

    return () => ModalDialog.removeConfirmListener(openConfirm);
  }, []);

  const openConfirm = async (text: string) => {
    setConfirmState({ isOpen: true, text: text || "" });
  };

  const clickConfirm = (type: "ok" | "cancel") => {
    ModalDialog.clickConfirm(type);
    setConfirmState(_state => ({ isOpen: false, text: _state.text }));
  };

  return {
    confirmState,
    clickConfirm
  };
};

export const ModalDialogContainer: React.FC = () => {
  const { confirmState, clickConfirm } = useConfirm();
  // const [alertState, setAlertState] = useState<ModalDialogState>({
  //   isOpen: false,
  //   text: ""
  // });

  return (
    <>
      {/* <Alert {...alertState} clickAlertOK={clickAlertOK} /> */}
      <Confirm {...confirmState} clickConfirm={clickConfirm} />
    </>
  );
};

// /**
//  * Alert
//  */
// const Alert: React.FC<ModalDialogState & { clickAlertOK(): void }> = props => {
//   const { isOpen, text, clickAlertOK } = props;
//   return (
//     <Wrapper isOpen={isOpen}>
//       <h3>{text}</h3>
//       <div>
//         <button onClick={clickAlertOK}>OK</button>
//       </div>
//     </Wrapper>
//   );
// };

/**
 * Confirm
 */
const Confirm: React.FC<
  ModalDialogState & { clickConfirm(type: "ok" | "cancel"): void }
> = props => {
  const { isOpen, text, clickConfirm } = props;
  return (
    <Wrapper isOpen={isOpen}>
      <h3>{text}</h3>
      <div>
        <button onClick={() => clickConfirm("cancel")}>Cancel</button>
        <button onClick={() => clickConfirm("ok")}>OK</button>
      </div>
    </Wrapper>
  );
};
