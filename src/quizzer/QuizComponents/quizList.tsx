import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Quiz } from "../quizInterface/quiz";

export function QuizList({
    qList,
    quizChosen,
    setQuiz
}: {
    qList: Quiz[];
    quizChosen: number;
    setQuiz: (newQuiz: number) => void;
}): JSX.Element {
    function updateQuiz(event: React.ChangeEvent<HTMLSelectElement>) {
        setQuiz(parseInt(event.target.value));
    }

    return (
        <div>
            <Form.Group controlId="quizChooser">
                <Form.Label>Choose Quiz:</Form.Label>
                <Form.Select value={quizChosen} onChange={updateQuiz}>
                    {qList.map(
                        (q: Quiz): JSX.Element => (
                            <option key={q.id} value={q.id}>
                                {q.title}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <p></p>
            Description: {qList[quizChosen].description}
            <p></p>
            The quiz has {qList[quizChosen].questions.length}
        </div>
    );
}
