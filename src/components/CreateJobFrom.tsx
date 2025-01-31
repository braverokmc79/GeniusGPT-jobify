"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
//import {Input} from '@/components/ui/input';
import { createAndEditJobSchema, CreateAndEditJobType, JobMode, JobStatus } from "@/dto/JobDTO";
import CustomFormSelect, { CustomFormField } from "./FormComponents";



function CreateJobForm() {

  const form =useForm<CreateAndEditJobType>({
      resolver: zodResolver(createAndEditJobSchema), 
      defaultValues: {
        position: "",
        company: "",
        location: "",
        status: JobStatus.Pending,
        mode: JobMode.FullTime
      }
  });

  function onSubmit(values:CreateAndEditJobType) {
    console.log(values);

  }

  return (
    <Form  {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">직업 추가</h2>
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
                 직업 생성
             </Button>
             
        </div>
      </form>
    </Form>
    
  );
}

export default CreateJobForm;
