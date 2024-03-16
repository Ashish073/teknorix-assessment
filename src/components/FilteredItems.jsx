import React from 'react'
import { Close } from '@mui/icons-material';

function FilteredItems({ selectedOption, clearFilter }) {
    return (
        <div>
            {Object.values(selectedOption).filter(option => option !== null).length > 0 && (
                <div className="filtered-chip-container">
                    <div className="flex justify-start items-start flex-wrap">
                        {Object.entries(selectedOption).map(([key, value]) => (
                            value !== null && (
                                <div key={value.value} className="filtered-chip">
                                    <span className="mr-3">{value.label}</span>
                                    <button className="text-neutral-400 font-thin" onClick={() => clearFilter(key)}>
                                        <Close />
                                    </button>
                                </div>
                            )
                        ))}
                    </div>
                    <button className="text-green-500" onClick={() => clearFilter()}>
                        Clear All
                    </button>
                </div>
            )}
        </div>
    )
}

export default FilteredItems