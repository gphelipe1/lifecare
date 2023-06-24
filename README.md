# LifeCare
Basic Hospital app to manage patient records. Built with ASP.NET Core (backend) and React.js (frontend).
Objective: efficient management of patient records for doctors and easy access to personal records for patients.

## [Database]
The database uses MySQL and to have access to it, just add the properly string connection on the **Backend**'s appsettings file.

- Default Connection String:
> "AppDbConnectionString": "server=localhost;database=LifeCare;User=root;Password=root;"

## [Backend - C#, .NET 7 | Frontend - React JS + Vite]
 This repository contains usefull components, such as a responsive and customizable table (using pagination), login card, authentication/authorization system role based using .NET and C#
## [Access]
 The program creates a default user to have access to it. You can just use "admin"/"admin" to login.
## [Backend]
- To run the backend of the aplication, simply run the commands below in the "backend" file.
```sh
dotnet build
dotnet run
```
The backend was built using .NET Core version 7

## [Frontend]
- While running the backend, you can now consume all the API data through the frontend of the application. Go to frontend/lifecare-front folter and just run the following commands:
```sh
npm install
npm run dev
```
### [Tip] - How to Run MySql in a Docker Container (Step by Step) 
Use docker to run the database. 
- Go to  **https://www.docker.com/** and get the latest version of docker
- In the command line you can get the Image of MySQL by just using the command
```sh
docker pull mysql
```
- The next step is to run a container in Docker with the MySQL image. To do this, use the next command (don't forget to change the password for a more safety one):
```sh
docker run --name=mysql1 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysq
```
To verify if the container was created and if it's running, you can execute a docker ps (process status) command, just like it follows:
```sh
docker ps
```
