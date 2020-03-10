import React, { useEffect, useState } from "react";
import "./result.scss";
import ResultFunctions from "./result.functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faFlag,
  faSmileBeam,
  faFrown,
  faPaperPlane,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import { Pie } from "react-chartjs-2";

const Result = ({
  translator,
  graphData,
  resultValue,
  textRender,
  setTextRender,
  entityList,
  setEntityList,
  selectedEntities,
  setSelectedEntities,
  setResultValue
}) => {
  const selectEntity = entityId => {
    let newSelectedEntities = ResultFunctions.loadSelectedEntities(
      entityId,
      selectedEntities,
      setSelectedEntities
    );
    ResultFunctions.loadTextAndEntity(
      resultValue,
      newSelectedEntities,
      textRender,
      entityList,
      setTextRender,
      setEntityList,
      ResultFunctions.textRenderer
    );
  };
  const sendFeedback = ResultFunctions.sendFeedback;
  const escFunction = event => {
    if (event.keyCode === 27) {
      if (showFeedbackModale) {
        setShowFeedbackModale(false);
        setSending(false);
      } else if (Object.keys(resultValue).length) {
        setResultValue({});
        setEntityList({});
      }
    }
  };

  const [showFeedbackModale, setShowFeedbackModale] = useState(false),
    [badFeedback, setBadFeedback] = useState(false),
    [goodFeedback, setGoodFeedback] = useState(false),
    [sending, setSending] = useState(false),
    [userName, setUserName] = useState(""),
    [feedBackText, setFeedBackText] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  return (
    <section
      id="result"
      className={Object.keys(resultValue).length ? "show" : ""}
    >
      <div>
        <h1>{translator("RESULT.HEADER")}</h1>
        <div id="text-render">
          <h3>{translator("RESULT.SECTION.0.HEADER")}</h3>
          <p>{
            (textRender.map((elem) => {
              if (elem.type === "span") return <span>{elem.content}</span>
              else return <a href={elem.link} className={elem.link.substr(44) + elem.focus === true ? " focus" : ""} target="_blank" rel="noopener noreferrer">{elem.content}<FontAwesomeIcon icon={faExternalLinkAlt} size="lg" /></a>
            }))
          }</p>
          {!sending && (
            <button onClick={() => setShowFeedbackModale(true)}>
              <FontAwesomeIcon icon={faFlag} size="lg" />
            </button>
          )}
        </div>
        <hr />
        <div id="entity-lister">
          <h3>{translator("RESULT.SECTION.1.HEADER")}</h3>
          <div>
            {!Object.keys(resultValue).includes("ents") ||
            !resultValue.ents.length ? (
              <p style={{ fontStyle: "italic", color: "#C5C5C5" }}>
                {translator("RESULT.SECTION.1.UNFOUND")}
              </p>
            ) : (
              Object.values(entityList).map((elem, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => selectEntity(elem["id"])}
                    className={
                      selectedEntities.includes(elem["id"]) ? "focus" : ""
                    }
                  >
                    {elem["value"]}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <hr />
        <div id="entity-proportion">
          <h3>{translator("RESULT.SECTION.2.HEADER")}</h3>
          <div className="row">
            <p className="half">
              <span id="nb-entity">{Object.keys(entityList).length || 0}</span>
              <br />
              {translator("RESULT.SECTION.2.CONCEPT")}
            </p>
            <p className="half">
              <span id="nb-entity">
                {resultValue.ents ? Object.keys(resultValue.ents).length : 0}
              </span>
              <br />
              {translator("RESULT.SECTION.2.OCCURENCE")}
            </p>
          </div>
          {Object.keys(resultValue).includes("ents") &&
            resultValue.ents.length !== 0 && (
              <>
                <div>
                  {Object.keys(entityList).length && (
                    <table>
                      <thead>
                        <tr>
                          <th>{translator("RESULT.SECTION.3.RANK_LABEL")}</th>
                          <th>{translator("RESULT.SECTION.3.LABEL_LABEL")}</th>
                          <th>
                            {translator("RESULT.SECTION.3.APPEARS_LABEL")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(entityList)
                          .sort((a, b) => b.nb - a.nb)
                          .map((entity, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entity.value}</td>
                                <td>{entity.nb}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  )}
                </div>
                <div>
                  <h3>{translator("RESULT.SECTION.4.HEADER")}</h3>
                  {(graphData.length || Object.keys(graphData).length) && (
                    <Pie
                      data={graphData}
                      options={{
                        legend: {
                          position: "left"
                        },
                        tooltips: {
                          callbacks: {
                            afterLabel: function(tooltipItem, data) {
                              var dataset = data["datasets"][0];
                              var percent = Math.round(
                                (dataset["data"][tooltipItem["index"]] /
                                  dataset["_meta"][0]["total"]) *
                                  100
                              );
                              return "(" + percent + "%)";
                            }
                          }
                        }
                      }}
                    ></Pie>
                  )}
                </div>
              </>
            )}
        </div>
        <button id="leave-button" onClick={() => setResultValue({})}>
          Esc <FontAwesomeIcon icon={faTimesCircle} size="lg" />
        </button>
      </div>
      <div id="feedback-section" className={showFeedbackModale ? "shown" : ""}>
        <div
          id="feedback-overlay"
          onClick={() => {
            setShowFeedbackModale(false);
            setSending(false);
          }}
        ></div>
        <div id="feedback-modale">
          <h2>{translator("RESULT.MODALE.HEADER")}</h2>
          <input
            type="text"
            value={userName}
            placeholder={translator("RESULT.MODALE.NAME_INPUT_PLACEHOLDER")}
            onChange={event => setUserName(event.target.value)}
          />
          <h4>{translator("RESULT.MODALE.QUESTION")}</h4>
          <div id="modale-btns">
            <button
              onClick={() => {
                setGoodFeedback(true);
                setBadFeedback(false);
              }}
              className={goodFeedback ? "chosen" : ""}
            >
              <FontAwesomeIcon icon={faSmileBeam} size="lg" />
            </button>
            <button
              onClick={() => {
                setBadFeedback(true);
                setGoodFeedback(false);
              }}
              className={badFeedback ? "chosen" : ""}
            >
              <FontAwesomeIcon icon={faFrown} size="lg" />
            </button>
          </div>
          {badFeedback && (
            <textarea
              placeholder={translator("RESULT.MODALE.TEXTAREA_PLACEHOLDER")}
              onChange={event => setFeedBackText(event.target.value)}
            ></textarea>
          )}
          <button
            onClick={() =>
              sendFeedback(
                { goodFeedback, badFeedback, feedBackText, userName },
                setShowFeedbackModale,
                setSending
              )
            }
            disabled={
              !(
                ((badFeedback && feedBackText !== "") || goodFeedback) &&
                userName !== ""
              )
            }
          >
            {translator("RESULT.MODALE.SEND")}
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="lg"
              className={sending ? "sending" : ""}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Result;
