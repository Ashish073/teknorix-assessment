import React from 'react'
import { Business, LocationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { config } from '../../../routesConfig/routeConfig';

function JobOpenings({ jobData, jobInfo, jobId }) {
    const dataLength = jobData[jobInfo.department.id]?.filter(job => Number(job.id) !== Number(jobId))?.length
    return (
        <>
            {
                Object.keys(jobData).length ?
                    (
                        <div className='bg-blue-50 p-5 border max-h-max'>
                            <div className="relative mb-8 w-full">
                                <h1 className='text-2xl text-left font-bold uppercase'>Other Job Openings</h1>
                                <div className="bg-blue-400 h-1 semi-blue-underline"></div>
                            </div>
                            {
                                jobData[jobInfo.department.id].length && dataLength ?
                                    (
                                        jobData[jobInfo.department.id]?.filter(job => Number(job.id) !== Number(jobId))?.map(job => (
                                            <div className="mb-8" key={job.id}>
                                                <div className="flex flex-col justify-start items-start">
                                                    <Link to={config.job.path.replace(':id', job.id)} className="font-bold text-left job-link text-lg">{job.title}</Link>
                                                    <div className="flex justify-between items-center flex-wrap">
                                                        <span className="flex text-sm items-center mr-2 text-gray-600 text-left my-1">
                                                            <Business className='mr-2' fontSize="small" />
                                                            <p>{job.department.title}</p>
                                                        </span>
                                                        <span className="flex text-sm items-center mr-2 text-gray-600 text-left my-1">
                                                            <LocationOn fontSize='small' className='mr-1' />
                                                            <p>{job.location.title}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-lg text-left">No other jobs available for this department.</div>
                                    )
                            }
                        </div>
                    ) : null
            }
        </>
    )
}

export default JobOpenings