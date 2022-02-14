import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { mockStore } from './store/store';

test('renders learn react link', () => {
    render(
        <Provider store={mockStore}>
            <App />
        </Provider>
    );
    const header = screen.getByText('Welcome');
    expect(header).toBeInTheDocument();
});
