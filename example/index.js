import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { ModalDialogContainer, ModalDialog } from "../src";

const App = () => {
  const [text, setText] = React.useState("");
  const [name, setName] = React.useState("");

  const myConfirm = async () => {
    if (await ModalDialog.confirm("Really?")) {
      setText("It is real.");
    }
  };

  const myPrompt = async () => {
    const name = await ModalDialog.prompt("What is your name?");
    setName(name);
  };

  return (
    <div>
      <h1>react-custom-modal-dialog</h1>
      <p>
        <a
          target="_blank"
          href="https://github.com/moriyuu/react-custom-modal-dialog/blob/master/example/index.js"
        >
          source code of this demo
        </a>
      </p>

      <button onClick={() => ModalDialog.alert("Hello World")}>alert</button>
      <button onClick={myConfirm}>confirm</button>
      <button onClick={myPrompt}>prompt</button>

      <div>{text}</div>
      <div>{!!name && `You are ${name}.`}</div>

      <ModalDialogContainer />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
