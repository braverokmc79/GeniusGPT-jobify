"use server";
import { createAndEditJobSchema, CreateAndEditJobType, JobType, GetAllJobsActionTypes } from "@/types/JobDTO";
import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function authenticateAndRedirect():Promise<string>  {
    const {userId} =await auth();
    console.log("@@@authenticateAndRedirect :", userId);
    if(!userId) redirect("/");
    return userId;        
}

export async function createJobAction(values:CreateAndEditJobType):Promise<JobType | null> {

    try {
        //await new Promise((resolve)=>setTimeout(resolve,3000));        
        const userId =await authenticateAndRedirect();       
        createAndEditJobSchema.parse(values); 
        const job:JobType = await prisma.job.create({
            data: {
                ...values,
                clerkId:userId
            }
        });
        return job;       
    } catch (error) {
        console.log("createJobAction Error: " , error);        
        return null;
    }
}

export async function getAllJobsAction({
    search,
    jobStatus,
    page = 1,
    limit = 10,
  }: GetAllJobsActionTypes): Promise<{ jobs: JobType[]; count: number; page: number; totalPages: number }> {
    const userId = await authenticateAndRedirect();
    
    console.log("@getAllJobsAction :", userId, search, jobStatus, page, limit);
  
    try {
      let whereClause: Prisma.JobWhereInput = {
        clerkId: userId,
      };
  
     // 🔹 search 값이 존재할 때만 검색 조건 추가
    if (search && search.trim() !== "") {
        whereClause = {
          ...whereClause,
          OR: [
            { position: { contains: search, } },
            { company: { contains: search,  } },
            { location: { contains: search,  } },
          ],
        };
      }
  
      if (jobStatus && jobStatus !== "전체") {
        whereClause = {
          ...whereClause,
          status: { equals: jobStatus }, // 정확한 값 비교
        };
      }
  
      // 🔹 총 개수 계산
      const totalCount = await prisma.job.count({ where: whereClause });
      const totalPages = Math.ceil(totalCount / limit);
  
      const jobs: JobType[] = await prisma.job.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      });
  
      //console.log("반환 데이터  : ", jobs);
  
      return { jobs, count: totalCount, page, totalPages };

    } catch (error) {
      console.error("getAllJobsAction Error:", error);
      throw new Error("직업 데이터를 가져오는 중 오류 발생");
    }
}
  

//직업 삭제
export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = await authenticateAndRedirect();
  try {
    const job :JobType = await prisma.job.delete({
      where: {
        id,
        clerkId:userId
      }
    });
    return job;
  }catch(error){
    console.log("deleteJobAction Error: " , error);
    return null;
  }

}


export async function getSingleJobAction(id: string): Promise<JobType | null> {
  let job:JobType | null = null;

  const userId = await authenticateAndRedirect();
  try {
     job  = await prisma.job.findUnique({
      where: {
        id,
        clerkId:userId  ,
      }
    });
  
  }catch(error){
    console.log("getSingleJobAction Error: " , error);
    job=null;
  }

  if(!job) redirect("/jobs");

  return job;
}


//직업 수정
export async function updateJobAction(id:string,  values:CreateAndEditJobType):Promise<JobType | null> {
  const userId = await authenticateAndRedirect(); 

  try {    
    createAndEditJobSchema.parse(values); 
    const job:JobType = await prisma.job.update({
        where: {
            id,
            clerkId:userId
        },
        data: {
            ...values,
        }
    });
    return job;       
  } catch (error) {
    console.log("updateJobAction Error: " , error);        
    return null;
  }

}


export async function getStatsAction(): Promise<{
  "보류중": number;
  "인터뷰": number;
  "거절됨": number;
}> {

  const userId = await authenticateAndRedirect();

  try {
    const stats=await prisma.job.groupBy({    
      where: {
        clerkId: userId, 
      },
      by: ['status'],
      _count: {
        status: true,
      },
    })

    console.log("getStatsAction stats: " , stats);
    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    const defualtStats = {
      "거절됨": 0,
      "보류중": 0,
      "인터뷰": 0,
      ...statsObject,
    };

    return defualtStats;

  } catch (error) {
    console.log("getStatsAction Error: " , error);
    redirect("/jobs");
  }



}