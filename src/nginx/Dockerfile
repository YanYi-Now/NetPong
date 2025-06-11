#---------------------------------NGINX----------------------------------

FROM nginx:latest

# Create necessary directories
RUN mkdir -p /etc/nginx/ssl /usr/share/nginx/html /var/log/nginx/proxy_logs

# Copy self-signed localhost certificates for local development
COPY ./ssl/localhost.crt /etc/nginx/ssl/localhost.crt
COPY ./ssl/localhost.key /etc/nginx/ssl/localhost.key

# Set appropriate permissions for the certificates
RUN chmod 644 /etc/nginx/ssl/localhost.crt && \
    chmod 600 /etc/nginx/ssl/localhost.key

# Copy the Nginx configuration file
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf

# Expose port 443 (HTTPS) inside the container
# This is where Nginx will listen for incoming connections.
EXPOSE 443

# Nginx master process usually runs as root initially to bind to privileged ports,
# then drops privileges to a non-root user (e.g., 'nginx' user inside the container)
# for worker processes.
USER root

# Command to start Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
