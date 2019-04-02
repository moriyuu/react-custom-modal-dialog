import * as React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import EventEmitter from "events";

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

const ev = new EventEmitter();

type ModalDialogState = {
  isOpen: boolean;
  text: string;
};

export const useModalDialog = () => {
  const [alertState, setAlertState] = useState<ModalDialogState>({
    isOpen: false,
    text: ""
  });
  const [confirmState, setConfirmState] = useState<ModalDialogState>({
    isOpen: false,
    text: ""
  });

  /**
   * alert
   */
  const xalert = async (text?: string): Promise<undefined> => {
    setAlertState({ isOpen: true, text: text || "" });
    return await new Promise(resolve => {
      ev.once("alert", () => {
        resolve();
      });
    }).then(() => undefined);
  };

  const clickAlertOK = () => {
    ev.emit("alert");
    setAlertState({ isOpen: false, text: "" });
  };

  /**
   * confirm
   */
  const xconfirm = async (text?: string): Promise<boolean> => {
    setConfirmState({ isOpen: true, text: text || "" });
    return await new Promise((resolve, reject) => {
      ev.once("confirm", (type: "ok" | "cancel") => {
        if (type === "ok") resolve();
        if (type === "cancel") reject();
      });
    })
      .then(() => true)
      .catch(() => false);
  };

  const clickConfirm = (type: "ok" | "cancel") => {
    ev.emit("confirm", type);
    setConfirmState(_state => ({ isOpen: false, text: _state.text }));
  };

  return {
    xalert,
    xconfirm,
    ModalDialogContainer: (
      <>
        <Alert {...alertState} clickAlertOK={clickAlertOK} />
        <Confirm {...confirmState} clickConfirm={clickConfirm} />
      </>
    )
  };
};

const Alert: React.FC<ModalDialogState & { clickAlertOK(): void }> = props => {
  const { isOpen, text, clickAlertOK } = props;
  return (
    <Wrapper isOpen={isOpen}>
      <h3>{text}</h3>
      <div>
        <button onClick={clickAlertOK}>OK</button>
      </div>
    </Wrapper>
  );
};

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
