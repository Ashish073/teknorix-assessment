import React from 'react';
import { Business, LocationOn } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../routesConfig/routeConfig';

function JobsCard({ job, hideControls }) {
    const navigate = useNavigate();

    function navigateToDetails(path) {
        navigate(path)
    }

    return (
        <>
            <div className="jobs-card-container">
                <div className="flex flex-col justify-center items-start">
                    <Link to={config.job.path.replace(':id', job.id)} className="job-card-job-link">{job.title}</Link>
                    <div className="flex justify-start items-center flex-wrap mb-3">
                        <span className="flex items-center mr-2 text-gray-600 mt-1 text-xl">
                            <Business className='mr-2' />
                            <p className="text-left">{job.department.title}</p>
                        </span>
                        <span className="flex items-center mr-2 text-gray-600 mt-1 text-xl">
                            <LocationOn fontSize='small' className='mr-1' />
                            <p className="text-left">{job.location.title}</p>
                        </span>
                        <span className="job-chip">{job.type}</span>
                    </div>
                </div>
                <div className={`${hideControls ? 'hidden' : 'flex justify-start md:justify-end items-center'}`}>
                    <div className="mr-5">
                        <Link
                            to={job.applyUrl}
                            target='_blank'
                            className="job-card-apply-link"
                        >
                            <span className='capitalize rounded font-semibold px-3'>
                                Apply
                            </span>
                        </Link>
                    </div>
                    <button className="job-card-view-link" onClick={() => navigateToDetails(config.job.path.replace(':id', job.id))}>
                        <span className='capitalize font-semibold text-gray-600 px-5'>
                            View
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default JobsCard;