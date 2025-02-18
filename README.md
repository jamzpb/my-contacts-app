# My Contacts App - TFL

This is my contacts app for the TFL application. Read below for how to run locally and cloud deployment process. The project itself is live and deployed [Here](https://contacts-app-azhea2hwhzafdzbm.ukwest-01.azurewebsites.net/ "Visual Studio Code (IDE)"), if interested. Using Azure Free F3 Tier, may lag due to this.

**Prerequisites**
- [Visual Studio Code (IDE)](https://code.visualstudio.com/ "Visual Studio Code (IDE)")
- [NodeJS (Latest)](https://nodejs.org/en "NodeJS (Latest)")
- [.NET SDK (.NET 9x)](https://dotnet.microsoft.com/en-us/download ".NET SDK (.NET 9x)")
- [C# Dev Kit and C# Extension for VS Code](https://code.visualstudio.com/docs/languages/dotnet "C# Dev Kit and C# Extension for VS Code")

Standard [Visual Studio](https://visualstudio.microsoft.com/ "Visual Studio") can be used also, however correct extensions would be needed.

### App Information:

The project uses a React TypeScript client application and .NET Core API with C# to serve the backend. With a Sqlite Database for effiency. Some further info on packages and archettcture for each is:

**API**
- Scalar API Platform
- .NET 9x
- Entity Framework
- REST API following a lightweight repository pattern

**Client**
- React
- TypeScript
- Vite Compiler
- AG Grid
- GOVUK Design System

**SQlite**
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

#### API
1. run **dotnet run** OR **dotnet watch** within the api terminal. then check the api is running by going to link provided, scalar ui:
<img width="752" alt="Image" src="https://github.com/user-attachments/assets/4a0aae86-9de2-4bba-8d45-8179955adf88" />

	it will allow you to test and run the api endpoints.
<img width="1438" alt="Image" src="https://github.com/user-attachments/assets/0c80c666-7308-4b5f-ae83-a0841658a667" />

#### CLIENT
1. Within the client terminal, run **npm install** to install dependencies then **npm run dev** to run development server for the client side app, then click the localhost link and you'll be taken to the app.
<img width="338" alt="Image" src="https://github.com/user-attachments/assets/ef35e0b7-6ca5-428f-87ba-9a113d5bc974" />

##Prepare for Production

They is some steps needed to initally prepare the project for build. 

#### Preparing Client App for Production

A .env.production file is created, this will contain configuration settings specifically for the production build of the application. In this case, the API url:

<img width="308" alt="Image" src="https://github.com/user-attachments/assets/d80d140a-b51d-4d1f-80a6-9d6662b46a3b" />

Once env has been configured for prod, run the **npm run build** command, this will generate the production build files for the client app.
<img width="316" alt="Image" src="https://github.com/user-attachments/assets/c7e8630e-44ba-49cd-9e68-a095129dd416" />

Additonally, the output directory needs to be configured in the vite.config.ts to the wwwroot folder in the API project, where static files will be hosted.
<img width="372" alt="Image" src="https://github.com/user-attachments/assets/25a5b11d-1edf-4339-be66-2a66cabc1563" />

#### Preparing API for Production

By default the API kestrel server doesn't support static files, middleware needs to be included. Below the folllowing middleware has been added:

<img width="266" alt="Image" src="https://github.com/user-attachments/assets/011f0417-1a23-46ff-bfd4-072a9709185c" />

Additonally, middleware has been included for a fallback controller for client side app to handle routes the API doesn't recongise

<img width="483" alt="Image" src="https://github.com/user-attachments/assets/1f0016d8-440f-4c39-9124-ad1e4c6d954d" />

Then run **dotnet build** to check no errors occour and 
finally **dotnet publish -c Release -o ./bin/Publish**

The Project is now ready for deployment.

## Setup & Deploy to Azure

I've chosen azure as i have most experiecne with it. firstly you do need to sign up to it. the easiest and most consistent way to create azure resources and services is using the website. Azure command line and bicep files can be utilized, but in the case of this small project, it wasn't really nessically.

#### Setup Azure

Fristly create a resource group within the azure portal, this is basically a container which stores azure services such as web app, databases and more. Worth choosing a region where you're located for latency

![Image](https://github.com/user-attachments/assets/f9807401-69ea-4852-9a91-199f15dd2a30)

Secondly, select and create azure web app service, this main service used by the API. Additonally as the API is also serviving a static files, another app such as Static Web App isn't needed. Select the resource just created, provide the correct details such as runtime, region, name etc. For the purpose of this app, the free shared infastructure tier has been selected, yet this can be scaled up at a cost depending on the project.

![Image](https://github.com/user-attachments/assets/65b1d490-0dac-44a0-9441-17fe061a22a6)

Once created, a deployment screen will show and a generic app will show. From here we can deploy are code from the contacts app project.

![Image](https://github.com/user-attachments/assets/281e8b7c-bc23-4e84-b229-1427542590e8)


#### Deploy to Azure

Multiple ways to deploy the project to azure but the easiets is to use VS code with the Azure Extension. Provding, the client and api projects have been correctly prepared for production its as simpy as the following:

Select the publish folder for the API via the azure extension:

![Image](https://github.com/user-attachments/assets/842fc000-7359-4f2d-aa99-bbfbbbb432ae)

the deployment process will start and should show succesfully in the command line:

![Image](https://github.com/user-attachments/assets/bc246640-845b-479f-9653-1edcfec6e369)

At the point the published and deployed app should be live on the app service:

![Image](https://github.com/user-attachments/assets/0044827c-5dee-4655-9386-97b88e667041)

**Further Info:**

The main web app portal provides alot of insight, tools and scaling options for the app
<img width="1420" alt="Image" src="https://github.com/user-attachments/assets/b3a6b494-1b1b-4f53-a0df-3889945dfb60" />

Application insights can be checked under dianoise and solve problem section in the app service portal, ie if any errors occour they are logged here helps with debugging:
<img width="1420" alt="Image" src="https://github.com/user-attachments/assets/811088a8-4a56-4d7f-a326-fe11a0f36c3f" />


### Set Up CI / CD with Github Actions

