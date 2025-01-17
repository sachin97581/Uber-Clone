# Uber Clone

## Server Setup

For environmental server setup, I am using two packages:
1. `dotenv`
2. `cors`

## User Authentication

For user authentication, I am using:
1. `bcrypt` - for hashing passwords and comparing passwords
2. `jsonwebtoken` - for creating tokens

## Project Structure


## Examples

### Register User

**Endpoint:** `POST /users/register`

**Request Body:**
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}

## Response:

{
    "token": "jwt_token_here",
    "user": {
        "_id": "user_id_here",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "hashed_password_here",
        "socketID": null
    }
}



###Login User
##Endpoint: POST /users/login

#Request Body:

{
    "email": "john.doe@example.com",
    "password": "password123"
}

##Response:

{
    "token": "jwt_token_here",
    "user": {
        "_id": "user_id_here",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "hashed_password_here",
        "socketID": null
    }
}

###Get User Profile
##Endpoint: GET /users/profile

#Headers:

Authorization: Bearer jwt_token_here

#Response:

{
    "user": {
        "_id": "user_id_here",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "hashed_password_here",
        "socketID": null
    }
}

###Logout User
##Endpoint: GET /users/logout

#Headers:

Authorization: Bearer jwt_token_here

#Response:

{
    "message": "User logged out successfully"
}









