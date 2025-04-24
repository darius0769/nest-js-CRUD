main.ts --> entry point similar to index.js, create server, assign port 
app.module --> specify controllers, services
app.controller --> receives request, routes to services
app.services --> business logics



cmd -------->  npm i -g @nestjs/cli

	           nest new project-name



npm install prisma --save-dev

npm install @prisma/client

npx prisma init
{
	edit in env,
	define model in schema.prisma
}

npx prisma generate

npx prisma migrate dev --name init
{
npx prisma reset
}

nest generate module prisma

nest generate service prisma
{
write service file
}

add PrismaService to providers in appModule


nest generate module users
nest generate controller users
nest generate service users

npm install @types/express --save-dev <<<<<<<<<< To implement res.status......

npx prisma migrate reset, npx prisma generate <<<<<<<<< drop all


>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>IMAGE UPLOAD<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
npm install @nestjs/platform-express 
npm install multer
npm install --save-dev @types/multer

