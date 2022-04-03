import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Quiz } from "../quizInterface/quiz";
import quizData from "../Quizzes/quizzesData.json";
import { Button } from "react-bootstrap";

export function EditQuiz({
    editQuiz,
    setView
}: {
    editQuiz: Quiz;
    setView: (newView: number) => void;
}): JSX.Element {
    return (
        <div>
            <Button onClick={() => setView(0)}>Exit</Button>
        </div>
    );
}
