import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Quiz } from "../quizInterface/quiz";
import quizData from "../Quizzes/quizzesData.json";
import { Button } from "react-bootstrap";

export function NewQuiz({
    setQuizzes,
    setView
}: {
    setQuizzes: (newQuiz: Quiz[]) => void;
    setView: (newView: number) => void;
}): JSX.Element {
    return (
        <div>
            <Button onClick={() => setView(0)}>Exit</Button>
        </div>
    );
}
