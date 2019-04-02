import * as React from "react";
import * as ReactDOM from "react-dom";
import { useModalDialog } from "../src";

const App = () => {
  const { xalert, xconfirm, ModalDialogContainer } = useModalDialog();
  const [text, setText] = React.useState("");

  const myconfirm = async () => {
    if (await xconfirm("元気ですかー？")) {
      setText("元気でよかった！");
    }
  };

  return (
    <div>
      <h1>use-modal-dialog</h1>

      <button onClick={() => xalert("Hello World")}>alert</button>
      <button onClick={myconfirm}>confirm</button>

      <div>{text}</div>

      {ModalDialogContainer}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
