import React, { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
import { capitalizeFirstLetter } from '../../utils/helpers';

import './autocomplete.css';

type AutocompleteProps = {
    initialValue: string;
    label: string;
    error: string;
    name: string;
    startSearch: (value: string) => void;
    handleOptionClick: (params: {
        field: string;
        value: string | null;
    }) => void;
    loading: boolean;
    results: [{ id: string; name: string }] | [];
};

const Autocomplete = ({
    initialValue,
    label,
    error,
    name,
    startSearch,
    handleOptionClick,
    loading,
    results,
}: AutocompleteProps) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [openMenu, setOpenMenu] = useState(false);

    const closeMenu = () => {
        setOpenMenu(false);
        document.removeEventListener('click', closeMenu);
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleOptionClick({ field: name, value: null });
        let openMenu = false;
        if (event.target.value.length >= 3) {
            openMenu = true;
            startSearch(event.target.value);
        }
        setInputValue(event.target.value);
        setOpenMenu(openMenu);
        document.addEventListener('click', closeMenu);
    };

    const openSearchMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (inputValue === initialValue) {
            return;
        }

        if (inputValue !== '') {
            setOpenMenu(true);
            document.addEventListener('click', closeMenu);
        }
    };

    const onOptionClick = (result: { id: string; name: string }) => {
        handleOptionClick({ field: name, value: result.id });
        setInputValue(result.name);
        setOpenMenu(false);
    };

    const renderOptions = () => {
        if (loading) {
            return (
                <div className="autocomplete-menu">
                    <div className="autocomplete-menu-option">Searching...</div>
                </div>
            );
        }
        if (results.length < 1) {
            return (
                <div className="autocomplete-menu">
                    <div className="autocomplete-menu-option">
                        No Results found for {inputValue}
                    </div>
                </div>
            );
        }
        return (
            <div className="autocomplete-menu">
                {results.map(result => (
                    <div
                        className="autocomplete-menu-option"
                        key={result.id}
                        onClick={() => onOptionClick(result)}
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex={0}
                    >
                        <p>{capitalizeFirstLetter(result.name)}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="autocomplete-container">
            <label htmlFor={name}>{label}</label>
            <div className="input-wrapper">
                <input
                    name={name}
                    className="field-input search"
                    value={inputValue}
                    onChange={e => inputChangeHandler(e)}
                    onClick={openSearchMenu}
                    id={name}
                />
                <div className="autocomplete-icon">
                    {/* <FaSearch
                        className="search-icon"
                        // onClick={openSearchMenu}
                        // icon="search"
                    /> */}
                </div>
                {openMenu && renderOptions()}
            </div>

            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Autocomplete;
