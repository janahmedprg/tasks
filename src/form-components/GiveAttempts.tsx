import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export function GiveAttempts(): JSX.Element {
    const [qAttempts, setAttempts] = useState<number>(3);
    const [request, setRequest] = useState<string>("");

    function updateRequest(event: React.ChangeEvent<HTMLInputElement>) {
        setRequest(event.target.value);
    }

    function gainUpdate(qAttempts: number, request: string) {
        const parsedInt = parseInt(request);
        if (isNaN(parsedInt)) {
            setAttempts(qAttempts);
        } else {
            setAttempts(qAttempts + parsedInt);
        }
    }

    return (
        <div>
            <h3>Give Attempts</h3>
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
                    Attempts:
                </Form.Label>
                <Form.Control
                    type="number"
                    value={request}
                    onChange={updateRequest}
                />
            </Form.Group>
            <Button
                name="use"
                onClick={() => setAttempts(qAttempts - 1)}
                disabled={qAttempts === 0}
            >
                Use
            </Button>
            <Button name="gain" onClick={() => gainUpdate(qAttempts, request)}>
                Gain
            </Button>
            <span>{qAttempts}</span>
        </div>
    );
}
