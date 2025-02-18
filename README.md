# My Contacts App - TFL


[![Deployment](https://img.shields.io/badge/Deployed-Azure-blue)](https://contacts-app-azhea2hwhzafdzbm.ukwest-01.azurewebsites.net/)

This is my Contacts App for the TFL application. Below, you will find instructions on how to run the project locally and deploy it to the cloud. The project is live and deployed [here](https://contacts-app-azhea2hwhzafdzbm.ukwest-01.azurewebsites.net/), using the Azure Free F3 Tier (may experience some lag due to this).

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Running the Project Locally](#running-the-project-locally)
4. [Preparing for Production](#preparing-for-production)
5. [Deploying to Azure](#deploying-to-azure)
6. [Continuous Integration & Deployment (CI/CD)](#continuous-integration--deployment-cicd)
7. [Troubleshooting & Common Issues](#troubleshooting--common-issues)
8. [Additional Information](#additional-information)

---

## Prerequisites
Ensure you have the following installed:

- [Visual Studio Code (IDE)](https://code.visualstudio.com/)
- [Node.js (Latest)](https://nodejs.org/en)
- [.NET SDK (9.x)](https://dotnet.microsoft.com/en-us/download)
- [C# Dev Kit & C# Extension for VS Code](https://code.visualstudio.com/docs/languages/dotnet)

Alternatively, you can use [Visual Studio](https://visualstudio.microsoft.com/), but you will need the appropriate extensions.

---

## Project Overview

The project consists of a **React TypeScript frontend** and a **.NET Core API backend** with a **SQLite database**.

### **Tech Stack**

#### **Backend (API)**
- .NET 9.x
- Entity Framework
- Scalar API Platform
- REST API using a lightweight repository pattern

#### **Frontend (Client)**
- React
- TypeScript
- Vite Compiler
- AG Grid
- GOV.UK Design System

#### **Database (SQLite)**
- Runs migrations and seeds the database with dummy data on startup.
- **For production**, PostgreSQL or MS SQL Server is recommended.

The Final Project

<img width="973" alt="Image" src="https://github.com/user-attachments/assets/ded75717-a51c-476c-a993-a75a8ff35323" />

---

## Running the Project Locally

### **Step 1: Clone the Repository**
```sh
git clone https://github.com/jamzpb/my-contacts-app.git
```
Open the project in VS Code.

### **Option 1: Pre-Production Environment**
For a setup that closely mirrors production, the API serves the static client files.

1. Navigate to the API directory in the terminal.
2. Run:
   ```sh
   dotnet run
   ```
   or
   ```sh
   dotnet watch
   ```
3. Access the client app and API interface using the URLs provided in the terminal.

<img width="752" alt="Image" src="https://github.com/user-attachments/assets/c532c5f1-90f0-449b-b66a-dfc6ff59d671" />

### **Option 2: Development Environment**
For full control over API and frontend development:

1. Open **two separate terminals**:
   - One for the **API**
   - One for the **Client**

#### **Run API**
```sh
cd api
 dotnet run
```
Test API endpoints via the Scalar UI (link provided in the terminal).

#### **Run Client**
1. Navigate to the client directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Click the localhost link to access the app.

<img width="752" alt="Image" src="https://github.com/user-attachments/assets/c532c5f1-90f0-449b-b66a-dfc6ff59d671" />

## Preparing for Production

### **Client App**
1. Create a `.env.production` file with production-specific configuration (e.g., API URL).
2. Run:
   ```sh
   npm run build
   ```
   This generates production-ready files.
3. Configure `vite.config.ts` to output the build to the API project's `wwwroot` folder.

<img width="932" alt="Image" src="https://github.com/user-attachments/assets/a8c88f63-0f75-4e1a-83dc-fbafe67c3040" />

### **API**
Add middleware support for static files in `Program.cs`.

<img width="266" alt="Image" src="https://github.com/user-attachments/assets/fba8d565-1d28-40cc-afc7-1ce4c30ba7a1" />

and include a fallback controller for the client app to handle unknown API routes.

<img width="483" alt="Image" src="https://github.com/user-attachments/assets/ac6f21be-e5dd-4a34-a270-a7b986b36c45" />

Then run:
   ```sh
   dotnet build
   ```
   and ensure there are no errors.

Finally publish the API:
   ```sh
   dotnet publish -c Release -o ./bin/Publish
   ```

The project is now ready for deployment.

---

## Deploying to Azure

### **Setup Azure Resources**
1. Sign up for [Azure](https://azure.microsoft.com/).
2. In the **Azure Portal**, create a **Resource Group** (select a region close to your location).
3. Create an **Azure Web App Service**:
   - Select the resource group created earlier.
   - Configure runtime, region, and app name.
   - For this project, the **Free Shared Infrastructure Tier** is used, but it can be upgraded as needed.
   
   ![Image](https://github.com/user-attachments/assets/d74b148b-30aa-4be0-94c2-f18d1f26ce42)
   
4. Once created, a deployment screen appears.

### **Deploy to Azure**
Using VS Code Azure Extension:
 Select the **publish folder** (`./bin/Publish`).

 Deploy via the Azure extension.

![Image](https://github.com/user-attachments/assets/757e1994-a4bd-4d8b-a345-c341f166a6d6)

 Verify the deployment in the Azure portal.

 The app should now be live on the Azure Web App Service.

![Image](https://github.com/user-attachments/assets/d60d0ae3-e09b-4065-b054-c65ddb603c3e)


## Continuous Integration & Deployment (CI/CD)

### **Setting Up CI/CD**
1. Go to **Deployment Center** in the Azure App Service Portal.
2. Select **GitHub** as the source control provider.
3. Azure will generate a basic YAML file, but it needs modifications.
4. Modify the GitHub Actions YAML file to:
   - Install client-side dependencies.
   - Run API tests.
   - Deploy changes on every merge to the `main` branch.

![Image](https://github.com/user-attachments/assets/8583ff9e-353d-4d0f-992b-ff81577532d4)

### **Deploying with GitHub Actions**
After modifying the YAML file:
1. The pipeline will:
   - Install dependencies.
   - Run tests.
   - Build the app.
   - Deploy a new artifact to Azure.
2. Verify the deployment in the Azure portal.

![Image](https://github.com/user-attachments/assets/e73a731a-db2c-4c1e-817e-d5d9d0612b1b)

## Troubleshooting & Common Issues

### **1. API not running?**
- Ensure `.NET SDK` is installed.
- Check if another process is using the same port.

### **2. Client app not loading?**
- Run `npm install` to check for missing dependencies.
- Ensure the `.env.production` file is correctly set.

### **3. Deployment failing?**
- Run `dotnet build` to catch compilation errors.
- Check Azure logs for deployment errors.

---

## Additional Information

### **Azure Web App Portal**
Provides insights, scaling options, and monitoring tools for your deployed application.

<img width="1420" alt="Image" src="https://github.com/user-attachments/assets/82135c3b-68c8-4192-81d2-daffe97e1912" />

### **Application Insights**
Located under **Diagnose and Solve Problems** in the Azure Portal. Logs errors and helps with debugging.

<img width="1420" alt="Image" src="https://github.com/user-attachments/assets/11e38d81-bfb4-4fa3-8c58-bf3876f8f32d" />

### Dynamic Table
The table is fully dynamic and has many features, please click and drag columns to find out
# My Contacts App - TFL


[![Deployment](https://img.shields.io/badge/Deployed-Azure-blue)](https://contacts-app-azhea2hwhzafdzbm.ukwest-01.azurewebsites.net/)

This is my Contacts App for the TFL application. Below, you will find instructions on how to run the project locally and deploy it to the cloud. The project is live and deployed [here](https://contacts-app-azhea2hwhzafdzbm.ukwest-01.azurewebsites.net/), using the Azure Free F3 Tier (may experience some lag due to this).

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Running the Project Locally](#running-the-project-locally)
4. [Preparing for Production](#preparing-for-production)
5. [Deploying to Azure](#deploying-to-azure)
6. [Continuous Integration & Deployment (CI/CD)](#continuous-integration--deployment-cicd)
7. [Troubleshooting & Common Issues](#troubleshooting--common-issues)
8. [Additional Information](#additional-information)

---

## Prerequisites
Ensure you have the following installed:

- [Visual Studio Code (IDE)](https://code.visualstudio.com/)
- [Node.js (Latest)](https://nodejs.org/en)
- [.NET SDK (9.x)](https://dotnet.microsoft.com/en-us/download)
- [C# Dev Kit & C# Extension for VS Code](https://code.visualstudio.com/docs/languages/dotnet)

Alternatively, you can use [Visual Studio](https://visualstudio.microsoft.com/), but you will need the appropriate extensions.

---

## Project Overview

The project consists of a **React TypeScript frontend** and a **.NET Core API backend** with a **SQLite database**.

### **Tech Stack**

#### **Backend (API)**
- .NET 9.x
- Entity Framework
- Scalar API Platform
- REST API using a lightweight repository pattern

#### **Frontend (Client)**
- React
- TypeScript
- Vite Compiler
- AG Grid
- GOV.UK Design System

#### **Database (SQLite)**
- Runs migrations and seeds the database with dummy data on startup.
- **For production**, PostgreSQL or MS SQL Server is recommended.

---

## Running the Project Locally

### **Step 1: Clone the Repository**
```sh
git clone https://github.com/jamzpb/my-contacts-app.git
```
Open the project in VS Code.

### **Option 1: Pre-Production Environment**
For a setup that closely mirrors production, the API serves the static client files.

1. Navigate to the API directory in the terminal.
2. Run:
   ```sh
   dotnet run
   ```
   or
   ```sh
   dotnet watch
   ```
3. Access the client app and API interface using the URLs provided in the terminal.

<img width="752" alt="Image" src="https://github.com/user-attachments/assets/c532c5f1-90f0-449b-b66a-dfc6ff59d671" />

### **Option 2: Development Environment**
For full control over API and frontend development:

1. Open **two separate terminals**:
   - One for the **API**
   - One for the **Client**

#### **Run API**
```sh
cd api
 dotnet run
```
Test API endpoints via the Scalar UI (link provided in the terminal).

#### **Run Client**
1. Navigate to the client directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Click the localhost link to access the app.

<img width="752" alt="Image" src="https://github.com/user-attachments/assets/c532c5f1-90f0-449b-b66a-dfc6ff59d671" />

## Preparing for Production

### **Client App**
1. Create a `.env.production` file with production-specific configuration (e.g., API URL).
2. Run:
   ```sh
   npm run build
   ```
   This generates production-ready files.
3. Configure `vite.config.ts` to output the build to the API project's `wwwroot` folder.

<img width="932" alt="Image" src="https://github.com/user-attachments/assets/a8c88f63-0f75-4e1a-83dc-fbafe67c3040" />

### **API**
Add middleware support for static files in `Program.cs`.

<img width="266" alt="Image" src="https://github.com/user-attachments/assets/fba8d565-1d28-40cc-afc7-1ce4c30ba7a1" />

and include a fallback controller for the client app to handle unknown API routes.

<img width="483" alt="Image" src="https://github.com/user-attachments/assets/ac6f21be-e5dd-4a34-a270-a7b986b36c45" />

Then run:
   ```sh
   dotnet build
   ```
   and ensure there are no errors.

Finally publish the API:
   ```sh
   dotnet publish -c Release -o ./bin/Publish
   ```

The project is now ready for deployment.

---

## Deploying to Azure

### **Setup Azure Resources**
1. Sign up for [Azure](https://azure.microsoft.com/).
2. In the **Azure Portal**, create a **Resource Group** (select a region close to your location).
3. Create an **Azure Web App Service**:
   - Select the resource group created earlier.
   - Configure runtime, region, and app name.
   - For this project, the **Free Shared Infrastructure Tier** is used, but it can be upgraded as needed.
   
   ![Image](https://github.com/user-attachments/assets/d74b148b-30aa-4be0-94c2-f18d1f26ce42)
   
4. Once created, a deployment screen appears.

### **Deploy to Azure**
Using VS Code Azure Extension:
 Select the **publish folder** (`./bin/Publish`).

 Deploy via the Azure extension.

![Image](https://github.com/user-attachments/assets/757e1994-a4bd-4d8b-a345-c341f166a6d6)

 Verify the deployment in the Azure portal.

 The app should now be live on the Azure Web App Service.

![Image](https://github.com/user-attachments/assets/d60d0ae3-e09b-4065-b054-c65ddb603c3e)


## Continuous Integration & Deployment (CI/CD)

### **Setting Up CI/CD**
1. Go to **Deployment Center** in the Azure App Service Portal.
2. Select **GitHub** as the source control provider.
3. Azure will generate a basic YAML file, but it needs modifications.
4. Modify the GitHub Actions YAML file to:
   - Install client-side dependencies.
   - Run API tests.
   - Deploy changes on every merge to the `main` branch.

![Image](https://github.com/user-attachments/assets/8583ff9e-353d-4d0f-992b-ff81577532d4)

### **Deploying with GitHub Actions**
After modifying the YAML file:
1. The pipeline will:
   - Install dependencies.
   - Run tests.
   - Build the app.
   - Deploy a new artifact to Azure.
2. Verify the deployment in the Azure portal.

![Image](https://github.com/user-attachments/assets/e73a731a-db2c-4c1e-817e-d5d9d0612b1b)

## Troubleshooting & Common Issues

### **1. API not running?**
- Ensure `.NET SDK` is installed.
- Check if another process is using the same port.

### **2. Client app not loading?**
- Run `npm install` to check for missing dependencies.
- Ensure the `.env.production` file is correctly set.

### **3. Deployment failing?**
- Run `dotnet build` to catch compilation errors.
- Check Azure logs for deployment errors.

---

## Additional Information

### **Azure Web App Portal**
Provides insights, scaling options, and monitoring tools for your deployed application.

<img width="1420" alt="Image" src="https://github.com/user-attachments/assets/82135c3b-68c8-4192-81d2-daffe97e1912" />

### **Application Insights**
Located under **Diagnose and Solve Problems** in the Azure Portal. Logs errors and helps with debugging.

<img width="1420" alt="Image" src="https://github.com/user-attachments/assets/11e38d81-bfb4-4fa3-8c58-bf3876f8f32d" />

### **Dynamic Table**
The table is fully dynamic and functional, you can drag columns around and sort them.

<img width="932" alt="Image" src="https://github.com/user-attachments/assets/9ed9bfc4-f2ba-4915-b18a-0dade4f9ac28" />



