import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quizzer } from "../Quizzer";

describe("EditQuizView Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
        const takeQuiz = screen.getByTestId("editQuiz-button");
        takeQuiz.click();
    });
    test("Test all fields", () => {
        expect(screen.getByTestId("0-quiz")).toBeInTheDocument();

        expect(screen.getByTestId("0-name")).toBeInTheDocument();
        expect(screen.getByTestId("0-body")).toBeInTheDocument();
        expect(screen.getByTestId("0-type-multiple")).toBeInTheDocument();
        expect(screen.getByTestId("0-type-short")).toBeInTheDocument();
        expect(screen.getByTestId("0-options")).toBeInTheDocument();
        expect(screen.getByTestId("0-expected")).toBeInTheDocument();
        expect(screen.getByTestId("0-points")).toBeInTheDocument();
        expect(screen.getByTestId("0-published")).toBeInTheDocument();

        expect(screen.getByTestId("1-name")).toBeInTheDocument();
        expect(screen.getByTestId("1-body")).toBeInTheDocument();
        expect(screen.getByTestId("1-type-multiple")).toBeInTheDocument();
        expect(screen.getByTestId("1-type-short")).toBeInTheDocument();
        expect(screen.getByTestId("1-options")).toBeInTheDocument();
        expect(screen.getByTestId("1-expected")).toBeInTheDocument();
        expect(screen.getByTestId("1-points")).toBeInTheDocument();
        expect(screen.getByTestId("1-published")).toBeInTheDocument();

        expect(screen.getByTestId("2-name")).toBeInTheDocument();
        expect(screen.getByTestId("2-body")).toBeInTheDocument();
        expect(screen.getByTestId("2-type-multiple")).toBeInTheDocument();
        expect(screen.getByTestId("2-type-short")).toBeInTheDocument();
        expect(screen.getByTestId("2-options")).toBeInTheDocument();
        expect(screen.getByTestId("2-expected")).toBeInTheDocument();
        expect(screen.getByTestId("2-points")).toBeInTheDocument();
        expect(screen.getByTestId("2-published")).toBeInTheDocument();
    });
    test("Test edit", () => {
        const quizField = screen.getByTestId("0-quiz");
        const nameField = screen.getByTestId("0-name");
        const bodyField = screen.getByTestId("0-body");
        const typeField = screen.getByTestId("0-type-short");
        const optionsField = screen.getByTestId("0-options");
        const expectedField = screen.getByTestId("0-expected");
        const pointsField = screen.getByTestId("0-points");
        const publishedField = screen.getByTestId("0-published");

        userEvent.type(quizField, "{selectall}{del}Quiz 1: Mathematics");
        userEvent.type(nameField, "{selectall}{del}Q1");
        userEvent.type(
            bodyField,
            "{selectall}{del}What is 2+7-(2+6)/2 equal to?"
        );
        typeField.click();
        userEvent.type(optionsField, "{selectall}{del}");
        userEvent.type(expectedField, "{selectall}{del}5");
        userEvent.type(pointsField, "{selectall}{del}3");
        publishedField.click();

        screen.getByTestId("edit-save-button").click();
        screen.getByTestId("edit-exit-button").click();

        screen.getByTestId("takeQuiz-button").click();

        expect(screen.getByText("Quiz 1: Mathematics")).toBeInTheDocument();
        expect(screen.getByText("Q1")).toBeInTheDocument();
        const radios = screen.getAllByRole("radio");
        expect(radios).toHaveLength(3);
        const textBox = screen.getByTestId("0-textbox");
        userEvent.type(textBox, "5");
        expect(screen.getByText("Correct")).toBeInTheDocument();

        screen.getByTestId("0-is-published").click();

        expect(screen.queryByText("Q1")).not.toBeInTheDocument();
    });
    test("Test exit", () => {
        const exitButton = screen.getByTestId("edit-exit-button");
        exitButton.click();
        expect(screen.getByText("Select a Quiz:")).toBeInTheDocument();
    });
    test("Test deletion", () => {
        const deleteButton = screen.getByTestId("edit-remove-button");
        deleteButton.click();
        expect(screen.queryByTestId("0-quiz")).not.toBeInTheDocument();
        expect(screen.getByRole("combobox")).toHaveLength(1);
    });
});
