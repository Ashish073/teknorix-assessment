import React from 'react';
import { Business, LocationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function JobDetailHeader({ jobInfo }) {
    return (
        <>
            <div className="job-detail-header-container">
                <h3 className="mb-2 font-bold text-[20px]">{jobInfo?.department?.title} department at Teknorix Systems Goa</h3>
                <h1 className="text-3xl font-bold mb-2 text-[36px]">{jobInfo?.title}</h1>
                <div className="flex justify-start items-center mb-10 flex-wrap mt-4" >
                    <span className="flex items-center mr-2 text-gray-600 mt-1 md:mt-0">
                        <Business className='mr-2' />
                        <p className='text-xl'>{jobInfo?.department?.title}</p>
                    </span>
                    <span className="flex items-center mr-2 text-gray-600 mt-1 md:mt-0">
                        <LocationOn fontSize='small' className='mr-1' />
                        <p className='text-xl'>{jobInfo?.location?.title}</p>
                    </span>
                    <span className="bg-slate-300 px-5 uppercase text-xs font-bold p-1 text-gray-600 rounded-sm mt-3 md:mt-0">{jobInfo?.type}</span>
                </div>
                <div className="my-10">
                    <Link
                        to={jobInfo.applyUrl}
                        target='_blank'
                        className="job-details-header-apply-link"
                    >
                        <span className="capitalize px-10">
                            Apply
                        </span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default JobDetailHeader