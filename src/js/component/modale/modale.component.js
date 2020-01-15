import React, { useCallback } from "react";
import "./modale.scss";
import { useDropzone } from "react-dropzone";

const Modale = ({ showModale, setShowModale, /*textValue,*/ setText }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      let tab = acceptedFiles[0].name.split("."),
        ext = tab[tab.length - 1];
      if (ext !== "txt" || acceptedFiles[0].size > 1024 * 100) return;
      const reader = new FileReader();

      reader.addEventListener("load", function(e) {
        setText(e.target.result);
        setShowModale(false);
      });
      reader.readAsBinaryString(acceptedFiles[0]);
    },
    [setText, setShowModale]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (showModale)
    return (
      <section>
        <div id="modale">
          <div {...getRootProps()}>
            <input
              {...getInputProps({ multiple: false, accept: "text/plain" })}
            />
            {isDragActive ? (
              <p>Drop here your file to load in editor</p>
            ) : (
              <p className="clickable">Click to select file, or drag to here</p>
            )}
          </div>
        </div>
        <div id="overlay" onClick={() => setShowModale(false)}></div>
      </section>
    );
  return <div></div>;
};

export default Modale;
