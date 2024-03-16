import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getService } from '../../services/apiServices';
import { JOB_LIST, JOB_DEPARTMENTS, JOB_LOCATION, JOB_FUNCTIONS } from '../../constants/APIEndPoints';
import {
    setJobs,
    setJobsArray,
    setFunctions,
    setDepartments,
    setLocations,
    setSearchedJobs,
    setJobsList
} from '../../redux/slices/jobSlice';
import JobFilter from './components/JobFilter';
import JobsCard from '../../components/JobsCard';
import usePageTitle from '../../hook/usePageTitle';

function Dashboard() {
    const searchedJobsArray = useSelector(state => state.jobSlice.searchedJobs);
    const dispatch = useDispatch();
    usePageTitle('Career Opportunities at Teknorix' || 'Loading...');

    useEffect(() => {
        fetchJobsList();
    }, []);

    async function fetchJobsList() {
        try {
            const response = await Promise.all([
                getService(JOB_DEPARTMENTS),
                getService(JOB_LIST),
                getService(JOB_LOCATION),
                getService(JOB_FUNCTIONS)
            ]);
            processApiData(response);
        } catch (error) {
            console.log(error);
        }
    }

    function processApiData(data) {
        const [departments, jobs, locations, functions] = data;
        const departmentData = departments.map(item => ({ label: item.title, value: item.id }));
        const locationData = locations.map(item => ({ label: item.title, value: item.id }));
        const functionData = functions.map(item => ({ label: item.title, value: item.id }));

        const finalData = departments.map(item => ({
            label: item.title,
            jobs: jobs.filter(job => job.department.id === item.id)
        }));

        const finalDataObj = departments.reduce((obj, item) => {
            obj[item.id] = jobs.filter(job => job.department.id === item.id);
            return obj;
        }, {});

        dispatch(setLocations(locationData));
        dispatch(setDepartments(departmentData));
        dispatch(setFunctions(functionData));
        dispatch(setJobs(finalDataObj));
        dispatch(setSearchedJobs(finalData));
        dispatch(setJobsArray(finalData));
        dispatch(setJobsList(jobs));
    }

    return (
        <div className="mx-5 md:mx-0">
            <h1 className="text-[72px] font-semibold my-3">Current Openings</h1>
            <JobFilter />
            {searchedJobsArray.length ? (
                searchedJobsArray.map((department, index) => (
                    <div className="my-9 mx-3" key={`${department.value}_${index}`}>
                        {department.jobs.length ? (
                            <div className="flex-col flex justify-center items-start">
                                <div className="relative mb-8 mx-2">
                                    <h1 className="text-3xl font-bold text-left">{department.label}</h1>
                                    <div className="bg-blue-400 h-1 semi-blue-underline"></div>
                                </div>
                                <ul className="w-full list-disc">
                                    {department.jobs.map(job => (
                                        <li key={job.id} className="w-full list-none">
                                            <JobsCard job={job} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                ))
            ) : (
                <div className="mt-10 text-2xl text-neutral-400">Currently No Jobs Available</div>
            )}
        </div>
    );
}

export default Dashboard;
