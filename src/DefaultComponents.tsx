import * as React from "react";
import styled, { css } from "styled-components";
import { ModalDialogState } from "./types";

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

/**
 * DefaultAlert component
 */
export const DefaultAlert: React.FC<
  ModalDialogState & { clickAlert(): void }
> = props => {
  const { isOpen, content, clickAlert } = props;
  return (
    <Wrapper isOpen={isOpen}>
      <h3>{content}</h3>
      <div>
        <button onClick={clickAlert}>OK</button>
      </div>
    </Wrapper>
  );
};

/**
 * DefaultConfirm component
 */
export const DefaultConfirm: React.FC<
  ModalDialogState & { clickConfirm(type: "ok" | "cancel"): void }
> = props => {
  const { isOpen, content, clickConfirm } = props;
  return (
    <Wrapper isOpen={isOpen}>
      <h3>{content}</h3>
      <div>
        <button onClick={() => clickConfirm("cancel")}>Cancel</button>
        <button onClick={() => clickConfirm("ok")}>OK</button>
      </div>
    </Wrapper>
  );
};
