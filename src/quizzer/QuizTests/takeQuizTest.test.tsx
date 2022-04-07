import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quizzer } from "../Quizzer";

describe("TakeQuiz Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
        const takeQuiz = screen.getByTestId("takeQuiz-button");
        takeQuiz.click();
    });
    test("Check that Quiz and Question exist", () => {
        expect(screen.getByText("Quiz 1: Math")).toBeInTheDocument();
        expect(screen.getByText("Question 1")).toBeInTheDocument();
        expect(screen.getByText("Questions 2")).toBeInTheDocument();
        expect(screen.getByText("Question 3")).toBeInTheDocument();
    });
    test("Check for forms", () => {
        expect(screen.queryAllByRole("textbox")).toHaveLength(1);
        expect(screen.queryAllByRole("radio")).toHaveLength(6);
    });
    test("Check that quiz is empty with 0 points", () => {
        expect(screen.getByText("You received 0 points")).toBeInTheDocument();
        expect(screen.queryAllByText("Incorrect")).toHaveLength(3);
        expect(screen.queryAllByText("Correct")).toHaveLength(0);
    });
    test("Check answers", () => {
        const question3 = screen.getByTestId("2-textbox");
        userEvent.type(question3, "9");
        expect(screen.queryAllByText("Incorrect")).toHaveLength(3);
        expect(screen.queryAllByText("Correct")).toHaveLength(0);
        expect(screen.getByText("You received 0 points")).toBeInTheDocument();
    });
    test("Check answers", () => {
        const question3 = screen.getByTestId("2-textbox");
        userEvent.type(question3, "8");
        expect(screen.queryAllByText("Incorrect")).toHaveLength(2);
        expect(screen.queryAllByText("Correct")).toHaveLength(1);
        expect(screen.getByText("You received 2 points")).toBeInTheDocument();
    });
    test("Check multiple choice", () => {
        const radios = screen.getAllByRole("radio");
        radios[0].click();
        expect(screen.queryAllByText("Incorrect")).toHaveLength(3);
        expect(screen.queryAllByText("Correct")).toHaveLength(0);
        expect(screen.getByText("You received 0 points")).toBeInTheDocument();

        radios[1].click();
        expect(screen.queryAllByText("Incorrect")).toHaveLength(3);
        expect(screen.queryAllByText("Correct")).toHaveLength(0);
        expect(screen.getByText("You received 0 points")).toBeInTheDocument();

        radios[2].click();
        expect(screen.queryAllByText("Incorrect")).toHaveLength(2);
        expect(screen.queryAllByText("Correct")).toHaveLength(1);
        expect(screen.getByText("You received 1 points")).toBeInTheDocument();
    });
    test("Check multiple choice", () => {
        const radios = screen.getAllByRole("radio");
        radios[3].click();
        expect(screen.queryAllByText("Incorrect")).toHaveLength(2);
        expect(screen.queryAllByText("Correct")).toHaveLength(1);
        expect(screen.getByText("You received 2 points")).toBeInTheDocument();

        radios[4].click();
        expect(screen.queryAllByText("Incorrect")).toHaveLength(3);
        expect(screen.queryAllByText("Correct")).toHaveLength(0);
        expect(screen.getByText("You received 0 points")).toBeInTheDocument();

        radios[5].click();
        expect(screen.queryAllByText("Incorrect")).toHaveLength(3);
        expect(screen.queryAllByText("Correct")).toHaveLength(0);
        expect(screen.getByText("You received 0 points")).toBeInTheDocument();
    });
    test("Check reset", () => {
        const resetButton = screen.getByTestId("reset-button");
        const question3 = screen.getByTestId("2-textbox");
        const radios = screen.getAllByRole("radio");

        userEvent.type(question3, "8");
        radios[2].click();
        radios[3].click();

        expect(screen.queryAllByText("Correct")).toHaveLength(3);
        expect(screen.queryAllByText("Incorrect")).toHaveLength(0);
        expect(screen.getByText("You received 5 points")).toBeInTheDocument();

        resetButton.click();

        expect(screen.queryAllByText("Incorrect")).toHaveLength(3);
        expect(screen.queryAllByText("Correct")).toHaveLength(0);
        expect(screen.getByText("You received 0 points")).toBeInTheDocument();
    });
    test("Test that exit", () => {
        const exitButton = screen.getByTestId("take-exit-button");
        exitButton.click();
        expect(screen.getByText("Select a Quiz:")).toBeInTheDocument();
    });
    test("Test that the show publish questions checkbox works", () => {
        const Switch = screen.getByTestId("take-published-switch");

        Switch.click();
        expect(screen.queryByText("Question 3")).not.toBeInTheDocument();

        Switch.click();
        expect(screen.getByText("Question 3")).toBeInTheDocument();
    });
});
