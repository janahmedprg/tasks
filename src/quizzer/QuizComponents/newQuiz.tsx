import React, { useState } from "react";
import { Quiz } from "../quizInterface/quiz";
import { EditQuiz } from "./editQuiz";

export function NewQuiz({
    quizzes,
    setQuizzes,
    setQuiz,
    setView
}: {
    quizzes: Quiz[];
    setQuizzes: (newQuiz: Quiz[]) => void;
    setQuiz: (newIndex: number) => void;
    setView: (newView: number) => void;
}): JSX.Element {
    const index: number = quizzes.length;
    const newQuiz: Quiz = {
        id: quizzes.length,
        title: "New Quiz",
        description: "",
        questions: []
    };
    const [editQuiz] = useState<Quiz>(newQuiz);
    return (
        <div>
            <hr></hr>
            <EditQuiz
                editQ={editQuiz}
                quizzes={quizzes}
                index={index}
                setQuizzes={setQuizzes}
                setQuiz={setQuiz}
                setView={setView}
            />
        </div>
    );
}
