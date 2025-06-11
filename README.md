
# Netpong: Remote Multiplayer Pong Game Platform

Netpong is a **Dockerized, full-stack, Single Page Application**.  

*Engage in live pong matches, authenticate securely, and climb global leaderboards.*

## Features
### Core Functions
  * **Real-time Remote Matches**: Deliver seamless online matches by synchronising players to a server-side game engine
  * **Tournament System**: Players can create and/or join tournaments featuring ELO-based matchmaking
  * **User Features**: Players can register accounts, follow and view each other's online status
  * **Performance Analytics**: Track and visualise user's personal gaming statistics and match history in dashboards
  
### Security 
 * **Secure Session Management**: Implement pre-authentication, access, and refresh JSON tokens to protect API endpoints
 * **Secure Communications (HTTPS/WSS)**: Encrypt all data in transit across the platform
 * **User Authentication**: Enables secure sign-in using Google Sign-in or 2FA

## Technologies Used

  * **Frontend**: TypeScript, Tailwind CSS, Webpack
  * **Backend**: Node.js (Fastify Framework), WebSockets, JWT, 2FA (via OTP), Google OAuth2
  * **Database**: SQLite
  * **Deployment/Infrastructure**: Docker, Docker Compose, Nginx, Cloudflared


## Prerequisites

  * **Docker**:
      * **For Windows / macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop) recommended
      * **For Linux**: Install Docker Engine and Docker Compose natively
  * **mkcert**:
      * Command line tool for making locally trusted TLS certificate
  

## Installation 

Follow these steps to deploy Netpong on your local machine

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YanYi-Now/Netpong.git netpong
    cd netpong
    ```

2.  **Create `.env` file from `env.example`:**
    ```bash
    cp env.example .env
    ```
    
3.  **Generate SSL certificates for local host (using `mkcert`):**
   
     These certificates are necessary for Nginx to serve the application over HTTPS locally

    ```bash
    # Navigate to the SSL directory
    cd src/nginx/ssl
    # Install mkcert's root CA (run this command once per machine)
    mkcert -install
    # Generate certificates for localhost
    mkcert localhost 127.0.0.1 ::1
    # Rename the files to match Nginx configuration 
    mv localhost+1-key.pem localhost.key
    mv localhost+1.pem localhost.cert
    ```

   4. **Build and Run the Docker containers (using `make`):**

      ```bash
        cd ../../.. # Navigate back to project root
        make
      ```


## Usage

### Access the Application

Once the containers are up and running, open your web browser and navigate to:

  * **`https://localhost:8080`**
    
### Demo Credentials

For quick testing, login using the following pre-configured guest account:

  * **Username:** `guest`
  * **Password:** `guestpass`

