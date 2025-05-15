<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 7-Day Backend Skill Boost Plan for Interview

This comprehensive plan will help you boost your backend skills and build a "Travel Buddy" demo project in 7 days, with 6 hours of focused learning per day.

## Project Overview: "Travel Buddy" - One-Day Trip Planner

This application will allow users to plan efficient one-day trips by:

- Inputting origin/destination locations
- Setting timeframe for the trip
- Getting AI-powered suggestions for attractions and stops
- Optimizing the route based on opening hours and traffic
- Saving trip history and preferences

## 7-Day Learning & Development Plan

### Day 1: NestJS & TypeScript Foundation with CI/CD Setup

**Morning (3 hours):**

- Set up development environment
- Create NestJS project using CLI
- Understand NestJS architecture (modules, controllers, providers)
- Learn TypeScript fundamentals for backend (interfaces, types, decorators)

**Afternoon (3 hours):**

- Create basic API structure for the trip planner
- Implement first controller and service
- Set up basic validation with class-validator and DTOs
- Set up GitHub repository with CI pipeline
- Configure automated testing in GitHub Actions

**Practical Task:**
Build a basic NestJS application with a `/health-check` endpoint and a `/trip-plan` endpoint that accepts origin and destination parameters. Push to GitHub with CI configuration that runs tests automatically.

**Deployment Preparation:**

- Register for a free tier on cloud providers (AWS, DigitalOcean, or Render)
- Set up SSH keys for secure server access

### Day 2: Database Integration (MongoDB) with Cloud Database

**Morning (3 hours):**

- Learn MongoDB basics
- Set up MongoDB Atlas cloud database (free tier)
- Design database schemas for trips and users
- Implement Mongoose in NestJS

**Afternoon (3 hours):**

- Create repository pattern for data access
- Implement CRUD operations for trips
- Add data validation and error handling
- Practice database queries and aggregations
- Set up database connection pooling for production

**Practical Task:**
Implement user and trip schemas, create a service to save trip plans, and retrieve trip history by user ID. Configure your application to connect to MongoDB Atlas with proper error handling and connection pooling.

**Deployment Preparation:**

- Set up environment variables for database credentials
- Create database backup/restore scripts

### Day 3: External API Integration, Authentication & Environment Setup

**Morning (3 hours):**

- Set up OpenAI API integration for trip suggestions
- Implement Google Maps API for geocoding and route calculation
- Learn request caching techniques
- Implement HTTP module and interceptors

**Afternoon (3 hours):**

- Set up JWT authentication
- Create user registration and login flows
- Implement guards for protected routes
- Add role-based access control
- Configure environment variables for different deployment environments
- Set up secrets management

**Practical Task:**
Create an AI service that suggests attractions based on location and implement a basic authentication system with JWT tokens. Create environment configuration files for development, testing, and production.

**Deployment Preparation:**

- Register for Google Maps and OpenAI API keys
- Create a secrets management strategy (using .env files locally, environment variables in production)

### Day 4: Redis Caching, Error Handling & Server Provisioning

**Morning (3 hours):**

- Set up Redis connection in NestJS
- Implement caching for external API responses
- Learn cache invalidation strategies
- Create custom cache decorators
- Set up Redis Cloud instance (free tier)

**Afternoon (3 hours):**

- Implement global exception filters
- Create custom exceptions
- Set up comprehensive logging system with Winston
- Add request validation pipelines
- Provision a server on DigitalOcean ($5/month droplet)
- Configure Nginx as a reverse proxy

**Practical Task:**
Implement Redis caching for Google Maps API responses and create a robust error handling system with custom exceptions and proper HTTP status codes. Configure a basic server with Nginx.

**Deployment Preparation:**

- Set up a $5/month DigitalOcean droplet (or equivalent on another provider)
- Install Docker on the remote server
- Configure SSH access to the server

### Day 5: Microservices Architecture, Kafka & Security Hardening

**Morning (3 hours):**

- Learn microservices principles
- Set up Kafka connection in NestJS
- Understand event-driven architecture
- Create message producers and consumers
- Use CloudKarafka for hosted Kafka (free tier)

**Afternoon (3 hours):**

- Split application into microservices
- Implement communication between services
- Set up event patterns for trip planning
- Practice message serialization and deserialization
- Configure SSL/TLS on your server
- Set up basic firewall rules

**Practical Task:**
Create a separate microservice for AI recommendations that communicates with the main service through Kafka events. Secure your server with proper SSL and firewall configuration.

**Deployment Preparation:**

