import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ModalDialog, ModalDialogContainer } from "../src";

const App = () => {
  const [text, setText] = React.useState("");

  const myconfirm = async () => {
    if (await ModalDialog.confirm("元気ですかー？")) {
      setText("元気でよかった！");
    }
  };

  return (
    <div>
      <h1>use-modal-dialog</h1>
      <p>
        <a
          target="_blank"
          href="https://github.com/moriyuu/use-modal-dialog/blob/master/example/index.js"
        >
          source code of this demo
        </a>
      </p>

      {/* <button onClick={() => xalert("Hello World")}>alert</button> */}
      <button onClick={myconfirm}>confirm</button>

      <div>{text}</div>

      <ModalDialogContainer />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
