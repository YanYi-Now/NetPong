COMPOSE = docker compose
COMPOSE_FILE = docker-compose.yml 

#------------------------------------------------------------------------

# colours
RED = \033[1;31m
GREEN = \033[1;32m
BROWN = \033[1;33m
END = \033[0m

#------------------------------------------------------------------------

all: down up

# Create and start all containers defined in the docker compose file
# --build: build images before starting
# -d: run detached in background
# --force-recreate: ensures new containers are created even if no config changes detected
up:
	@echo "$(GREEN)[ Starting containers... ]$(END)"
	@$(COMPOSE) -f $(COMPOSE_FILE) up --build --force-recreate -d

# Run the Pong-CLI interactively in a new container, connected to the project's network
# --rm: automatically remove the container when it exits
# pong-cli: the service name defined in docker-compose.yml
# bash: the command to run inside the container
cli:
	@echo "$(GREEN)[ Running Pong-CLI... ]$(END)"
	# Ensure the backend is running for the CLI to connect to
	@$(COMPOSE) -f $(COMPOSE_FILE) up -d backend
	@$(COMPOSE) -f $(COMPOSE_FILE) run --rm pong-cli bash

# Stop and remove all containers defined in the docker compose file
down:
	@echo "$(BROWN)[ Stopping and removing containers... ]$(END)"
	@$(COMPOSE) -f $(COMPOSE_FILE) down

# Remove build cache and prune unused Docker objects (images, containers, networks)
clean: down
	@echo "$(BROWN)[ Removing build cache and unused Docker objects... ]$(END)"
	# Removes all build cache
	@docker builder prune -a -f
	# Removes unused containers, networks, images (dangling)
	@docker system prune -f

# Fully clean the project: stop, remove containers, networks, AND volumes
# This will delete database data (sqlite_data) and uploaded avatars (avatar_data)!
fclean: down
	@echo "$(BROWN)[ Removing all project volumes and cleaning up... ]$(END)"
	# Safely removes project-related volumes
	@$(COMPOSE) -f $(COMPOSE_FILE) down --volumes
	# Clean up build cache
	@docker builder prune -a -f
	# Clean up other unused Docker objects
	@docker system prune -f

# Rebuild and restart all containers
re: down up

#------------------------------------------------------------------------

.PHONY: all up down clean fclean re