Developer: Tebogo Gabriel Mphela
v:0.0.1

### This is a Nestjs application. Soon front-end part will be added.

So far user can create account login, retrieve infor and loggout.
If user loggout they must loggin first to access sensitive information.

This application uses Docker and docker-compose 
 
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

### GETTING STATED WITH APPLICATION

have docker and docker-composed installed

 # install typeorm and mysql2
  - npm install --save @nestjs/typeorm typeorm mysql2
 # validate post request
  - npm install class-validator --save
  - npm install class-transformer
 # password encryption
  - npm i bcryptjs @types/bcryptjs
 # create token
  - npm install --save @nestjs/jwt passport-jwt
  - npm install --save-dev @types/passport-jwt
 # cookie-parser
  - npm i cookie-parser

 # run-time reflection on types
  - npm install reflect-metadata --save

# RUN
 - docker-compose up / docker compose up








