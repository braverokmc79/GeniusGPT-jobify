// src/actions/jobService.ts
import { CreateAndEditJobType, GetAllJobsActionTypes, JobType } from "@/types/JobDTO";
import { createJobAction as prismaCreateJob, getAllJobsAction as prismaGetAllJobsAction } from "./prisma/add-job/jobActions";
import { createJobAction as springBootCreateJob } from "./spring-boot/add-job/jobActions";


// 사용할 백엔드 타입을 설정 (환경 변수나 설정 파일로 관리 가능)
const BACKEND_TYPE = process.env.NEXT_PUBLIC_BACKEND_TYPE || "prisma"; // 기본값: Prisma



export async function createJobAction(values: CreateAndEditJobType): Promise<JobType | null> {  
  if (BACKEND_TYPE === "spring-boot") {
    return await springBootCreateJob(values);
  } else {
    return await prismaCreateJob(values);
  }

}


export async function getAllJobsAction({search, jobStatus, page=1, limit=10}:
    GetAllJobsActionTypes):Promise<{jobs:JobType[]; count:number; page:number; totalPages:number}> { 
    //  console.log("1.jobService getAllJobsAction :" ,search, jobStatus, page, limit);
      
  if (BACKEND_TYPE === "spring-boot") {
     return {jobs:[] , count:0, page:1, totalPages:0} ;
  } else {
    return await prismaGetAllJobsAction({search, jobStatus, page, limit});
  }

}

