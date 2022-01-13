import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Autocomplete from './Autocomplete';

const mockedHandler = jest.fn();

test('renders Autocomplete with default options and uses the right props', () => {
    render(
        <Autocomplete
            initialValue=""
            loading={false}
            label="Autocomplete"
            error=""
            name="field"
            startSearch={() => null}
            handleOptionClick={params => console.log(params)}
            results={[]}
        />
    );
    const label = screen.getByText('Autocomplete');
    const input = screen.getByLabelText(/autocomplete/i);
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
});

test('shows loading option if loading is true and the text is > 3 characters', () => {
    render(
        <Autocomplete
            initialValue=""
            loading={true}
            label="Autocomplete"
            error=""
            name="field"
            startSearch={() => null}
            handleOptionClick={mockedHandler}
            results={[]}
        />
    );
    fireEvent.change(screen.getByLabelText(/autocomplete/i), {
        target: { value: 'chuck' },
    });
    const loading = screen.getByText(/searching/i);
    expect(loading).toBeInTheDocument();
});

test('triggers startSearch if the text is > 3 characters', () => {
    render(
        <Autocomplete
            initialValue=""
            loading={true}
            label="Autocomplete"
            error=""
            name="field"
            startSearch={mockedHandler}
            handleOptionClick={mockedHandler}
            results={[]}
        />
    );
    fireEvent.change(screen.getByLabelText(/autocomplete/i), {
        target: { value: 'chuck' },
    });
    expect(mockedHandler).toHaveBeenCalled();
});

test('sets the input value correctly', () => {
    render(
        <Autocomplete
            initialValue=""
            loading={true}
            label="Autocomplete"
            error=""
            name="field"
            startSearch={mockedHandler}
            handleOptionClick={mockedHandler}
            results={[]}
        />
    );
    fireEvent.change(screen.getByLabelText(/autocomplete/i), {
        target: { value: 'chuck' },
    });
    const input = screen.getByDisplayValue(/chuck/i);
    expect(input).toBeInTheDocument();
});
