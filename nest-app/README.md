# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/).

## Downloading

```
git clone {repository URL} -b {branch_name}
```

## Installing NPM modules

```
npm i
```

## Running application

```
docker compose up --build
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:
```
npm run test:auth
```
to run all tests with authorization

OR

```
npm run test:artillery
```
to run artillery tests (will also generate a report and put it in root directory as report.json)

## Express v. Fastify comparison

---
(based on aggregate reports, intermediate reports can be found in [artillery-reports](artillery-reports) directory)

|    	                    | EXPRESS                 |   FASTIFY               |
|--------------------------	|-------------------------|-------------------------|
| SCENARIOS CREATED         | 3000                    | 3000                    |         
| SCENARIOS COMPLETED       | 3000                    | 3000                    |
| REQUEST COMPLETED         | 15000                   | 15000                   |
|                           |                         |                         |
| LATENCY:                  |                         |                         |
|      min                  | 2                       | 3                       |
|      max                  | 434                     | 1580                    |
|      median               | 7                       | 9                       |
|      p95                  | 90                      | 133                     |
|      p99                  | 104                     | 191                     |
|                           |                         |                         |
| RPS:                      |                         |                         |                            
|      count                | 15000                   | 15000                   |
|      mean                 | 49.92                   | 49.92                   |
|                       	|                         |                         |
| SCENARIO DURATION: 	    |                         |                         |
|      min:                 | 87                      | 89.9                    |
|      max:                 | 677.2                   | 1643.5                  |
|      median:              | 114.7                   | 156                     |
|      p95:                 | 141.9                   | 263.5                   |
|      p99:                 | 178.8                   | 400.9                   |
|                           |                         |                         |
| SCENARIO COUNTS:      	| Test user routes: 3000  | Test user routes: 3000  |
|                           |                         |                         |  
| ERRORS:                   | _none_                  | _none_                  |
|                           |                         |                         |
| CODES:                    |                         |                         |
|      200:                 | 12000                   | 12000                   |                	
|      201:                 | 3000                    | 3000                    |                   	
|                           |                         |                         |
| MATCHES                   | 0                       | 0                       |
|                           |                         |                         |
| PHASES:                   |                         |                         |
|       duration            | 300                     | 300                     |
|       arrival rate        | 10                      | 10                      |
|       maxVusers           | 50                      | 50                      |
---

## Check code format

```
npm run lint
```