import React, { useEffect, useState } from 'react'
import { JOB_DETAIL } from '../../constants/APIEndPoints';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getService } from '../../services/apiServices';
import JobDetailHeader from './components/JobDetailHeader';
import APIToHTML from '../../components/APIToHTML';
import JobOpenings from './components/JobOpenings';
import Loader from '../../components/Loader';
import JobShare from '../../components/JobShare';
import { ChevronLeft } from '@mui/icons-material';
import usePageTitle from '../../hook/usePageTitle';


function JobDetails() {
    const { id } = useParams();
    const [jobInfo, setJobInfo] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const jobData = useSelector(state => state.jobSlice.jobs)
    const navigate = useNavigate();
    usePageTitle(jobInfo.title || "Loading...");

    useEffect(() => {
        fetchJobDetail(id);
    }, [id])

    async function fetchJobDetail(jobId) {
        try {
            setIsloading(true);
            const response = await getService(JOB_DETAIL.replace(':id', jobId));
            setJobInfo({ ...response });

        } catch (error) {
            console.log(error);
        } finally {
            setIsloading(false);
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="job-details-container">
            <button
                className='back-btn'
                onClick={() => navigate('/')}
            >
                <ChevronLeft className="" />
                <span className='mx-3'>
                    back
                </span>
            </button>
            {
                Object.keys(jobInfo).length ?
                    (
                        <div className="flex flex-col">
                            <JobDetailHeader jobInfo={jobInfo} />
                            <hr />
                            {
                                jobInfo.description ?
                                    (
                                        <div className="grid grid-cols-8 my-7">
                                            <section className='col-span-8 sm:col-span-6 md:col-span-6 mr-0 md:mr-3 mb-8'>
                                                <APIToHTML data={jobInfo.description} />
                                            </section>
                                            <section className="col-span-8 sm:col-span-2 md:col-span-2">
                                                <JobOpenings jobInfo={jobInfo} jobData={jobData} jobId={id} />
                                                <section className="my-5">
                                                    <JobShare jobInfo={jobInfo} />
                                                </section>
                                            </section>
                                        </div>
                                    ) : null
                            }
                        </div>
                    ) : <Loader />
            }
        </div>
    )
}

export default JobDetails;