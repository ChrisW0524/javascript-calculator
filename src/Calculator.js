import React from "react";
import clickableData from "./clickableData";
import Clickable from "./Clickable";
import { useState } from "react";

const Calculator = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("0");

    return (
        <div id="calculator">
            <div className="display-screen">
                <p className="input">{input}</p>
                <p className="output" id="display">{output}</p>
            </div>
            {clickableData.map((data) => {
                return <Clickable setInput={setInput} input={input} setOutput={setOutput} output={output} key={data.id} {...data}></Clickable>;
            })}
        </div>
    );
};

export default Calculator;
