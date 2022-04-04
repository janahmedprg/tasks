import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Quiz } from "../quizInterface/quiz";
import { Question } from "../../interfaces/question";
import { Button } from "react-bootstrap";
import { addNewQuestion } from "../../nested";

export type QuestionType = "multiple_choice_question" | "short_answer_question";

export function EditQuestion({
    question,
    editQuiz,
    setEditQuiz
}: {
    question: Question;
    editQuiz: Quiz;
    setEditQuiz: (newQuiz: Quiz) => void;
}): JSX.Element {
    const [questionType, setQuestionType] = useState<QuestionType>(
        question.type
    );
    const [questionPublished, setQuestionPublished] = useState<boolean>(
        question.published
    );
    function updateQuestionName(event: React.ChangeEvent<HTMLInputElement>) {
        const newQue: Question[] = [...editQuiz.questions];
        const newQuestion: Question = {
            ...question,
            name: event.target.value
        };
        newQue.splice(question.id, 1, newQuestion);
        const newQ: Quiz = { ...editQuiz, questions: newQue };
        setEditQuiz(newQ);
    }
    function updateQuestionBody(event: React.ChangeEvent<HTMLInputElement>) {
        const newQue: Question[] = [...editQuiz.questions];
        const newQuestion: Question = {
            ...question,
            body: event.target.value
        };
        newQue.splice(question.id, 1, newQuestion);
        const newQ: Quiz = { ...editQuiz, questions: newQue };
        setEditQuiz(newQ);
    }
    function updateQuestionType(event: React.ChangeEvent<HTMLInputElement>) {
        setQuestionType(event.target.value as QuestionType);
        const newQue: Question[] = [...editQuiz.questions];
        const newQuestion: Question = {
            ...question,
            type: event.target.value as QuestionType
        };
        newQue.splice(question.id, 1, newQuestion);
        const newQ: Quiz = { ...editQuiz, questions: newQue };
        setEditQuiz(newQ);
    }
    function updateQuestionExpected(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const newQue: Question[] = [...editQuiz.questions];
        const newQuestion: Question = {
            ...question,
            expected: event.target.value
        };
        newQue.splice(question.id, 1, newQuestion);
        const newQ: Quiz = { ...editQuiz, questions: newQue };
        setEditQuiz(newQ);
    }
    function updateQuestionPoints(event: React.ChangeEvent<HTMLInputElement>) {
        const newQue: Question[] = [...editQuiz.questions];
        const newQuestion: Question = {
            ...question,
            points: parseInt(event.target.value)
        };
        newQue.splice(question.id, 1, newQuestion);
        const newQ: Quiz = { ...editQuiz, questions: newQue };
        setEditQuiz(newQ);
    }
    function updateQuestionOptions(event: React.ChangeEvent<HTMLInputElement>) {
        const newQue: Question[] = [...editQuiz.questions];
        const newQuestion: Question = {
            ...question,
            options: event.target.value.split(",")
        };
        newQue.splice(question.id, 1, newQuestion);
        const newQ: Quiz = { ...editQuiz, questions: newQue };
        setEditQuiz(newQ);
    }
    function updateQuestionPublished(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setQuestionPublished(event.target.checked);
        const newQue: Question[] = [...editQuiz.questions];
        const newQuestion: Question = {
            ...question,
            published: event.target.checked
        };
        newQue.splice(question.id, 1, newQuestion);
        const newQ: Quiz = { ...editQuiz, questions: newQue };
        setEditQuiz(newQ);
    }
    return (
        <div>
            <hr></hr>
            <Form.Label>Question Name:</Form.Label>
            <Form.Control
                key={editQuiz.id.toString()}
                value={question.name}
                onChange={updateQuestionName}
                id={editQuiz.id.toString()}
            />
            <Form.Label>Question Body:</Form.Label>
            <Form.Control
                key={editQuiz.id.toString()}
                value={question.body}
                onChange={updateQuestionBody}
                id={editQuiz.id.toString()}
            />
            <Form.Check
                key={question.id.toString()}
                type="radio"
                onChange={updateQuestionType}
                label="Multiple choice"
                value="multiple_choice_question"
                id={question.id.toString()}
                checked={questionType === "multiple_choice_question"}
            />
            <Form.Check
                key={question.id.toString()}
                type="radio"
                onChange={updateQuestionType}
                label="Short answer"
                value="short_answer_question"
                id={question.id.toString()}
                checked={questionType === "short_answer_question"}
            />
            <Form.Label>Question Options:</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                value={question.options}
                onChange={updateQuestionOptions}
            />
            <Form.Label>Question Expected:</Form.Label>
            <Form.Control
                key={editQuiz.id.toString()}
                value={question.expected}
                onChange={updateQuestionExpected}
                id={editQuiz.id.toString()}
            />
            <Form.Label>Question Points:</Form.Label>
            <Form.Control
                key={editQuiz.id.toString()}
                value={question.points}
                onChange={updateQuestionPoints}
                id={editQuiz.id.toString()}
            />
            <Form.Check
                key={question.id.toString()}
                type="switch"
                onChange={updateQuestionPublished}
                label="Published"
                id={question.id.toString()}
                checked={questionPublished}
            />
        </div>
    );
}

export function EditQuiz({
    editQ,
    quizzes,
    index,
    setQuizzes,
    setView
}: {
    editQ: Quiz;
    quizzes: Quiz[];
    index: number;
    setQuizzes: (newQuiz: Quiz[]) => void;
    setView: (newView: number) => void;
}): JSX.Element {
    const [editQuiz, setEditQuiz] = useState<Quiz>(editQ);
    function updateQuizTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const newQ: Quiz = { ...editQuiz, title: event.target.value };
        setEditQuiz(newQ);
    }
    function saveQuizzes() {
        quizzes.splice(index, 1, editQuiz);
        setQuizzes(quizzes);
    }
    function addQuestion() {
        const newQuestion: Question = {
            id: editQuiz.questions.length,
            name: "New Question",
            body: "Question Body",
            type: "multiple_choice_question",
            options: [],
            expected: "",
            points: 0,
            published: false
        };
        const newQuiz: Quiz = {
            ...editQuiz,
            questions: [...editQuiz.questions, newQuestion]
        };
        setEditQuiz(newQuiz);
    }
    return (
        <div>
            <Form.Label>Quiz Title:</Form.Label>
            <Form.Control
                key={editQuiz.id.toString()}
                value={editQuiz.title}
                onChange={updateQuizTitle}
                id={editQuiz.id.toString()}
            />
            {editQuiz.questions.map(
                (question: Question): JSX.Element => (
                    <EditQuestion
                        key={question.id}
                        question={question}
                        editQuiz={editQuiz}
                        setEditQuiz={setEditQuiz}
                    ></EditQuestion>
                )
            )}
            <hr></hr>
            <Button onClick={addQuestion}>Add Question</Button>
            <hr></hr>
            <Button onClick={saveQuizzes}>Save</Button>
            <Button onClick={() => setView(0)}>Exit</Button>
        </div>
    );
}
