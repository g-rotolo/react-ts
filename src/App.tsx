import React, { useState } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete/Autocomplete';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<
        | [
              {
                  id: string;
                  name: string;
              }
          ]
        | []
    >([]);

    const searchHandler = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setOptions([
                {
                    id: '1',
                    name: 'OPTION 1',
                },
            ]);
        }, 1000);
    };

    return (
        <div className="App">
            <header className="App-header">Welcome</header>
            <Autocomplete
                initialValue=""
                loading={isLoading}
                label="Autocomplete"
                error=""
                name="field"
                startSearch={searchHandler}
                handleOptionClick={params => console.log(params)}
                results={options}
            />
        </div>
    );
}

export default App;
