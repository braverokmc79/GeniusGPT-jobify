"use server";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "@/types/JobDTO";
import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
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