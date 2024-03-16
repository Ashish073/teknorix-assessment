import React, { useState, useRef, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

function AutoCompleteTextField({ onFieldChange, onSelection, resetOnSelection = false, notFoundMessage = "Not found!", disabled }) {
    const [searchedText, setSearchedText] = useState('');
    const [suggestionList, setSuggestionList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const inputRef = useRef(null);
    const suggestionListRef = useRef(null);

    useEffect(() => {
        const closeSuggestionBox = (event) => {
            if (!inputRef?.current?.contains(event.target) && !suggestionListRef.current?.contains(event.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener('mousedown', closeSuggestionBox);

        return () => {
            document.removeEventListener('mousedown', closeSuggestionBox);
        };
    }, []);

    const onSearchTextChange = (e) => {
        const searchText = e.target.value;
        setSearchedText(searchText);
        const list = onFieldChange(searchText);
        setExpanded(true);
        setSuggestionList(list || []);
    };

    const handleSelection = (suggestion) => {
        const selectedText = resetOnSelection ? '' : suggestion?.label || suggestion?.title;
        setSearchedText(selectedText);
        setExpanded(false);
        setSuggestionList([]);
        onSelection(suggestion);
        setFocusedIndex(0);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' || e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex((prevIndex) => (prevIndex + 1) % suggestionList.length);
        } else if (e.key === 'Enter') {
            handleSelection(suggestionList[focusedIndex]);
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex((prevIndex) => (prevIndex === 0 ? suggestionList.length - 1 : prevIndex - 1));
        }
    };

    useEffect(() => {
        if (focusedIndex !== null && suggestionListRef.current?.children) {
            suggestionListRef.current.children[focusedIndex]?.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
            });
        }
    }, [focusedIndex]);

    return (
        <div className="relative">
            <TextField
                fullWidth
                disabled={disabled}
                value={searchedText}
                onChange={onSearchTextChange}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                className="bg-white rounded-sm no-outline"
                placeholder="Search for Job"
                ref={inputRef}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
            {expanded && (
                <div className="autocomplete-textfield-suggestion-box" tabIndex="0">
                    <ul ref={suggestionListRef}>
                        {suggestionList.length ? (
                            suggestionList.map((suggestion, index) => (
                                <li
                                    key={suggestion.label || suggestion.title}
                                    className={`autocomplete-textfield ${focusedIndex === index ? 'bg-blue-400 text-white' : ''}`}
                                    onClick={() => handleSelection(suggestion)}
                                    onKeyDown={(e) => handleKeyDown(e, suggestion)}
                                >
                                    <span>{suggestion?.label || suggestion?.title}</span>
                                </li>
                            ))
                        ) : (
                            <li className="rounded-md p-3 bg-gray-200">{notFoundMessage}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AutoCompleteTextField;
