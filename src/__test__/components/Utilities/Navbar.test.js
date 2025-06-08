import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navbar from "@/components/Utilities/Navbar";
 
describe('Navbar', () => {
  it('renders a navbar', () => {
    const page = render(<Navbar />)
    expect(page).toMatchSnapshot()
  })
})