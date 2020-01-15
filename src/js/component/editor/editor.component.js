import React from "react";
import "./editor.scss";

const Editor = ({ textValue, setTextValue }) => {
  return (
    <div id="editor">
      <textarea
        placeholder="Ecrire ici votre texte"
        name="text"
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Editor;
