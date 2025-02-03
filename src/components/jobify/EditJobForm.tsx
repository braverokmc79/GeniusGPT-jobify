"use client";
import { getSingleJobAction, updateJobAction } from '@/actions/jobService';
import { useToast } from '@/hooks/use-toast';
import { createAndEditJobSchema, CreateAndEditJobType, JobMode, JobStatus } from '@/types/jobify/JobType';
import { useMutation,  useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useRouter } from 'next/navigation';

import {Button} from '@/components/ui/button';
import {Form} from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import CustomFormSelect, { CustomFormField } from './FormComponents';


interface EditJobFormProps {
  jobId: string
}

const EditJobForm:React.FC<EditJobFormProps> = ({jobId}) => {
  const queryClient=useQueryClient();
  const {toast} =useToast();
  const router = useRouter();

  const {data} = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJobAction(jobId) ,
  });


  const form =useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema), 
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location|| '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    }
  })

  const {mutate, isPending} = useMutation({
    mutationFn: (values:CreateAndEditJobType) => updateJobAction(jobId, values),
    onSuccess: (data) => {
      if(!data){
        toast({description:"에러가 발생 했습니다.", variant:"destructive"}); 
        return;
      }

      toast({description:"직업이 성공적으로 수정되었습니다.", variant:"success"});
      queryClient.invalidateQueries({queryKey:["job" , jobId] });
      queryClient.invalidateQueries({queryKey:["jobs"]});
      queryClient.invalidateQueries({queryKey:["stats"]});
      //router.push(`/jobs/${jobId}`); 
      router.push(`/jobs`); 
    }

  });

  function onSubmit(values:CreateAndEditJobType) {
    mutate(values);
  }


  return (
     <Form  {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-muted p-8 rounded"
          >
            <h2 className="capitalize font-semibold text-4xl mb-6">직업 수정</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
    
                {/* position */}
                <CustomFormField name="position" lable="직책" control={form.control} />
    
                <CustomFormField name="company" lable="회사" control={form.control} />
    
                <CustomFormField name="location" lable="지역" control={form.control} />
    
                <CustomFormSelect 
                    name="status" 
                    control={form.control}
                    labelText="직업상태"
                    items={Object.values(JobStatus)}            
                />
    
              <CustomFormSelect 
                    name="mode" 
                    control={form.control}
                    labelText="고용형태"
                    items={Object.values(JobMode)}            
                />
    
    
                <Button
                  type='submit'
                  className='self-end capitalize'            
                  >
                     {isPending ? "직업 수정중..." : "직업 수정"}
                 </Button>
                 
            </div>
          </form>
 </Form>
        
  )


}

export default EditJobForm