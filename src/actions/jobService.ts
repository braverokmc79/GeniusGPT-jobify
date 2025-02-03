// src/actions/jobService.ts
import { CreateAndEditJobType, GetAllJobsActionTypes, JobType } from "@/types/JobDTO";
import { createJobAction as prismaCreateJob, getAllJobsAction as prismaGetAllJobsAction ,
  deleteJobAction as prismaDeleteJobAction,
  getSingleJobAction as prismaGetSingleJobAction,
  updateJobAction  as prismaUpdateJobAction ,
  getStatsAction as prismaGetStatsAction,
  getChartsDataAction as prismaGetChartsDataAction

} from "./prisma/job/jobActions";
import { createJobAction as springBootCreateJob } from "./spring-boot/job/jobActions";
import { redirect } from "next/navigation";


// 사용할 백엔드 타입을 설정 (환경 변수나 설정 파일로 관리 가능)
const BACKEND_TYPE = process.env.NEXT_PUBLIC_BACKEND_TYPE || "prisma"; // 기본값: Prisma



export async function createJobAction(values: CreateAndEditJobType): Promise<JobType | null> {  
  if (BACKEND_TYPE === "spring-boot") {
    return await springBootCreateJob(values);
  } else {
    return await prismaCreateJob(values);
  }

}

//모든 잡 가져오기
export async function getAllJobsAction({search, jobStatus, page=1, limit=10}:
    GetAllJobsActionTypes):Promise<{jobs:JobType[]; count:number; page:number; totalPages:number}> { 
    //  console.log("1.jobService getAllJobsAction :" ,search, jobStatus, page, limit);
      
  if (BACKEND_TYPE === "spring-boot") {
     return {jobs:[] , count:0, page:1, totalPages:0} ;
  } else {
    return await prismaGetAllJobsAction({search, jobStatus, page, limit});
  }

}



//직업 삭제
export async function deleteJobAction(id: string): Promise<JobType | null> {

  if (BACKEND_TYPE === "spring-boot") {
    return null ;
  } else {
   return await prismaDeleteJobAction(id);
 }
}



// 
export async function getSingleJobAction(id: string): Promise<JobType | null> {
  if (BACKEND_TYPE === "spring-boot") {
    return null ;
  } else {
   return await prismaGetSingleJobAction(id);
  }
}

//직업 수정
export async function updateJobAction( id:string,values:CreateAndEditJobType):Promise<JobType | null> {

  if (BACKEND_TYPE === "spring-boot") {
    return null ;
  } else {
   return await prismaUpdateJobAction(id, values);
  }
  
}


export async function getStatsAction(): Promise<{ 
  "보류중": number;
  "인터뷰": number;
  "거절됨": number; }> {
  if (BACKEND_TYPE === "spring-boot") {
   
     redirect("/jobs"); 
  } else {
    return await prismaGetStatsAction();
  }
}


export async function getChartsDataAction(): Promise<Array<{ date: string; count: number }>>{
  if (BACKEND_TYPE === "spring-boot") {   
     redirect("/jobs"); 
  } else {
    return await prismaGetChartsDataAction();
  }
}

