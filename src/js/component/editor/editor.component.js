import React from "react";
import "./editor.scss";

const Editor = ({ translator, textValue, setTextValue, serverError }) => {
  return (
    <div id="editor">
      <textarea
        placeholder={translator("EDITOR.TEXTAREA")}
        name="text"
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
        className={serverError ? "error" : ""}
      ></textarea>
      {serverError && (
        <div className="alert-warning">{translator("EDITOR.ALERT")}</div>
      )}
    </div>
  );
};

export default Editor;
