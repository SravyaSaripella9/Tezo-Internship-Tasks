use SravyaEmployeeDB;
/****** Object:  Table [dbo].[Employee]    Script Date: 10/25/2010 11:22:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Employee](
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Title] [varchar](50) NULL,
	[Age] [int] NULL,
	[Salary] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'John', N'Smith', N'Programmer', 54, 27000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Leroy', N'Brooks', N'General Manager', 55, 40099)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'John', N'Fanning', N'Programmer', 28, 35000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Lisa', N'Moore', N'Programmer', 27, 35000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Ginger', N'Finger', N'Fresher', 22, 31500)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Kelly', N'Brooks', N'Programmer', 27, 22000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Shawn', N'Tait', N'Fresher', 20, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Michael', N'Tolstoy', N'Fresher', 21, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Anthony', N'Hopkins', N'Programmer', 26, 19500)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Leroy', N'Miles', N'General Manager', 54, 30000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Mary Ann', N'Moore', N'Software Engineer', 32, 32513)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Donald', N'Duck', N'Programmer', 35, 19300)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Linda', N'Hamilton', N'Fresher', 35, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Sarah', N'Karan', N'Fresher', 15, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Kevin', N'Peitersen', N'Programmer', 40, 32300)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Conrad', N'Whales', N'Software Engineer', 20, 32300)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Isabela', N'Karan', N'Programmer', 38, 30260)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Lisa', N'Logan', N'Programmer', 23, 20000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Ginger', N'Gran', N'Fresher', 10, 22000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Kelly', N'Shield', N'Programmer', 25, 19000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Shawn', N'Bichel', N'Fresher', 26, 22000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Michael', N'Stone', N'Fresher', 24, 21000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Anthony', N'Groove', N'Software Engineer', 47, 23000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Mary Ann', N'Vista', N'Programmer', 27, 37570)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Donald', N'Bang', N'Fresher', 34, 31000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Linda', N'Hamser', N'Fresher', 42, 34000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Sarah', N'Bones', N'Fresher', 51, 32000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Kevin', N'Luther', N'Programmer', 45, 33000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Conrad', N'Marss', N'Fresher', 24, 31500)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Isabela', N'Tauton', N'Programmer', 25, 32500)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'John', N'Vaughan', N'Programmer', 25, 27000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Leroy', N'Garten', N'Programmer', 55, 40099)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'John', N'Whitaker', N'Programmer', 25, 32000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Lisa', N'Merci', N'Programmer', 27, 35000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Ginger', N'Brown', N'Software Engineer', 20, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Kelly', N'Alba', N'Programmer', 27, 22000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Shawn', N'Sons', N'Fresher', 20, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Michael', N'Mitchell', N'Fresher', 21, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Anthony', N'Bravo', N'Programmer', 26, 19500)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Leroy', N'Kings', N'General Manager', 54, 30000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Mary Ann', N'Dolce', N'Programmer', 32, 32513)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Donald', N'Bus', N'Programmer', 35, 19300)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Linda', N'Scott', N'Fresher', 35, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Sarah', N'Jones', N'Fresher', 15, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Kevin', N'Reese', N'Software Engineer', 40, 32300)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Conrad', N'Turtle', N'Software Engineer', 40, 25000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Isabela', N'Apple', N'Programmer', 38, 30260)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Lisa', N'Hammer', N'Programmer', 23, 20000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Ginger', N'Gold', N'Fresher', 10, 22000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Kelly', N'Rise', N'Programmer', 25, 19000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Shawn', N'Bell', N'Fresher', 26, 22000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Michael', N'Moore', N'Fresher', 24, 21000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Anthony', N'Tamahori', N'Programmer', 84, 23000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Mary Ann', N'Horn', N'Programmer', 27, 37570)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Donald', N'Crank', N'Programmer', 34, 31000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Linda', N'Josh', N'Fresher', 42, 34000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Sarah', N'Michael', N'Fresher', 51, 32000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Kevin', N'Long', N'Programmer', 45, 33000)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Conrad', N'Tamahori', N'Software Engineer', 24, 31500)
INSERT [dbo].[Employee] ([FirstName], [LastName], [Title], [Age], [Salary]) VALUES (N'Isabela', N'Moore', N'Programmer', 25, 32500)

select * from Employee;

/*Select firstname, lastname, title, age, salary for everyone in your employee table.*/
select FirstName, LastName, Title, Age, Salary from Employee;

