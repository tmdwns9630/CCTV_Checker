// DB 접속해서 모든걸 할 수 있게 해주는 코드
import { PrismaClient } from "@prisma/client";
export default new PrismaClient();
//다른 파일에서 DB를 사용할 수 있게 한다.

// const prisma = new PrismaClient();
// prisma.user.create({data:{name:"백메탈",age:20,addr:"아산시"}})

//: 데이터베이스에 데이터 생성.
