
# This is a Nestjs application. Soon front-end part will be added.

So far user can create account login, retrieve infor and loggout.
If user loggout they must loggin first to access sensitive information.
 
# stack used. 
 - Docker 
 - TypeOrm to connet with MySQL
 - Typscript
 - Guards
 - Http Cookies
 - Login with Scopes
 - Generate Token
 - Pagination
 - Request Validation
 - Use Stripe
 - Use Redis

# GETTING STATED WITH APPLICATION

have docker and docker-composed installed

## RUN
  ### this command line starts the container running the data base and the server
 - docker-compose up / docker compose up
  run the above command line first then on the new terminal window run the command line below
  ### this command line allow to run the second command line in the docker container to populate database with data
 - docker-compose exec backend sh
 - npm run seed:ambassadors


## MAINTAINER
  - Tebogo Gabriel Mphela


## Swagger UI/ API DOCS
  - http://localhost:9000/api







