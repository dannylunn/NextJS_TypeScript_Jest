import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('WHEN the root Page is rendered', () => {
    render(<Page />);
    test('THEN the New Game button is found in the document', () => {
        const button = screen.getByRole('link', { name: 'New Game' });
        expect(button).toBeInTheDocument();
    });
});
