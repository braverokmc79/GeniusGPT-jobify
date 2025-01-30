import * as z from 'zod';

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Pending = '보류중',
  Interview = '인터뷰',
  Declined = '거절됨',
}

export enum JobMode {
  FullTime = '풀타임',
  PartTime = '파트타임',
  Internship = '인턴십',
}

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: '직책은 2자 이상이어야 합니다.',
  }),
  company: z.string().min(2, {
    message: '회사는 2자 이상이어야 합니다.',
  }),
  location: z.string().min(2, {
    message: '위치는 2자 이상이어야 합니다.',
  }),

  status: z.nativeEnum(JobStatus,{
    message: '직업상태를 선택하세요.',
  }),
  mode: z.nativeEnum(JobMode,{
    message: '고용형태를 선택하세요.',
  }),

});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;