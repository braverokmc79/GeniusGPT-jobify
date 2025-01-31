"use server";
import { createAndEditJobSchema, CreateAndEditJobType, JobType, GetAllJobsActionTypes } from "@/types/JobDTO";
import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

async function authenticateAndRedirect():Promise<string>  {
    const {userId} =await auth();
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


export async function getAllJobsAction({search, jobStatus, page=1, limit=10}:
    GetAllJobsActionTypes):Promise<{jobs:JobType[]; count:number; page:number; totalPages:number}> {

      const userId =await authenticateAndRedirect();
       try{

        let whereClause: Prisma.JobWhereInput = {
          clerkId: userId,
        };

        if(search){
            whereClause = {
                ...whereClause,
                OR: [
                    { position: { contains: search } },
                    { company: { contains: search } },
                    { location: { contains: search } },
                ]
            }
        }

        if(jobStatus && jobStatus !== 'all'){
            whereClause = {
                ...whereClause,
                status: jobStatus
            }
        }

        const jobs:JobType[]=await prisma.job.findMany({where:whereClause,
            orderBy: {
              createdAt: 'desc',
            },  
            take:limit,
            skip:(page-1)*limit         
        });

        return {jobs,count:0, page:page, totalPages:0}

       }catch(error){
         console.log("getAllJobsAction Error: " , error);  
         return {jobs:[] , count:0, page:1, totalPages:0}      
       }


}

