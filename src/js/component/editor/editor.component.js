import React from "react";
import "./editor.scss";

const Editor = ({ textValue, setTextValue, serverError }) => {
  return (
    <div id="editor">
      <textarea
        placeholder="Ecrire ici votre texte"
        name="text"
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
        className={serverError ? "error" : ""}
      ></textarea>
      {serverError && (
        <div className="alert-warning">Server doesn't answer !</div>
      )}
    </div>
  );
};

export default Editor;
