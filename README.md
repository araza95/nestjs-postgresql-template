# 🛠️ **NestJS Starter Template** | PostgreSQL + TypeORM + TypeScript

Welcome to the **NestJS Starter Template**. This project uses **PostgreSQL** for the database, **TypeORM** as the ORM, and is fully written in **TypeScript**. Below is a detailed explanation of the folder structure and key components.

---

## 📂 **Project Structure**

### 📁 **config**

- **Purpose**: Contains all the configuration files needed to set up and manage various aspects of the application.

  **Subfolders**:

  - **database**:
    - `orm.config.ts`: TypeORM configuration for connecting to PostgreSQL.
  - **loaders**:
    - `app.config.ts`: Application configuration file.
    - `database.config.ts`: Configuration file for database connection settings.
    - `smtp.config.ts`: Configuration for SMTP mail service.
  - **schema**:
    - `index.ts`: Zod schema for validating environment variables.

---

### 📂 **decorators**

- **Purpose**: Encapsulates logic into reusable decorator functions that can be applied in controllers or services.

  **Examples**:

  - `IsYearMonthDayFormatConstraint.decorator.ts`: Custom decorator for date validation.
  - `index.ts`: Aggregates all custom decorators.

---

### 📂 **middleware**

- **Purpose**: Contains middleware files that are executed before a request is handled by the controller. These handle tasks like logging, raw body processing, and query logging.

  **Examples**:

  - `httpLogger.middleware.ts`: Logs incoming HTTP requests.
  - `rawBody.middleware.ts`: Processes raw request bodies.
  - `jsonBody.middleware.ts`: Handles JSON body parsing.
  - `queryLogger.middleware.ts`: Logs database queries.

---

### 📂 **modules**

- **Purpose**: Core business logic and feature-specific functionality reside here. Divided into two parts: **core** and **features**.

  **Core Modules**:

  - **auth**: Contains authentication logic, JWT strategies, guards, and DTOs.
  - **mail**: Handles email functionalities, contains different email templates like payment-successfull.email.ts and etc
  - **jwt**: Contains jwt services like token generation, validation for user and admin

  **Feature Modules**:

  - **user**:
    - `user.module.ts`:Registers user controller,service and all dependencies.
    - `user.controller.ts`: Defines the routes for user-related operations.
    - `user.service.ts`: Contains the logic for user operations.
    - `user.dto.ts`: Defines the data transfer objects for user operations.
  - **otp**:
    - `otp.controller.ts`: Manages OTP-related routes.
    - `otp.service.ts`: Implements OTP logic.
    - `otp.dto.ts`: DTOs for OTP functionalities.

---

### 📂 **types**

- **Purpose**: Defines enums, interfaces, and constants used throughout the application to ensure type safety and consistency.

  **Subfolders**:

  - **enums**:
    - **user**:
      - `user-role.enum.ts`: Defines user roles.
      - `user-provider.enum.ts`: Enum for user providers (e.g., Google, Facebook).
    - **otp**:
      - `otp-reason.enum.ts`: Enum defining the possible OTP reasons.
  - **interfaces**: Commonly used interfaces like JWT payloads, user objects, etc.
  - **constants**: Holds project-wide constants, such as `APP_NAME`, `JWT_SECRET`, etc.

---

### 📂 **utils**

- **Purpose**: Helper functions and utility logic that can be used throughout the application.

  **Subfolders**:

  - **app**: Contains utility files for various functions such as:
    - `errorSchema.ts`: Standard error response schema.
    - `dataFormat.ts`: Functions for data formatting.
    - `getMonthNumber.ts`: Converts month names to numbers.
    - `httpException.ts`: Custom HTTP exceptions.
    - `getSslType.ts`: Determines SSL type based on environment.
  - **regex**: Contains logic for validation
    - `regex-error.ts`: Contains tests for numeric, alphabetic, alphanumeric validation
    - `regex.ts`: Contains regex expression for different tests.
  - **hashing**: Functions for hashing and comparing data using bcrypt.
    - `bcrypt.ts`: Hashing/Comparing logic using bcrypt.
  - `verifyRsaSignature.ts`: Utility to verify RSA signatures.

---

### **Other Important Files**

- **`main.ts`**: Contains the main application entry point, including Swagger documentation setup and server listening logic.
- **`.env.example`**: Example environment variables file.

- **`.eslintrc.js`**: ESLint configuration for maintaining code style and standards.

- **`.gitignore`**: Specifies which files and directories should be ignored by Git.

- **`.prettierrc`**: Prettier configuration for consistent code formatting.

- **`nest-cli.json`**: NestJS CLI configuration file.

- **`package.json`**: Defines project dependencies and scripts.

- **`pnpm-lock.yaml`**: Lock file for managing project dependencies with PNPM.

- **`tsconfig.json`**: TypeScript configuration file.

---

## 🚀 **Running the Project**

1. **Install Dependencies**:

   ```bash
   pnpm install
   ```

2. **Setup Environment Variables**:
   Copy the `.env.example` file and create a `.env` file. Adjust the variables according to your environment setup (e.g., database credentials, JWT secret).

3. **Run the Application**:

   - **In watch mode** (for development):
     ```bash
     pnpm start:dev
     ```
   - **In normal mode**:
     ```bash
     pnpm start
     ```

4. **Build the Application**:

   ```bash
   pnpm build
   ```

5. **Init Husky**: ( To set up Git hooks using Husky, run the following command ):
    ```bash
    pnpm exec husky init
    ```

6. **Swagger Documentation**:
   Access the auto-generated Swagger API documentation at:
   ```
   http://localhost:6000/docs
   ```

---
