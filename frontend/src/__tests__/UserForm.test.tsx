import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UserForm from "../components/UserForm";

const user = {
    _id: "63e28c4d022d0ec52da66e43",
    email: "test@mail.com",
    name: "Test",
    surname: "Bot",
    city: "BotCity",
    dateOfBirth: "5/10/2000"
}

/* const MockUserRow = (() => {
    return (
        <BrowserRouter>
            <UserRow user={user}/>
        </BrowserRouter>
    )
}) */


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    setOpen: jest.fn(),

  }))


test('expect form to be empty without data', () => {

    const setOpen = jest.fn()

    render(<UserForm handler={setOpen}/>)


    const fields = screen.getAllByTestId('input')

    fields.forEach(field => {
        expect(field).toHaveDisplayValue("")
    });

})

test('expect form to be prefilled', () => {

    const setOpen = jest.fn()

    render(<UserForm user={user} handler={setOpen}/>)


    const fields = screen.getAllByTestId('input')

    fields.forEach(field => {
        expect(field).not.toHaveDisplayValue("")
    });

})
