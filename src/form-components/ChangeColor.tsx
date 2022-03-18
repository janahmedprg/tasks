import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { ColoredBox } from "../bad-components/ColoredBox";

const colors = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "cyan",
    "magenta",
    "white",
    "black"
];

export function ChangeColor(): JSX.Element {
    const [color, setColor] = useState<string>(colors[0]);
    return (
        <div>
            <h3>Change Color</h3>
            <div>
                {colors.map(
                    (c: string): JSX.Element => (
                        <Form.Check
                            key={c}
                            inline
                            type="radio"
                            name="color"
                            onChange={(e) => setColor(e.target.value)}
                            label={c}
                            value={c}
                            checked={color === c}
                            style={{ backgroundColor: c }}
                        />
                    )
                )}
            </div>
            <div>
                You have chosen{" "}
                <a data-testid="colored-box" style={{ backgroundColor: color }}>
                    {" "}
                    {color}
                </a>
            </div>
        </div>
    );
}
