## event360

## Live_Link: https://event360-server-phi.vercel.app/

## Getting Started

<h3>This is a service and event based website(backend)</h3>

### Prerequisites

What things you need to install the software .

- express
- MongoDB
- cors
- dotenv
- nodemon


### Installing

<p> `npm i express mongodb nodemon cors dotenv` </p>


Technologies Used
- Node.js
- Express.js
- MongoDB
- dotenv
- cors




# Usage
## Services API
### POST /service: Create a new service.
### GET /services: Get all services.
### GET /services/:id: Get a service by ID.
### DELETE /services/:id: Delete a service by ID.
### PUT /services/:id: Update a service by ID.

## Events API
### POST /eventItem: Create a new event item.
### GET /eventItems: Get all event items.
### GET /eventItems/:id: Get an event item by ID.
### DELETE /eventItems/:id: Delete an event item by ID.
### PUT /eventItems/:id: Update an event item by ID.

## Recent Events API
### GET /recents: Get all recent events.
### GET /recents/:id: Get a recent event by ID.
### DELETE /recents/:id: Delete a recent event by ID.
### POST /recent: Create a new recent event.

## Reviews API
### GET /reviews: Get all reviews.
### DELETE /reviews/:id: Delete a review by ID.
### POST /review: Create a new review.

## Galleries API
### GET /galleries: Get all galleries.

## Run locally
step1: `npm install`
step2: `npm start`