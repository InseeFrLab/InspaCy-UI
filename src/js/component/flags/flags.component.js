import React from "react";
import "./flags.scss";
import LanguagesFiles from "../../../assets/languages";

const Flags = ({ actualLanguage }) => {
  var choices = (
    <div>
      {Object.keys(LanguagesFiles)
        .filter(elem => elem !== actualLanguage)
        .map(label => {
          return (
            <img
              src={`media/${label}.jpg`}
              alt={label}
              onClick={() => (document.location.href = `?lang=${label}`)}
            />
          );
        })}
      <img src={`media/${actualLanguage}.jpg`} alt={actualLanguage} />
    </div>
  );

  return <div id="flags">{choices}</div>;
};

export default Flags;
