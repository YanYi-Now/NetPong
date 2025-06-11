## Technologies Used
**Frontend:**
* TypeScript
* Tailwind CSS
* Webpack

**Backend:**
* Node.js (Fastify Framework)
* WebSockets (for real-time game state)
* JWT for authentication
* 2FA (via OTP)
* Google OAuth2

**Database:**
* SQLite

**Deployment/Infrastructure:**
* Docker
* Docker Compose
* Nginx (as a reverse proxy)
* Cloudflared (for external access, though not strictly required for local dev)


## Setup

### Prerequisites
- **Docker**:
  - For Windows / macOS: Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
  - Linux: Install [Docker Engine and Docker Compose](https://docs.docker.com/engine/install/) 
       
- **mkcert**: Command-line tool to create locally trusted TLS certificates.
  - Installation Instructions for [mkcert](https://github.com/FiloSottile/mkcert#installation)


