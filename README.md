# Star Wars API Wrapper

## About
This project is a Node.js API built with NestJS, which serves as a wrapper around the [Star Wars API (SWAPI)](https://swapi.dev). It provides endpoints for fetching films, species, vehicles, starships, and planets from the Star Wars universe. The application caches API responses for 24 hours and offers pagination and filtering capabilities.

## Features
- **Caching:** Every resource fetched from SWAPI is cached for 24 hours.
- **Pagination:** API responses are paginated for easier data management.
- **Filtering:** Endpoints offer filtering capabilities for specific fields.
- **Data Analysis:** Analyze text data from film openings and find the most frequent characters.

## Prerequisites
To run this project, you will need Docker and Docker Compose installed on your machine.

## Getting Started

### Setting Up and Running the Application
1. **Clone the Repository:**
git clone https://github.com/[your-username]/[your-repo-name].git
cd [your-repo-name]

2. **Build and Run with Docker Compose:**
docker-compose up --build


This command builds the Docker image for the application and starts the containers defined in the `docker-compose.yml` file.

3. **Access the Application:**
Once the application is running, you can access it at `http://localhost:3000`.

### Using the API
- Access the GraphQL playground at `http://localhost:3000/graphql`.
- Use REST endpoints:
- `/films` for films data.
- `/species` for species data.
- `/vehicles` for vehicles data.
- `/starships` for starships data.
- `/planets` for planets data.

### Running Tests
Run the following command to execute the automated tests:
docker-compose exec app npm test


## Documentation
For detailed API documentation, visit the Swagger UI at `http://localhost:3000/api`.
