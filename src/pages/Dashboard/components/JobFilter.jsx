import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedJobs } from '../../../redux/slices/jobSlice';
import SearchableSelect from '../../../components/SearchableSelect';
import AutoCompleteTextField from '../../../components/AutoCompleteTextField';
import FilteredItems from '../../../components/FilteredItems';

const initialSelectedOption = { department: null, location: null, functions: null, searchedText: null };

function JobFilter() {
    const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
    const dispatch = useDispatch();
    const { departments, locations, functions, jobsArray, jobsList, searchedJobs } = useSelector(state => state.jobSlice);

    const handleChange = (option, key) => {
        setSelectedOption(prev => ({ ...prev, [key]: option }));
    };

    const clearFilter = (opt = null) => {
        if (opt) {
            setSelectedOption(prev => ({ ...prev, [opt]: null }));
            dispatch(setSearchedJobs(jobsArray));
        } else {
            setSelectedOption(initialSelectedOption);
            dispatch(setSearchedJobs(jobsArray));
        }
    };

    const getJobSuggestions = (searchText) => {
        searchText = searchText.toLowerCase();
        return jobsList.filter(obj => obj.title.toLowerCase().includes(searchText));
    };

    const handleSelectedSuggestion = (suggestion) => {
        setSelectedOption(prev => ({ ...prev, searchedText: { label: suggestion.title, value: suggestion.id } }));
    };

    useEffect(() => {
        const searchedData = () => {
            let filteredJobs = jobsArray;
            if (selectedOption?.searchedText?.value) {
                filteredJobs = filteredJobs.map(department => ({
                    ...department,
                    jobs: department.jobs.filter(job => job.id === selectedOption.searchedText.value)
                }));
            } else {
                Object.keys(selectedOption).forEach(option => {
                    if (selectedOption[option]?.value) {
                        filteredJobs = filteredJobs.map(department => ({
                            ...department,
                            jobs: department.jobs.filter(job => job[option === "functions" ? "function" : option]?.id === selectedOption[option].value)
                        }));
                    }
                });
            }
            dispatch(setSearchedJobs(filteredJobs));
        };

        searchedData();
    }, [selectedOption, dispatch, jobsArray]);

    return (
        <div className='mx-2'>
            <div className="bg-zinc-100 flex justify-between items-center flex-col p-8">
                <div className='mb-8 w-full'>
                    <AutoCompleteTextField
                        onFieldChange={getJobSuggestions}
                        onSelection={handleSelectedSuggestion}
                        resetOnSelection
                        notFoundMessage="No jobs found!"
                        disabled={!!selectedOption.searchedText?.value}
                    />
                </div>
                <div className="flex flex-col justify-between items-center w-full md:flex-row lg:flex-row">
                    {['department', 'location', 'functions'].map((key, index) => (
                        <div key={index} className={`mb-3 sm:mb-3 md:mb-0 ${index === 1 ? 'sm:mx-0 md:mx-5' : ''} w-full`}>
                            <SearchableSelect
                                value={selectedOption[key] || null}
                                options={key === 'department' ? departments : (key === 'location' ? locations : functions)}
                                fieldKey={key}
                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                onChange={handleChange}
                                resetOnSelect
                                disabled={!!selectedOption[key]?.value}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <FilteredItems clearFilter={clearFilter} selectedOption={selectedOption} />
        </div>
    );
}

export default JobFilter;
