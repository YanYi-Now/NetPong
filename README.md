
# Netpong: Multiplayer Pong Game Platform

Netpong is a **Dockerized, full-stack, web application**.  

*Compete in live pong matches, authenticate securely, and climb the leaderboards.*

## Features
### Core Functions
  * **Remote Real-Time Matches**: Players are remotely synchronised to a server-side game engine via websockets
  * **Tournament System**: Host and compete in tournaments globally
  * **Social Features**: Add friends, view online statuses and global rankings
  * **Performance Analytics**: View your games statistics and match history in auto-generated dashboards
  
### Security 
 * **User Authentication**: Secure log-in with 2FA and Google OAuth2 
 * **Secure Session Management**: Pre-authentication, access, and refresh tokens manage login sessions
 * **Secure Communication (HTTPS/WSS)**: All data in transit across the platform is encrypted
 

## Built With

  * **Frontend**: TypeScript, Tailwind CSS, Webpack
  * **Backend**: Node.js (Fastify Framework), WebSockets, JWT, 2FA (via OTP), Google OAuth2
  * **Database**: SQLite
  * **Deployment**: Docker, Docker Compose, Nginx, Cloudflared


## Prerequisites

  * **Docker**:
      * **For Windows / macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop) recommended
      * **For Linux**: Install Docker Engine and Docker Compose natively
  * **mkcert**:
      * Command line tool for making locally trusted TLS certificate
  

## Installation Instructions

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

