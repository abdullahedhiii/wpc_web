**# Project Setup Guide**

This project includes a **React frontend** and a **Node.js backend**, configured to run using **Docker Compose**. The **PostgreSQL database** is expected to be hosted externally, and can restore the provided database backup locally and update the configuration accordingly.

---

**## Prerequisites**

- Install **Docker Desktop** (Windows/Mac)
- Install **PostgreSQL** locally for database restoration

---

**## Setup Instructions**

**1. Clone the Repository**

Clone the project and navigate to the root directory:

```bash
git clone https://github.com/abdullahedhiii/wpc_web.git 
cd wpc_web  
```

---

**2. Configure Environment Variables**

Update the **database credentials** in the `docker-compose.yml` file according to your local PostgreSQL setup.

**Backend Service (Node.js)**

Example environment variables:

```makefile
DB_HOST=host.docker.internal  # Change this to your database host  
DB_PORT=5432  # Update with your PostgreSQL port  
DB_USER=your_db_user  
DB_PASSWORD=your_db_password  
DB_NAME=your_db_name  
```

- The `.env` file can be mounted inside the container if needed.
- Ensure the provided backup file matches the database configuration.

---

**3. Database Setup**

A **PostgreSQL backup file** will be provided for development and testing purposes.

**Steps to Restore the Database:**

1. Install **PostgreSQL** locally if not already installed.
2. Create a new database in PostgreSQL with your desired name.
3. Restore the backup using the following command:

   ```bash
   psql -U <your_db_user> -d <your_db_name> -f path/to/backup.sql
   ```

4. Update the database credentials in the `docker-compose.yml` file accordingly.
5. Ensure **PostgreSQL** is running on the specified port.

---

**4. Start the Application**

Run the following command to build and start all containers:

```bash
docker-compose up --build  
```

To run the containers in detached mode (in the background):

```bash
docker-compose up -d  
```

---

**5. Stop the Application**

To stop all running containers, use:

```bash
docker-compose down  
```

---

**6. Access the Application**

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3300](http://localhost:3300)
- **Database:** Accessible locally at your configured port with provided credentials.

---

**7. Docker Compose Configuration Overview**

The `docker-compose.yml` file includes the following services:

- **Frontend Service:**
  - Builds from the `./frontend` directory using `Dockerfile`.
  - Exposes port **5173** for the React app.
  - Depends on the backend service.
  - Environment variable for API URL is set.

- **Backend Service:**
  - Builds from the `./backend` directory using `Dockerfile`.
  - Exposes port **3300** for the Node.js server.
  - Connects to a **PostgreSQL** database with custom credentials.

- **Networks:**
  - A bridge network named **app-network** connects both services.

---

