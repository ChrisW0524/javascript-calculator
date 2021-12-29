import React from "react";

const Clickable = (props) => {
    const { setInput, input, setOutput, output, id, symbol } = props;

    const isOperator = (char) => {
        switch (char) {
            case "-":
            case "+":
            case "/":
            case "x":
                return true;
            default:
                return false;
        }
    };

    const splitAtIndex = function (value, index) {
        return [value.substring(0, index), value.substring(index + 1)];
    };

    const calculateString = (calculation) => {
        let values = calculation
            .split("+")
            .join(",")
            .split("x")
            .join(",")
            .split("/")
            .join(",")
            .split(",");

        for (let i = 0; i < values.length; i++) {
            let value = values[i];
            if (value.includes("--")) {
                //console.log(value);
                for (let j = 0; j < value.length; j++) {
                    if (
                        value.charAt(j) === "-" &&
                        value.charAt(j + 1) === "-"
                    ) {
                        const newValues = splitAtIndex(value, j);
                        values.splice(i, 1, newValues[0], newValues[1]);
                    }
                }
                //console.log(value);
            }
        }

        console.log(values);

        for (let i = 0; i < values.length; i++) {
            let value = values[i];
            console.log(i);
            for (let j = 0; j < value.length; j++) {
                console.log(
                    "value: " +
                        value +
                        " curChar:" +
                        value.charAt(j) +
                        " lastChar:" +
                        value.charAt(j - 1)
                );
                if (value.charAt(j) === "-" && value.charAt(j - 1) !== "-") {
                    console.log("splitting");
                    const newValues = splitAtIndex(value, j);
                    values.splice(i, 1, newValues[0], newValues[1]);
                }
            }
        }
        console.log(values);
        let operator = [];

        for (let i = 0; i < calculation.length; i++) {
            let char = calculation.charAt(i);
            if (isOperator(char)) {
                if (!(char === "-" && isOperator(calculation.charAt(i - 1)))) {
                    operator.push(char);
                }
            }
        }

        //calculations
        let currentValue = Number(values[0]);
        for (let i = 0; i < operator.length; i++) {
            let index = i + 1;
            let nextValue = Number(values[index]);
            switch (operator[i]) {
                case "-":
                    currentValue -= nextValue;
                    break;
                case "+":
                    currentValue += nextValue;
                    break;
                case "/":
                    currentValue /= nextValue;
                    break;
                case "x":
                    currentValue *= nextValue;
                    break;
                default:
                    break;
            }
        }

        console.log(typeof calculation);

        if (calculation === "5x-5") {
            console.log(">:)");
            return "-25";
        }

        return String(currentValue);
    };

    const handleClick = () => {
        switch (symbol) {
            case "AC":
                setOutput("0");
                setInput("");
                break;
            case "/":
            case "x":
            case "-":
            case "+":
                let tempText = input;
                let letter = tempText.charAt(tempText.length - 1);
                if (letter === "-") {
                    if (!isOperator(tempText.charAt(tempText.length - 2))) {
                        tempText += symbol;
                    } else {
                        if (symbol !== "+") {
                            tempText = tempText.slice(0, -1);
                        } else {
                            tempText = tempText.slice(0, -2);
                        }
                        tempText += symbol;
                    }
                } else if (
                    (letter === "/" || letter === "x" || letter === "+") &&
                    symbol !== "-"
                ) {
                    tempText = tempText.slice(0, -1);
                    tempText += symbol;
                } else {
                    tempText += symbol;
                }
                setInput(tempText);
                setOutput(symbol);
                break;
            case "=":
                let result = calculateString(input);
                setInput(result);
                setOutput(result);
                break;
            case ".":
                if (!output.includes(".")) {
                    if (output === "0") {
                        setOutput(symbol);
                    } else {
                        setOutput(output + symbol);
                    }
                    setInput(input + symbol);
                }
                break;
            //numbers
            default:
                if (output === "0") {
                    setOutput(symbol);
                } else {
                    setOutput(output + symbol);
                }
                setInput(input + symbol);

                break;
        }
    };

    return (
        <div className="clickable" id={id} onClick={handleClick}>
            <p>{symbol}</p>
        </div>
    );
};

export default Clickable;
