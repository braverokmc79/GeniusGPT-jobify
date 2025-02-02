const { PrismaClient } = require('@prisma/client');
const mockData = require('./mock_data.json');

const prisma = new PrismaClient();


async function seedDatabase() {
    const clerkId = '클라이언트에서 가져온 사용자 ID';   
    const jobs= mockData.map((job) => {
      return {
        ...job,
         clerkId,
      };
    })

    for (const job of jobs) {
      await prisma.job.create({
        data: job        
      });
    }

    console.log('✅ 1000개의 Job 데이터가 추가되었습니다.');
}
  
seedDatabase()
    .then(async() =>await prisma.$disconnect())
    .catch(async(error) => {
    console.error(error);
       await prisma.$disconnect();
       process.exit(1);
});