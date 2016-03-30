# date-calc
Counts the days between two dates
## Intro
This is required to be a CLI application and I thought of two choices in terms of language and framework, the first one was a C# console application which was the most suitable choice from my perspective and the second one was to build a CLI app with node.js, I know that Node.JS for this role is a requirement so I wanted to challenge my Node.JS knowledge to build a CLI application.
The solution has a main entry file which is called ‘index.ts’ so if you want to understand my code please start from there.
The main component of my solution is ‘date.calculator.ts’ file in app directory which does the whole work so this is the second object you might be looking at, I have added some comments to my code for better understanding it and am going to give an intro to it later in this document.
I used visual studio code to do the job.
## TypeScript
I used typescript to code my solution so you see .ts files in there and I have a gulpfile.js in my solution which transpile the ts files into js files, please refer to the gulpfile.js in root and find ‘tsTranspiler’ task.
## Index.ts
This is the main entry of the solution, it gets arguments from the cmd ad passes them to the main component which is called ‘date.calculator.ts’.
## Date.calculator.ts
This is the main component and it does the calculation, as a brief it first validates the inputs to make sure they are in right format and then splits them out to component parts such as day, month and year, and then starts counting, to have a good performant in my solution I first count the years considering the leap years and then count the days when the years are done, this wat I just need to count the days for a limited and small range which is the last year. I make sure I deduct the partial days and then return the result.
## Test
I’d like to test my solution so I added some libraries such as ‘Mocha’ as a testing framework, ‘Chai’ as an assertion library and ‘Sinon’ to implement mocking in order to be able to run a couple of unit tests, no need to mention that what I have in solution is not all I can have and I just wanted to give it a try!
The unit tests are also created with typescript and to run them just in cmd type mocha
C:\date-calc>mocha
I also created a task for test cased in my gulp file
C:\date-calc>gulp mocha
## How to run
To run the app first clone the repository in C:\ drive, it creates a folder called date-calc on the root
Then using your node.js cmd run the following

	C:\>
	C:\>cd date-calc
	C:\date-calc>npm install
          Make sure all components are installed correctly as I haven’t included the node-modules
	C:\date-calc>npm link
	C:\date-calc>datecalc 01/01/2015 04/01/2080
	C:\date-calc>mocha
          In order to run mocha globally you have to have it installed globally: npm install -g mocha
	C:\date-calc>gulp mocha
          In order to run gulp globally you have to have it installed globally: npm install -g gulp