/*Select firstname, age and salary for everyone in your employee table.*/
select FirstName, Age, Salary from Employee;

/*Selct firstname and display as 'Name' for everyone in your employee table*/
select FirstName as 'Name' from Employee;

/*Select firstname and lastname as 'Name' for everyone. Use " " (space) to separate firstname and last.*/
select concat(FirstName , ' ' , LastName) as 'Name' from Employee; 

/* Select all columns for everyone with a salary over 38000. */
select * from Employee where Salary > 38000;

/*Select first and last names for everyone that's under 24 years old. */
select FirstName, LastName from Employee where Age < 24;

/* Select first name, last name, and salary for anyone with "Programmer" in their title. */
select FirstName, LastName, Salary from Employee where Title like '%Programmer%';

/* Select all columns for everyone whose last name contains "O". */
select * from Employee where LastName like '%O%';

/* Select the lastname for everyone whose first name equals "Kelly".*/
select LastName from Employee where FirstName = 'Kelly';

/*Select all columns for everyone whose last name ends in "Moore".*/
select * from Employee where LastName like '%Moore';

/*Select all columns for everyone who are 35 and above.*/
select * from Employee where Age >= 35;

/* Select firstname ,lastname,age and salary of everyone whose age is above 24 and below 43.*/
select FirstName, LastName, Age, Salary from Employee where Age between 25 and  42;

/* Select firstname, title and lastname whose age is in the range 28 and 62 and salary greater than 31250*/
select FirstName, LastName, Title from Employee where (Age between 28 and 62) and salary > 31250;

/* Select all columns for everyone whose age is not more than 48 and salary not less than 21520*/
select * from Employee where Age < 48 and Salary > 21520;

/*Select firstname and age of everyone whose firstname starts with "John" and salary in the range 25000 and 35000*/
select FirstName, Age from Employee where FirstName like 'John%' and (Salary between 25000 and 35000);

/*Select all columns for everyone by their ages in descending order.*/
select * from Employee ORDER BY Age DESC;

/*Select all columns for everyone by their ages in ascending order.*/
select * from Employee ORDER BY Age;

/* Select all columns for everyone by their salaries in descending order.*/
select * from Employee ORDER BY Salary DESC;

/*Select all columns for everyone by their salaries in ascending order.*/
select * from Employee ORDER BY Salary;

/* Select all columns for everyone by their salaries in ascending order whose age not less than 17.*/
select * from Employee where Age >= 17 ORDER BY Salary;

/* Select all columns for everyone by their salaries in descending order whose age not more than 34.*/
select * from Employee where Age <= 34 ORDER BY Salary DESC;

/* Select all columns for everyone by their length of firstname in ascending order.*/
select *, len(FirstName) as FirstNameLength from Employee ORDER BY len(FirstName);

/* Select the number of employees whose age is above 45*/
select count(*) as NoOfEmployees from Employee where Age > 45;

/* Show the results by adding 5 to ages and removing 250 from salaries of all employees*/
select FirstName, LastName, Title, Age + 5 as ModifiedAge, Salary - 250 as ModifiedSalary from Employee; 

/*Select the number of employees whose lastname ends with "re" or "ri" or "ks"*/
select count(*) as NoOfEmployees from Employee where LastName like '%re' or LastName like '%ri' or LastName like '%ks';

/*Select the average salary of all your employees*/
select avg(Salary) as AverageSalary from Employee;

/*Select the average salary of Freshers*/
select avg(Salary) as AverageSalary from Employee where Title = 'Fresher';

