import { Facebook, LinkedIn } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import { LinkedinShareButton, FacebookShareButton, TwitterShareButton, XIcon } from 'react-share';

function JobShare({ jobInfo }) {
    const shareUrl = jobInfo.hostedUrl;
    return (
        <>
            <div className="relative mb-8 w-full">
                <h1 className='text-2xl text-left font-bold uppercase'>Share Job Openings</h1>
                <div className="bg-blue-400 h-1 semi-blue-underline"></div>
            </div>
            <div className="flex justify-start items-center">
                <FacebookShareButton url={shareUrl} title="Facebook" className="rounded-full p-3 border-2 border-black mr-3">
                    <div className="rounded-full p-[5px] border-2 border-black">
                        <Facebook fontSize="large" />
                    </div>
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl} title="Linkedin" className="rounded-full p-3 border-2 border-black mr-3">
                    <div className="rounded-full p-[5px] border-2 border-black">
                        <LinkedIn fontSize="large" />
                    </div>
                </LinkedinShareButton>
                <TwitterShareButton url={shareUrl} title="Twitter" >
                    <div className="rounded-full p-2 border-2 border-black">
                        <XIcon size={29} className='rounded-md' />
                    </div>
                </TwitterShareButton>
            </div>
        </>
    )
}

export default JobShare