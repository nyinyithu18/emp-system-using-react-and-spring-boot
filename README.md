# React-Js-and-Spring-Boot-Full-Stack-Project

## Description

```
This project consists of two Applications: One is a Spring Boot RestAPI called spring-backend and another is a react-frontend.
This project is full stack project as a small employee management system.
User can perform such as adding with image, updating, searching , deleting for employees datas in the database.
User can search employee datas with ID or Name , add is dynamic add and delete is soft delete for employee and employee leave.
Next features consists import, export with excel file, employee datas with image can save and print for employee of each can print.
```

### Tech 

  - Spring Boot
  - MyBatis
  - Lombok
  - JDBC
  - Postgres + Database
  - Apache POI

## React-frontend

  > react-frontend uses Flowbite React UI component as CSS-styled framework and Tailwind CSS.   
  > use Vite React Js  as front-end tool.

## Configuration

backend

 - Set up a PostgreSQL database and create the necessary tables with sql file.
 - Update the database connection configuration in the **application.properties** file:
    > spring.datasource.url=jdbc:postgresql://your-database-host:your-database-port/your-database-name
    > spring.datasource.username=your-username  
    > spring.datasource.password=your-password

## Usage

Clone the Repository
```
git clone https://github.com/nyinyithu18/emp-system-using-react-and-spring-boot.git
```
```
cd emp-system-using-react-and-spring-boot
```

frontend

```
cd frontend
```
Install the modules
```
npm i
```
Start the application
```
npm run dev
```
local host

http://localhost:5173

backend

```
cd backend
```
run the application
```
mvn spring-boot:run
```
test the host

http://localhost:8080/empList

