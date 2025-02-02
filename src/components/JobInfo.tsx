import React from 'react'

interface JobInfoProps {
    icon:React.ReactNode;
    text: string ;
}


const JobInfo:React.FC<JobInfoProps> = ({icon, text}) => {
  return (
    <div className='flex gap-x-2 items-center'>
      {icon} {text}
    </div>
  )
}

export default JobInfo