/*Select the average age of Programmers*/
select avg(Age) as AverageAge from Employee where Title = 'Programmer';

/* Select the average salary of employees whose age is not less than 35 and not more than 50*/
select avg(Salary) as AverageSalary from Employee where Age >= 35 and Age <=50;

/*Select the number of Freshers*/
select count(*) as NoOfEmployees from Employee where Title = 'Fresher';

/*What percentage of programmers constitute your employees*/
select ((select count(*) from Employee where Title = 'Programmer')*100 / count(*)) as PercentageOfProgrammers from Employee;

/*What is the combined salary that you need to pay to the employees whose age is not less than 40*/
select sum(Salary) as Salary from Employee where Age >= 40;

/* What is the combined salary that you need to pay to all the Freshers and Programmers for 1 month*/
select sum(Salary) as Salary from Employee where Title = 'Fresher' or Title = 'Programmer';

/* What is the combined salary that you need to pay to all the Freshers whose age is greater than 27 for 3years*/
select sum(Salary)*36 as Salary from Employee where Title = 'Fresher' and Age > 27;

/*Select the eldest employee's firstname, lastname and age whose salary is less than 35000*/
select FirstName, LastName, Age from Employee where Salary < 35000 and (Age in (select max(Age) from Employee where Salary  < 35000));

/*Who is the youngest General Manager*/
select concat(FirstName,' ',LastName) as Name from Employee where Title = 'General Manager' and (Age in (select min(Age) from Employee where Title = 'General Manager'));

/*Select the eldest fresher whose salary is less than 35000*/
select * from Employee where Salary < 35000 and Title = 'Fresher' and (Age in (select max(Age) from Employee where Salary < 35000 and Title = 'Fresher'));

/*Select firstname and age of everyone whose firstname starts with "John" or "Michael" and salary in the range 17000 and 26000*/
select FirstName, Age from Employee where (FirstName like 'John%' or FirstName like 'Michael%') and (Salary between 17000 and 26000); 

/*How many employees are having each unique title. Select the title and display the number of employees present in ascending 
order*/
select Title, count(*) as NoOfEmployees from Employee GROUP BY Title ORDER BY count(*);

/* What is the average salary of each unique title of the employees. Select the title and display the average salary of employees
in each*/
select Title, avg(Salary) as AverageSalary from Employee GROUP BY Title;

/* What is the average salary of employees excluding Freshers*/
select avg(Salary) as AverageSalary from Employee where Title != 'Fresher';

/* What is the average age of employees of each unique title.*/
select Title, avg(Age) as AverageAge from Employee Group By Title;

/* In the age range of 25 to 40 get the number of employees under each unique title.*/
select Title, count(*) as NoOfEmployees from Employee where Age between 25 and 40 GROUP BY Title;

/*Show the average salary of each unique title of employees only if the average salary is not less than 25000*/
select Title, avg(Salary) as AverageSalary  from Employee GROUP BY Title HAVING avg(Salary) >= 25000;

/* Show the sum of ages of each unique title of employee only if the sum of age is greater than 30*/
select title, sum(Age) as SumOfAges from Employee GROUP BY Title HAVING sum(Age) > 30;

/*Lisa Ray just got married to Michael Moore. She has requested that her last name be updated to Moore.*/
update Employee set LastName = 'Moore' where (FirstName = 'Lisa' and LastName = 'Ray');

/*Ginger Finger's birthday is today, add 1 to his age and a bonus of 5000*/
update Employee set Age = Age+1, Salary = Salary + 5000 where FirstName = 'Ginger' and LastName = 'Finger';

/*All 'Programmer's are now called "Engineer"s. Update all titles accordingly. */
update Employee set Title = 'Engineer' where Title = 'Programmer';

/*Everyone whose making under 30000 are to receive a 3500 bonus.*/
update Employee set Salary = Salary + 3500 where Salary < 30000;

/*Everyone whose making over 35500 are to be deducted 15% of their salaries*/
update Employee set Salary = Salary - (Salary*0.15) where Salary > 35500;