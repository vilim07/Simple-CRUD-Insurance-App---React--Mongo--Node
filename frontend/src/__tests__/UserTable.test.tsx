import { fireEvent, render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserTable from "../components/UserTable";

const users = [{
    _id: "63e28c4d022d0ec52da66e43",
    email: "test@mail.com",
    name: "Test",
    surname: "Bot",
    city: "BotCity",
    dateOfBirth: "5/10/2000"
}, {
    _id: "63e28c4d022d0ec52da66e22",
    email: "test2@mail.com",
    name: "Test",
    surname: "Buddy",
    city: "BotCity",
    dateOfBirth: "5/2/1999"
}]

const MockUserTable = (() => {
    return (
        <BrowserRouter>
            <UserTable users={users} />
        </BrowserRouter>
    )
})

test('expect modal to not be rendered', () => {
    render(<MockUserTable />)
    const modal = screen.queryByTestId('modal')

    expect(modal).not.toBeTruthy()
})

test('expect modal to open on button click', () => {
    render(<MockUserTable />)
    const btn = screen.getByText("+ Add New User")
    fireEvent.click(btn)
    const modal = screen.getByTestId('modal')
    
    expect(modal).toBeVisible()
})

test('expect list to contain items', () => {
    render(<MockUserTable />)
    const list = screen.getByRole('list')

    const { getAllByRole } = within(list)
    const listItems = getAllByRole('listitem')

    expect(listItems).toHaveLength(users.length)
})