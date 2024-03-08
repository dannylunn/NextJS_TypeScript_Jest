import NumbersComponent from '@/app/numbersComponent';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('GIVEN the Numbers Component', () => {
    describe('WHEN user has NOT completed a number', () => {
        test('THEN number should be clickable', () => {
            render(<NumbersComponent
                numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                remainingNumbers={[40, 6, 4, 5, 5, 3, 3, 5, 3, 7]}
                gridSize={9}
                handler={jest.fn()}
            />);
            const nine = screen.getByTestId('input-9');
            expect(nine).not.toBeDisabled();
        });
    });
    describe('WHEN user has completed a number', () => {
        test('THEN number should NOT be clickable', () => {
            render(<NumbersComponent
                numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                remainingNumbers={[38, 6, 4, 5, 5, 3, 3, 5, 3, 9]}
                gridSize={9}
                handler={jest.fn()}
            />);
            const nine = screen.getByTestId('input-9');
            expect(nine).toBeDisabled();
        });
    });
});
