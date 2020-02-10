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
        <div className="alert-warning">No reply from server !</div>
      )}
    </div>
  );
};

export default Editor;
