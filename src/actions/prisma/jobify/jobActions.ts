"use server";
import { createAndEditJobSchema, CreateAndEditJobType, JobType, GetAllJobsActionTypes } from "@/types/jobify/JobType";
import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
dayjs.locale("ko");


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
  
      
     // 🔹 검색어가 있을 경우 검색 조건 추가
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
  
      // 🔹 특정 상태(jobStatus) 필터링
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

   // console.log("getStatsAction stats: " , stats);

    //초기값을 설정할 수 있어 안전한 데이터 변환 가능한 reduce 를 사용 
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







export async function getChartsDataAction(): Promise<Array<{ date: string; count: number }>> {
  // 사용자 인증 후 userId 가져오기
  const userId = await authenticateAndRedirect();
  // 최근 6개월간의 데이터를 가져오기 위해 기준 날짜 설정
  const sixMonthsAgo = dayjs().subtract(6, 'month').toDate();

  try {
    // 데이터베이스에서 사용자 ID와 생성 날짜 기준으로 job 데이터 조회
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    //console.log("* getChartsDataAction - jobs :", jobs);

    // 조회한 job 데이터를 월별로 집계하여 배열로 변환
    const applicationsPerMonth = jobs.reduce((acc, job) => {
      // job 생성 날짜를 'MMM YY' (예: Jan 24) 형식으로 변환
      const date = dayjs(job.createdAt).format('MMM YY'); 
      // 이미 존재하는 월 데이터가 있는지 확인
      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        // 기존 월 데이터가 있다면 count 증가
        existingEntry.count++;
      } else {
        // 새로운 월 데이터 추가
        acc.push({ date, count: 1 });
      }

      /*
        반환 데이터 예 
        *charts :  [
          { date: '1월 24', count: 65 },
          { date: '2월 24', count: 75 },
          { date: 'Oct 24', count: 92 },
          { date: 'Nov 24', count: 81 },
          { date: 'Dec 24', count: 86 },
          { date: 'Jan 25', count: 88 },
          { date: 'Feb 25', count: 6 }
        ]
      */
      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    console.log("getChartsDataAction Error: ", error);
    return [];
  }
}