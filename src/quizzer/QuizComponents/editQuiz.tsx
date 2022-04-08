import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Quiz } from "../quizInterface/quiz";
import { Question } from "../../interfaces/question";
import { Button } from "react-bootstrap";

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
    function moveUp() {
        const newQuestions: Question[] = [...editQuiz.questions];
        const newQuestion: Question = { ...question, id: question.id - 1 };
        const upperQuestion: Question = {
            ...editQuiz.questions[question.id - 1],
            id: question.id
        };
        newQuestions.splice(question.id - 1, 1, newQuestion);
        newQuestions.splice(question.id, 1, upperQuestion);
        const newQ: Quiz = { ...editQuiz, questions: newQuestions };
        setEditQuiz(newQ);
    }
    function moveDown() {
        const newQuestions: Question[] = [...editQuiz.questions];
        const newQuestion: Question = { ...question, id: question.id + 1 };
        const upperQuestion: Question = {
            ...editQuiz.questions[question.id + 1],
            id: question.id
        };
        newQuestions.splice(question.id + 1, 1, newQuestion);
        newQuestions.splice(question.id, 1, upperQuestion);
        const newQ: Quiz = { ...editQuiz, questions: newQuestions };
        setEditQuiz(newQ);
    }
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
                key={question.id.toString() + "-name"}
                value={question.name}
                onChange={updateQuestionName}
                id={question.id.toString() + "-name"}
                data-testid={question.id.toString() + "-name"}
            />
            <Form.Label>Question Body:</Form.Label>
            <Form.Control
                key={question.id.toString() + "-body"}
                value={question.body}
                onChange={updateQuestionBody}
                id={question.id.toString() + "-body"}
                data-testid={question.id.toString() + "-body"}
            />
            <Form.Check
                key={question.id.toString() + "-type-multiple"}
                type="radio"
                onChange={updateQuestionType}
                label="Multiple choice"
                value="multiple_choice_question"
                id={question.id.toString() + "-type-multiple"}
                checked={questionType === "multiple_choice_question"}
                data-testid={question.id.toString() + "-type-multiple"}
            />
            <Form.Check
                key={question.id.toString() + "-type-short"}
                type="radio"
                onChange={updateQuestionType}
                label="Short answer"
                value="short_answer_question"
                id={question.id.toString() + "-type-short"}
                checked={questionType === "short_answer_question"}
                data-testid={question.id.toString() + "-type-short"}
            />
            <Form.Label>Question Options:</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                value={question.options}
                onChange={updateQuestionOptions}
                data-testid={question.id.toString() + "-options"}
            />
            <Form.Label>Question Expected:</Form.Label>
            <Form.Control
                key={question.id.toString() + "-expected"}
                value={question.expected}
                onChange={updateQuestionExpected}
                id={editQuiz.id.toString()}
                data-testid={question.id.toString() + "-expected"}
            />
            <Form.Label>Question Points:</Form.Label>
            <Form.Control
                key={question.id.toString() + "-points"}
                value={question.points}
                onChange={updateQuestionPoints}
                id={question.id.toString() + "-points"}
                data-testid={question.id.toString() + "-points"}
            />
            <Form.Check
                key={question.id.toString() + "-published"}
                type="switch"
                onChange={updateQuestionPublished}
                label="Published"
                id={question.id.toString() + "-published"}
                data-testid={question.id.toString() + "-published"}
                checked={questionPublished}
            />
            <Button
                onClick={moveUp}
                disabled={question.id === editQuiz.questions[0].id}
            >
                Move up
            </Button>
            <Button
                onClick={moveDown}
                disabled={
                    question.id ===
                    editQuiz.questions[editQuiz.questions.length - 1].id
                }
            >
                Move down
            </Button>
        </div>
    );
}

export function EditQuiz({
    editQ,
    quizzes,
    index,
    setQuizzes,
    setQuiz,
    setView
}: {
    editQ: Quiz;
    quizzes: Quiz[];
    index: number;
    setQuizzes: (newQuiz: Quiz[]) => void;
    setQuiz: (newIndex: number) => void;
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
    function removeQuizzes() {
        quizzes.splice(index, 1);
        setQuizzes(quizzes);
        setQuiz(0);
        setView(0);
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
                data-testid={editQ.id.toString() + "-quiz"}
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
            <Button onClick={addQuestion} data-testid="edit-add-button">
                Add Question
            </Button>
            <hr></hr>
            <Button onClick={saveQuizzes} data-testid="edit-save-button">
                Save
            </Button>
            <Button onClick={removeQuizzes} data-testid="edit-remove-button">
                Remove
            </Button>
            <Button onClick={() => setView(0)} data-testid="edit-exit-button">
                Exit
            </Button>
        </div>
    );
}
