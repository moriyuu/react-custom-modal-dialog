import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { ModalDialogContainer, ModalDialog } from "../src";

const App = () => {
  const [text, setText] = React.useState("");

  const myconfirm = async () => {
    if (await ModalDialog.confirm("Really?")) {
      setText("It is real.");
    }
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
      <button onClick={myconfirm}>confirm</button>

      <div>{text}</div>

      <ModalDialogContainer />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
