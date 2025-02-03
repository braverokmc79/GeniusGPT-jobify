"use client"
import React from 'react'
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobStatus } from '@/types/jobify/JobType';
import { useRouter ,usePathname, useSearchParams } from 'next/navigation';


const SearchForm:React.FC = () => {

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || '전체';
  

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const search=formData.get('search') as string;
    const jobStatus = formData.get('jobStatus') as string;
    console.log("search :",search, "  :::: jobStatus:",jobStatus);
    
    const params = new URLSearchParams();
    params.set('search', search); 
    params.set('jobStatus', jobStatus);


    router.push(`${pathname}?${params.toString()}`);
  }

  



  return (
    <form className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg'
        onSubmit={handleSubmit}
    >
        <Input type="search"  placeholder='직업 검색' name="search"   defaultValue={search} />
        <Select name="jobStatus"  defaultValue={jobStatus} >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent >
                {

                    ['전체', ...Object.values(JobStatus)].map((jobStatus) => {
                        return ( 
                        <SelectItem key={jobStatus} value={jobStatus}>
                            {jobStatus}
                        </SelectItem>);                    
                    })
                    
                }
            </SelectContent>
        </Select>
        <Button type='submit'>검색</Button>
    </form>
  
)
};


export default SearchForm;















