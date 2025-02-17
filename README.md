# My Contacts App - TFL

This is my contacts app for the TFL application. Read below for how to run locally and cloud deployment process.

**Prerequisites**
- [Visual Studio Code (IDE)](https://code.visualstudio.com/ "Visual Studio Code (IDE)")
- [NodeJS (Latest)](https://nodejs.org/en "NodeJS (Latest)")
- [.NET SDK (.NET 9x)](https://dotnet.microsoft.com/en-us/download ".NET SDK (.NET 9x)")
- [C# Dev Kit and C# Extension for VS Code](https://code.visualstudio.com/docs/languages/dotnet "C# Dev Kit and C# Extension for VS Code")

Standard [Visual Studio](https://visualstudio.microsoft.com/ "Visual Studio") can be used also, however correct extensions would be needed.

### App Information:

The project uses a React TypeScript client application and .NET Core API with C# to serve the backend. With a Sqlite Database for effiency. Some further info on packages for each is:

**API**
- Scalar API Platform
- .NET 9x
- Entity Framework

**Client**
- React
- TypeScript
- Vite Compiler
- AG Grid
- GOVUK Design System

SQlite
- Has been configured will run migrations and seed database on startup with dummy data.
- Would reccomend Postgres or MS SQL Server for production


### Run locally


To run the project locally, they is two options. however firstly, clone the project and open with vscode.
- git clone https://github.com/jamzpb/my-contacts-app.git
<img width="543" alt="Image" src="https://github.com/user-attachments/assets/467963f5-8eb4-4a7a-a59a-2bd5de2aedb5" />



**Run local Pre-Production environment:**

I have arranged for the API to serve the static files, such as the client app. This is easiest and simplest way to run the project and replicates the production environment completely.

- Simply run **dotnet run** or **dotnet watch** after entering the API directory via terminal.

Access the client app and api interface by going to links provided in the terminal
<img width="752" alt="Image" src="https://github.com/user-attachments/assets/4a0aae86-9de2-4bba-8d45-8179955adf88" />



**Run local development environment:**

You can also run the development build, which replicates the development enviroment completely.

1. once open in IDE, open each directory in a seperate terminal. for example, api in terminal 1, client in terminal 2
<img width="1084" alt="Image" src="https://github.com/user-attachments/assets/2e6b4012-676b-43cf-b870-a88f0fc6e932" />

### API
1. run **dotnet run** OR **dotnet watch** within the api terminal. then check the api is running by going to link provided, scalar ui:
<img width="752" alt="Image" src="https://github.com/user-attachments/assets/4a0aae86-9de2-4bba-8d45-8179955adf88" />

	it will allow you to test and run the api endpoints.
<img width="1438" alt="Image" src="https://github.com/user-attachments/assets/0c80c666-7308-4b5f-ae83-a0841658a667" />

### CLIENT
1. Within the client terminal, run **npm install** to install dependencies then **npm run dev** to run development server for the client side app, then click the localhost link and you'll be taken to the app.
<img width="338" alt="Image" src="https://github.com/user-attachments/assets/ef35e0b7-6ca5-428f-87ba-9a113d5bc974" />
the client app
<img width="1102" alt="Image" src="https://github.com/user-attachments/assets/f98ed38c-dac8-4ccf-9d36-83754fdf040d" />



