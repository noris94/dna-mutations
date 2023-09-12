# DNA Mutations API

API Rest for validation of mutations in DNA samples taken.
This API has two enpoints. The first one is a POST where a strings array is sent. 

## Table of contents

1. [Previous requirements](#previous-requirements)
2. [Installation](#installation)
3. [Running the App](#running-the-app)
4. [Endpoints](#endpoints)
   - [POST /mutation](#post-mutation)
   - [GET /stats](#get-stats)
5. [Testing](#testing)

## Previous requirements
1. Clone this repository in your machine.

  ```
  git clone https://gitlab.com/noris94/dna-mutations.git
  ```
2. You need to have Node.JS v16.x or greater intalled in your computer

3. To run locally this app you will need to configure a ```.env``` file in root directory. This file has to look like the following:
  ```
    ACCESS_KEY_ID_AWS=MY_ACCESS_KEY
    SECRET_ACCESS_KEY_AWS=MY_SECRET_ACCESS_KEY
```
  *Note*: Due to sensible information, these access keys are not provided, you will have to contact the author to get your own credentials
## Installation
 
To install all project dependecies just run the following command in terminal located in project root folder:

```bash
 npm install
```
## Running the app
After you have installed all dependencies you can run the app by any of these commands:

```bash
# development
npm run start

# watch mode
npm run start:dev

```

## Endpoints

#### Running locally
When you start the application, it starts running in 
- http://localhost:3000/

#### Test the API in cloud
This app is hosted in AWS and you can test it by the following URL:
- https://0r0ed7230k.execute-api.us-east-1.amazonaws.com


Now you can use `Postman` or another client of your preference to test the app.

There are 2 endpoints to test:
### POST /mutation
- **Description:** Evaluates if a mutation exists given a DNA sequence.
- **HTTP METHOD:** POST
- **URL:** `/mutation`
- **Body request example:**
  ```
    {
      "dna":
        [
          "ATGCGA", 
          "CAGTGC", 
          "TTATGT", 
          "AGAAGG", 
          "CCCCTA", 
          "TCACTG"
        ]
    }
  ```
- **Response example (200 OK)**:
  ```
  {
    "hasMutations": true
  }
  ```
- **Response example (403 FORBIDDEN)**:
  ```
  {
    "hasMutations": false
  }
  ```
- **Response example (409 CONFLICT)**:
  ```
  {
    "message": "This DNA has already been saved before"
  }
  ```
- **Response example (400 BAD REQUEST)**:
  ```
  {
    "message": [
        "Each string must have only A, T, C or G letters"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

### GET /stats
- **Description:** Retrieves statistics about the DNA's sent to the API.
- **HTTP METHOD:** GET
- **URL:** `/stats`
- **Response example (200 OK)**:
  ```
  {
    "count_mutations": 8,
    "count_no_mutation": 5,
    "ratio": 1.6
  }
  ```
## Testing

```bash
# unit tests
npm run test
```

