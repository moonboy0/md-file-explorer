import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Prisma } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors : true
  });
  const prisma = new Prisma()
  const findDocuments = await prisma.documents.findMany({})
  if(findDocuments.length === 0){
    await prisma.documents.create({
      data : {
        name : "back-end"
      }
    })
    await prisma.documents.create({
      data : {
        name : "front-end"
      }
    })
    await prisma.documents.create({
      data : {
        name : "database"
      }
    })

    
  }
  const findUser = await prisma.users.findMany()
  if(findUser.length === 0){
    await prisma.users.create({
      data : {
        email : "admin@gmail.com",
        name : "admin",
        password : "admin",
        role : "ADMIN",
        documentsId : 1
      }
    })
  }
  await app.listen(8000);
}
bootstrap();