- Generate SSL certificates (Let's Encrypt)
- Configure Nginx with SSL
- Set up basic firewall rules (ufw)

### Day 6: Testing, Documentation & Continuous Deployment

**Morning (3 hours):**

- Learn unit testing in NestJS
- Implement unit tests for services
- Create integration tests for API endpoints
- Set up test database
- Configure code coverage reports

**Afternoon (3 hours):**

- Create Swagger documentation
- Add detailed API descriptions
- Implement health checks and monitoring
- Create comprehensive README
- Set up continuous deployment pipeline
- Configure automated deployment to your server

**Practical Task:**
Write tests for the trip planning service and create Swagger documentation for all API endpoints. Set up a GitHub Actions workflow that automatically deploys your application to your DigitalOcean server when you push to the main branch.

**Deployment Preparation:**

- Configure deployment keys in GitHub
- Set up Docker Hub or GitHub Container Registry
- Create deployment scripts

### Day 7: Production Deployment & Frontend Integration

**Morning (3 hours):**

- Create production-ready Dockerfile and docker-compose
- Set up environment variables for production
- Implement logging for production with log rotation
- Configure database backups
- Set up application monitoring (PM2)
- Add alerting for critical errors (Sentry.io free tier)

**Afternoon (3 hours):**

- Create a minimal React frontend
- Implement API integration with the backend
- Add map visualization for the trip
- Deploy frontend to Netlify or Vercel (free tier)
- Prepare demo presentation

**Practical Task:**
Deploy your complete application to your DigitalOcean server using Docker. Set up monitoring and alerting. Create a simple React frontend that displays the planned trip on a map and deploy it to Netlify.

## Project Structure

```
trip-planner/
├── .github/
│   └── workflows/
│       ├── test.yml
│       └── deploy.yml
├── docker-compose.yml
├── docker-compose.prod.yml
├── Dockerfile
├── nginx/
│   └── default.conf
├── README.md
├── backend/
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── dto/
│   │   │   ├── guards/
│   │   │   └── strategies/
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── dto/
│   │   │   └── schemas/
│   │   ├── trips/
│   │   │   ├── trips.module.ts
│   │   │   ├── trips.controller.ts
│   │   │   ├── trips.service.ts
│   │   │   ├── dto/
│   │   │   └── schemas/
│   │   ├── locations/
│   │   │   ├── locations.module.ts
│   │   │   ├── locations.service.ts
│   │   │   └── schemas/
│   │   ├── ai-service/
│   │   │   ├── ai.module.ts
│   │   │   └── ai.service.ts
│   │   ├── maps-service/
│   │   │   ├── maps.module.ts
│   │   │   └── maps.service.ts
│   │   ├── common/
│   │   │   ├── interceptors/
│   │   │   ├── filters/
│   │   │   ├── decorators/
│   │   │   └── pipes/
│   │   ├── config/
│   │   │   ├── configuration.ts
│   │   │   ├── configuration.development.ts
│   │   │   ├── configuration.production.ts
│   │   │   └── configuration.test.ts
│   │   └── health/
│   │       ├── health.module.ts
│   │       ├── health.controller.ts
│   │       └── health.service.ts
│   ├── test/
│   └── package.json
├── recommendation-service/ (microservice)
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── recommendation/
│   │       ├── recommendation.controller.ts
│   │       └── recommendation.service.ts
│   └── package.json
├── notification-service/ (microservice)
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── notification/
│   │       ├── notification.controller.ts
│   │       └── notification.service.ts
│   └── package.json
├── deployment/
│   ├── scripts/
│   │   ├── deploy.sh
│   │   ├── backup-db.sh
│   │   └── restore-db.sh
│   ├── nginx/
│   │   └── conf.d/
│   │       └── app.conf
│   └── monitoring/
│       └── pm2-config.json
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── components/
    │   │   ├── TripForm.tsx
    │   │   ├── TripMap.tsx
    │   │   └── TripItinerary.tsx
    │   └── services/
    │       └── api.ts
    ├── public/
    ├── .github/workflows/deploy.yml
    └── package.json
```

## API Endpoints

```
Authentication:
POST /auth/register - Register new user
POST /auth/login - Login and get JWT token
POST /auth/refresh - Refresh JWT token
GET /auth/me - Get current user info

Trips:
POST /trips - Create a new trip plan
GET /trips - Get all trips for current user
GET /trips/:id - Get specific trip details
PUT /trips/:id - Update trip
DELETE /trips/:id - Delete trip

Locations:
GET /locations/search - Search for locations
GET /locations/:id - Get location details

Monitoring:
GET /health - Service health check
GET /health/db - Database connection status
GET /health/redis - Redis connection status
GET /health/kafka - Kafka connection status
GET /metrics - Application metrics (protected)
```

## Deployment Instructions

### Server Setup on DigitalOcean

1. Create a $5/month Droplet with Ubuntu
2. SSH into your server:
   ```bash
   ssh root@your_server_ip
   ```
3. Install Docker and Docker Compose:
   ```bash
   apt update
   apt install -y docker.io docker-compose
   systemctl enable --now docker
   ```
4. Install Nginx:
   ```bash
   apt install -y nginx
   ```
5. Set up firewall:
   ```bash
   ufw allow OpenSSH
   ufw allow 'Nginx Full'
   ufw enable
   ```

### SSL Configuration with Let's Encrypt

1. Install Certbot:
   ```bash
   apt install -y certbot python3-certbot-nginx
   ```
2. Obtain SSL certificate:
   ```bash
   certbot --nginx -d yourdomain.com
   ```

### Continuous Deployment with GitHub Actions

Create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker images
        run: docker-compose -f docker-compose.prod.yml build

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Push Docker images
        run: docker-compose -f docker-compose.prod.yml push

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/trip-planner
            git pull
            docker-compose -f docker-compose.prod.yml pull
            docker-compose -f docker-compose.prod.yml up -d
```

### Docker Compose for Production

Create a `docker-compose.prod.yml` file:

```yaml
version: '3.8'

services:
  backend:
    image: yourusername/travel-buddy-backend:latest
    restart: always
    environment:
      - NODE_ENV=production
      - DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/trip-planner
      - REDIS_URI=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
    depends_on:
      - redis
    networks:
      - app-network

  recommendation-service:
    image: yourusername/travel-buddy-recommendation:latest
    restart: always
    environment:
      - NODE_ENV=production
      - KAFKA_BROKERS=${KAFKA_BROKERS}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    networks:
      - app-network

  notification-service:
    image: yourusername/travel-buddy-notification:latest
    restart: always
    environment:
      - NODE_ENV=production
      - KAFKA_BROKERS=${KAFKA_BROKERS}
    networks:
      - app-network

  redis:
    image: redis:alpine
    restart: always
    volumes:
      - redis-data:/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:

volumes:
  redis-data:
```

## Key Technical Features to Showcase

1. **Production-Ready Architecture**

   - Proper separation of concerns
   - Environment-specific configurations
   - Comprehensive error handling and logging

2. **Security Best Practices**

   - Secure authentication and authorization
   - Data encryption at rest and in transit
   - Protection against common web vulnerabilities

3. **Scalable Design**

   - Microservices architecture
   - Event-driven communication
   - Database optimization

4. **DevOps Integration**

   - CI/CD pipeline
   - Containerization
   - Infrastructure as code approach

5. **Performance Optimization**
   - Caching strategy
   - Database indexing
   - Load balancing configuration

## Daily Detailed Learning Resources

### Day 1: NestJS & TypeScript + CI/CD

- [NestJS Official Documentation](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Tutorial: "Setting up CI/CD for NestJS with GitHub Actions"

### Day 2: MongoDB + Cloud Database

- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [NestJS with MongoDB](https://docs.nestjs.com/techniques/mongodb)
- [Database Connection Pooling Best Practices](https://www.mongodb.com/blog/post/connection-pooling-for-mongodb-node-js-driver)

### Day 3: API Integration, Auth & Environment Setup

- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Managing Secrets in NestJS](https://docs.nestjs.com/techniques/configuration)
- [Google Maps API Documentation](https://developers.google.com/maps/documentation)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)

### Day 4: Redis, Error Handling & Server Provisioning

- [DigitalOcean $5 Droplet Setup Guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-ubuntu-20-04-server-on-a-digitalocean-droplet)
- [Redis Cloud Documentation](https://docs.redis.com/latest/rc/)
- [Nginx as a Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

### Day 5: Microservices, Kafka & Security

- [CloudKarafka Documentation](https://www.cloudkarafka.com/docs.html)
- [SSL/TLS Configuration with Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)
- [Basic Firewall Setup with UFW](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-20-04)

### Day 6: Testing, Documentation & CD

- [Continuous Deployment with GitHub Actions](https://docs.github.com/en/actions/deployment/about-deployments)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [OpenAPI/Swagger with NestJS](https://docs.nestjs.com/openapi/introduction)

### Day 7: Production Deployment & Monitoring

- [PM2 Process Manager](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Docker in Production Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Sentry.io for Error Tracking](https://docs.sentry.io/platforms/node/)
- [Netlify Deployment Documentation](https://docs.netlify.com/#get-started)

## Advanced Technical Implementations (For Bonus Points)

1. **Rate Limiting**

   - Implement rate limiting for API endpoints using Redis
   - Create custom rate limiting strategies for different endpoints

2. **Circuit Breaker Pattern**

   - Implement circuit breaker pattern for external API calls
   - Handle graceful degradation of service

3. **Distributed Tracing**

   - Set up OpenTelemetry for distributed tracing
   - Track request flows across microservices

4. **API Versioning**

   - Implement proper API versioning strategy
   - Create backward compatibility layers

5. **Advanced Caching**
   - Implement multi-level caching strategy
   - Use cache stampede protection techniques
