import React, { useState, useEffect, useRef } from 'react';
import { TextField, ClickAwayListener, InputAdornment } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';

function SearchableSelect({ onChange, value, options, placeholder, label, fieldKey = null, resetOnSelect, disabled }) {
    const [open, setOpen] = useState(false);
    const [searchedOptions, setSearchedOption] = useState(value);
    const [selectedOption, setSelectedOption] = useState(value);
    const [focusedIndex, setFocusedIndex] = useState(value);

    const optionsRef = useRef();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleTextFieldChange = (e) => {
        if (!e.target.value) {
            setSearchedOption(e.target.value)
            setSelectedOption('')
        } else {
            setSearchedOption(e.target.value)
        }
        setOpen(true);
    }

    const handleOptions = () => {
        if (searchedOptions) {
            return options.filter((option) =>
                option.label.toLowerCase().includes(searchedOptions?.toLowerCase()));
        } else {
            return options
        }
    }

    const handleOptionClick = (item) => {
        if (resetOnSelect) {
            setSearchedOption('');
        } else {
            setSearchedOption(item?.label);
        }
        setSelectedOption(item?.label);

        onChange(item || '', fieldKey || null);
        handleClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' || e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
            setFocusedIndex((prevIndex) =>
                prevIndex === null ? 0 : (prevIndex + 1) % handleOptions().length
            );
        }
        if (e.key === 'Enter') {
            if (!selectedOption || !searchedOptions) {
                handleOptionClick(handleOptions()[focusedIndex]);
            }
        }
    };

    useEffect(() => {
        if (focusedIndex !== null && optionsRef.current?.children) {
            optionsRef?.current?.children[focusedIndex]?.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
            });
        }
    }, [focusedIndex])

    const handleKeyUp = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
            if (focusedIndex === 0) {
                setFocusedIndex(handleOptions().length - 1);
            } else {
                setFocusedIndex((prevIndex) =>
                    prevIndex === null ? 0 : (prevIndex - 1) % handleOptions().length
                );
            }
        }
    };

    return (
        <div className={`relative w-full mx-auto ${disabled ? 'pointer-events-none' : ''}`}>
            <TextField
                className="bg-white rounded no-outline"
                fullWidth
                disabled={disabled}
                placeholder={placeholder}
                label={label}
                value={searchedOptions || ''}
                onClick={handleOpen}
                onChange={handleTextFieldChange}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" disabled={disabled}>
                            <ArrowForwardIos fontSize="inherit" />
                        </InputAdornment>
                    ),
                }}
            />
            {
                open ?
                    (

                        <ClickAwayListener onClickAway={handleClose}>
                            <div className="bg-white rounded mt-1 p-1 max-h-52 overflow-auto dropdown-options drop-shadow-md z-50">
                                <ul ref={optionsRef}>
                                    {
                                        handleOptions()?.length || searchedOptions ?
                                            (
                                                handleOptions()?.length ? (handleOptions()?.map((item, index) => (
                                                    <li
                                                        className={`hover:bg-blue-300 p-2 cursor-pointer flex rounded text-left ${focusedIndex === index ? 'bg-blue-300' : ''
                                                            }`}
                                                        onMouseOver={() => setFocusedIndex(index)}
                                                        key={`${item.label}-${index}`} onClick={() => handleOptionClick(item)}
                                                    >
                                                        {item.label}
                                                    </li>
                                                ))) : (
                                                    <li>
                                                        No options found.
                                                    </li>
                                                )
                                            ) :
                                            (
                                                <li>
                                                    No options found.
                                                </li>
                                            )
                                    }
                                </ul>
                            </div>
                        </ClickAwayListener>
                    ) : null
            }
        </div>
    )
}

export default SearchableSelect