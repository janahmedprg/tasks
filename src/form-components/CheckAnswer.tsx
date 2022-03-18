import React, { useState } from "react";
import Form from "react-bootstrap/Form";

export function CheckAnswer({
    expectedAnswer
}: {
    expectedAnswer: string;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>("");

    function updateAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        setAnswer(event.target.value);
    }
    return (
        <div>
            <h3>Check Answer</h3>
            <Form.Group
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Form.Label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    Answer:
                </Form.Label>
                <Form.Control
                    value={answer}
                    onChange={updateAnswer}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                />
            </Form.Group>
            <div>{answer === expectedAnswer ? "✔️" : "❌"}</div>
        </div>
    );
}
