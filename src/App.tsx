import React from 'react';
import Form from './components/Form/Form';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Form />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
