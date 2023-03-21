import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserRow from "../components/UserRow";

const user = {
    _id: "63e28c4d022d0ec52da66e43",
    email: "test@mail.com",
    name: "Test",
    surname: "Bot",
    city: "BotCity",
    dateOfBirth: "5/10/2000"
}

const MockUserRow = (() => {
    return (
        <BrowserRouter>
            <UserRow user={user}/>
        </BrowserRouter>
    )
})

test('renders user data', () => {
    render(<MockUserRow/>)
    const name = screen.getByText(user.name + " " + user.surname)
    const email = screen.getByText(user.email)
    const city = screen.getByText(user.city)
    const dateOfBirth = screen.getByText(new Date (user.dateOfBirth).toLocaleDateString("en-GB"))

    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(city).toBeInTheDocument()
    expect(dateOfBirth).toBeInTheDocument()
})

test('expect link to hold user id', () => {
    render(<MockUserRow/>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', expect.stringContaining(user._id))
})