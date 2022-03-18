import React, { useState } from "react";
import Form from "react-bootstrap/Form";

interface formProps {
    setIsStudent: (newIsStudent: boolean) => void;
    isStudent: boolean;
    setName: (newName: string) => void;
    name: string;
}

export function StudentForm({
    setIsStudent,
    isStudent,
    setName,
    name
}: formProps): JSX.Element {
    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function updateStudent(event: React.ChangeEvent<HTMLInputElement>) {
        setIsStudent(event.target.checked);
    }

    return (
        <div>
            <Form.Label>Name:</Form.Label>
            <Form.Control value={name} onChange={updateName} />

            <Form.Check
                type="switch"
                id="student"
                label="Is a student"
                checked={isStudent}
                onChange={updateStudent}
            />
        </div>
    );
}

export function EditMode(): JSX.Element {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isStudent, setIsStudent] = useState<boolean>(true);
    const [name, setName] = useState<string>("Your Name");

    function updateEdit(event: React.ChangeEvent<HTMLInputElement>) {
        setIsEdit(event.target.checked);
    }

    return (
        <div>
            <h3>Edit Mode</h3>
            <Form.Check
                type="switch"
                label="Edit mode"
                checked={isEdit}
                onChange={updateEdit}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            />

            <div>
                {isEdit ? (
                    <StudentForm
                        setIsStudent={setIsStudent}
                        isStudent={isStudent}
                        setName={setName}
                        name={name}
                    ></StudentForm>
                ) : (
                    <div>
                        {name} is {isStudent === true ? "" : "not"} a student
                    </div>
                )}
            </div>
        </div>
    );
}
