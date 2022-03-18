import React, { useState } from "react";
import Form from "react-bootstrap/Form";

export function MultipleChoiceQuestion({
    options,
    expectedAnswer
}: {
    options: string[];
    expectedAnswer: string;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>(options[0]);

    function updateAnswer(event: React.ChangeEvent<HTMLSelectElement>) {
        setAnswer(event.target.value);
    }

    return (
        <div>
            <h3>Multiple Choice Question</h3>
            <Form.Group>
                <Form.Label>How do you feel?</Form.Label>
                <Form.Select value={answer} onChange={updateAnswer}>
                    {options.map(
                        (o: string): JSX.Element => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            {answer === expectedAnswer ? "✔️" : "❌"}
        </div>
    );
}
