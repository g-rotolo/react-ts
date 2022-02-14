import React, { useState } from 'react';
import Autocomplete from '../Autocomplete/Autocomplete';

function Form() {
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
        <div>
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

export default Form;
