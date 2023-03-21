import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "../components/Modal";


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }))

  
test('expect close button to change state', () => {
    const setOpen = jest.fn()
    
    render(<Modal handler={setOpen}>test</Modal>)
    const closeBtn = screen.getByRole('button')
    fireEvent.click(closeBtn)
    expect(setOpen).toHaveBeenCalled()
})
