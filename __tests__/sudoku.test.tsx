import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Sudoku from '../app/sudoku';
import { mockStartingGrid, mockCompletedGrid } from './mockData';

const pushSpy = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter() {
        return ({
            push: pushSpy,
        });
    },
}));

describe('GIVEN the Sudoku Component', () => {
    const mockProps = {
        gridSize: 9,
        gridUnitSize: 3,
        validNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        startingGrid: mockStartingGrid,
        completeGrid: mockCompletedGrid,
    };
    beforeEach(() => {
        render(<Sudoku props={mockProps} />);
    });
    describe('WHEN user selects a square in the Sudoku grid', () => {
        describe('AND square is empty', () => {
            test('THEN square should be highlighted', () => {
                const square = screen.getByTestId('unit1-cell5');
                expect(square).not.toHaveClass('bg-slate-400/25');
                fireEvent.click(square);
                expect(square).toHaveClass('bg-slate-400/25');
            });
        });
        describe('AND square is NOT empty', () => {
            test('THEN square should be disabled', () => {
                const square = screen.getByTestId('unit1-cell4');
                fireEvent.click(square);
                expect(square).not.toHaveClass('bg-slate-400/25');
                expect(square).toBeDisabled();
            });
        });
    });
    describe('WHEN user sends keyboard input', () => {
        describe('AND keyboard input is a number between 1 and 9', () => {
            test('THEN the sudoku grid is updated', () => {
                const square = screen.getByTestId('unit1-cell5');
                expect(square.textContent).toBe('');
                fireEvent.click(square);
                act(() => {
                    const event = new KeyboardEvent('keyup', { key: '5' });
                    document.dispatchEvent(event);
                });
                expect(square.textContent).toBe('5');
            });
        });
    });
    describe('WHEN user guesses a number', () => {
        describe('AND guess is incorrect', () => {
            test('THEN number is shown in red', () => {
                const square = screen.getByTestId('unit1-cell5');
                fireEvent.click(square);
                act(() => {
                    const event = new KeyboardEvent('keyup', { key: '9' });
                    document.dispatchEvent(event);
                });
                expect(square).toHaveClass('text-red-600');
            });
        });
        describe('AND guess is correct', () => {
            test('THEN number is NOT shown in red', () => {
                const square = screen.getByTestId('unit1-cell5');
                fireEvent.click(square);
                act(() => {
                    const event = new KeyboardEvent('keyup', { key: '5' });
                    document.dispatchEvent(event);
                });
                expect(square).not.toHaveClass('text-red-600');
            });
        });
    });
    describe('WHEN user removes a guess', () => {
        test('THEN grid should be updated', () => {
            const square = screen.getByTestId('unit1-cell5');
            fireEvent.click(square);
            act(() => {
                const event = new KeyboardEvent('keyup', { key: '9' });
                document.dispatchEvent(event);
            });
            expect(square.textContent).toBe('9');
            act(() => {
                const event = new KeyboardEvent('keyup', { key: 'Backspace' });
                document.dispatchEvent(event);
            });
            expect(square.textContent).toBe('');
        });
    });
    describe('WHEN user gets a hint', () => {
        test('THEN selected cell should be filled with correct number', () => {
            const square = screen.getByTestId('unit1-cell5');
            fireEvent.click(square);
            expect(square.textContent).toBe('');
            const hintButton = screen.getByRole('button', { name: /Hint/i });
            fireEvent.click(hintButton);
            expect(square.textContent).toBe('5');
        });
    });
    describe('WHEN user makes too many mistakes', () => {
        test('THEN game ends and New Game popup is shown', () => {
            const mistakes = screen.getByTestId('mistakes');
            const square = screen.getByTestId('unit1-cell5');
            fireEvent.click(square);
            const event = new KeyboardEvent('keyup', { key: '9' });
            act(() => {
                document.dispatchEvent(event);
            });
            expect(mistakes.textContent).toBe('1/3');
            act(() => {
                document.dispatchEvent(event);
            });
            expect(mistakes.textContent).toBe('2/3');
            act(() => {
                document.dispatchEvent(event);
            });
            expect(mistakes.textContent).toBe('3/3');
            act(() => {
                document.dispatchEvent(event);
            });
            expect(pushSpy).toHaveBeenCalledWith('/newGameForm?title=lost');
        });
    });
});
