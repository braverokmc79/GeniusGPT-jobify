import React from 'react'

interface EditJobFormProps {
  jobId: string
}

const EditJobForm:React.FC<EditJobFormProps> = () => {
  
  return (
    <h1 className='text-4xl'>
        직업 수정
    </h1>
  )


}

export default EditJobForm