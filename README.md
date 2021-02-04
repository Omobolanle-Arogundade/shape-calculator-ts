# asb-coding-assignment

# SHAPE AREA CALCULATOR API

## Indices

- [Auth](#auth)

  - [Login API](#1-login-api)

- [Shapes](#shapes)

  - [Area Calculator API](#1-area-calculator-api)
  - [Fetch Calculations API](#2-fetch-calculations-api)

- [Users](#users)

  - [Create User API](#1-create-user-api)
  - [Delete User API](#2-delete-user-api)
  - [Fetch Users API](#3-fetch-users-api)
  - [Get User by Id](#4-get-user-by-id)
  - [Update User API](#5-update-user-api)

---

## Auth

Authentication API

### 1. Login API

This API allows you to obtain a short-lived access tokens which you can use to authenticate requests to other services. Access Tokens expire after 30 minutes while Refresh Token expires after 30 days.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: https://abs-shape-calculator.herokuapp.com/auth/login
```

**_Body:_**

```js
{
    "email": "admin@mail.com",
    "password": "12345678"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: /auth/login - Success Response

**_Body:_**

```js
{
    "email": "email@example.com",
    "password": "password"
}
```

##### I. Example Response: /auth/login - Success Response

```js
{
    "user": {
        "id": 16,
        "name": "Admin",
        "email": "admin@mail.com",
        "created_at": "2021-02-03T19:16:34.727Z",
        "updated_at": "2021-02-03T19:16:34.727Z",
        "deleted_at": null
    },
    "tokens": {
        "access": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNjEyMzgxMTU0MjYzLCJleHAiOjE2MTIzODI5NTQyNDh9.fyFVlmqK3_JxJU3vtcrHHbE24cpVZpvFEgPktX3zefQ",
            "expires": "2021-02-03T20:09:14.248Z"
        },
        "refresh": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNjEyMzgxMTU0Mjc3LCJleHAiOjE2MTQ5NzMxNTQyNjJ9.rOHbTouEKLv5VyawPc8ukqx6da__6o_72ZdEUL5jFtI",
            "expires": "2021-03-05T19:39:14.262Z"
        }
    }
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: /auth/login - Unauthorized Error

**_Body:_**

```js
{
    "email": "email@example.com",
    "password": "password"
}
```

##### II. Example Response: /auth/login - Unauthorized Error

```js
{
    "message": "User credentials is incorrect!",
    "error": true
}
```

**_Status Code:_** 401

<br>

##### III. Example Request: /auth/login - Bad Request Error

**_Body:_**

```js
{
    "email": "admin@mail.com"
}
```

##### III. Example Response: /auth/login - Bad Request Error

```js
{
    "message": "Password is a required field",
    "error": true
}
```

**_Status Code:_** 400

<br>

## Shapes

Shapes API

### 1. Area Calculator API

This API accepts a shape type and the dimensions required to calculate the area of the shape, store the result and returns the area of the shape.

**_Endpoint:_**

```bash
Method: GET
Type: RAW
URL: https://abs-shape-calculator.herokuapp.com/shapes
```

**_Body:_**

```js
{
    "shape": "TRIANGLE",
    "dimensions": {
        "length_a": 4,
        "length_b": 3,
        "length_c": 3
    }
}
```

**_More example Requests/Responses:_**

##### I. Example Request: SQUARE Example

**_Body:_**

```js
{
    "shape": "SQUARE",
    "dimensions": {
        "side": 4
    }
}
```

##### I. Example Response: SQUARE Example

```js
{
    "message": "Calculation created successfully!",
    "data": {
        "id": 9,
        "shape": "SQUARE",
        "area": 16,
        "uid": 23,
        "updated_at": "2021-02-03T23:43:09.631Z",
        "created_at": "2021-02-03T23:43:09.631Z"
    },
    "error": false
}
```

**_Status Code:_** 201

<br>

##### II. Example Request: RECTANGLE example

**_Body:_**

```js
{
    "shape": "RECTANGLE",
    "dimensions": {
        "length": 4,
        "breadth": 5
    }
}
```

##### II. Example Response: RECTANGLE example

```js
{
    "message": "Calculation created successfully!",
    "data": {
        "id": 3,
        "shape": "RECTANGLE",
        "area": 20,
        "uid": 23,
        "updated_at": "2021-02-03T23:35:03.175Z",
        "created_at": "2021-02-03T23:35:03.175Z"
    },
    "error": false
}
```

**_Status Code:_** 201

<br>

##### III. Example Request: CIRCLE Example

**_Body:_**

```js
{
    "shape": "CIRCLE",
    "dimensions": {
        "radius": 4
    }
}
```

##### III. Example Response: CIRCLE Example

```js
{
    "message": "Calculation created successfully!",
    "data": {
        "id": 15,
        "shape": "CIRCLE",
        "area": 50.2654824574367,
        "uid": 23,
        "updated_at": "2021-02-03T23:48:22.485Z",
        "created_at": "2021-02-03T23:48:22.485Z"
    },
    "error": false
}
```

**_Status Code:_** 201

<br>

##### IV. Example Request: TRIANGLE Example

**_Body:_**

```js
{
    "shape": "TRIANGLE",
    "dimensions": {
        "length_a": 4,
        "length_b": 3,
        "length_c": 3
    }
}
```

##### IV. Example Response: TRIANGLE Example

```js
{
    "message": "Calculation created successfully!",
    "data": {
        "id": 16,
        "shape": "TRIANGLE",
        "area": 4.47213595499958,
        "uid": 23,
        "updated_at": "2021-02-03T23:49:25.331Z",
        "created_at": "2021-02-03T23:49:25.331Z"
    },
    "error": false
}
```

**_Status Code:_** 201

<br>

##### V. Example Request: Validation Error Response

**_Body:_**

```js
{
    "shape": "TRIANGLE",
    "dimensions": {
        "length_a": 4,
        "length_b": 3,
        "length_c": 3,
        "side": 3
    }
}
```

##### V. Example Response: Validation Error Response

```js
{
    "message": "\"side\" is not allowed",
    "error": true
}
```

**_Status Code:_** 400

<br>

### 2. Fetch Calculations API

Fetch all previous calculations submitted by a logged in user.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: https://abs-shape-calculator.herokuapp.com/shapes
```

**_More example Requests/Responses:_**

##### I. Example Request: Calculations Response

##### I. Example Response: Calculations Response

```js
{
    "count": 18,
    "rows": [
        {
            "id": 1,
            "area": 20,
            "shape": "RECTANGLE",
            "uid": 23,
            "created_at": "2021-02-03T23:22:49.361Z",
            "updated_at": "2021-02-03T23:22:49.361Z",
            "deleted_at": null
        },
        {
            "id": 2,
            "area": 20,
            "shape": "RECTANGLE",
            "uid": 23,
            "created_at": "2021-02-03T23:29:33.856Z",
            "updated_at": "2021-02-03T23:29:33.856Z",
            "deleted_at": null
        },
        {
            "id": 3,
            "area": 20,
            "shape": "RECTANGLE",
            "uid": 23,
            "created_at": "2021-02-03T23:35:03.175Z",
            "updated_at": "2021-02-03T23:35:03.175Z",
            "deleted_at": null
        },
        {
            "id": 4,
            "area": 16,
            "shape": "SQUARE",
            "uid": 23,
            "created_at": "2021-02-03T23:35:59.807Z",
            "updated_at": "2021-02-03T23:35:59.807Z",
            "deleted_at": null
        },
        {
            "id": 5,
            "area": 16,
            "shape": "SQUARE",
            "uid": 23,
            "created_at": "2021-02-03T23:39:03.102Z",
            "updated_at": "2021-02-03T23:39:03.102Z",
            "deleted_at": null
        },
        {
            "id": 6,
            "area": 19.12,
            "shape": "SQUARE",
            "uid": 23,
            "created_at": "2021-02-03T23:39:12.770Z",
            "updated_at": "2021-02-03T23:39:12.770Z",
            "deleted_at": null
        },
        {
            "id": 7,
            "area": 19.13,
            "shape": "SQUARE",
            "uid": 23,
            "created_at": "2021-02-03T23:39:16.724Z",
            "updated_at": "2021-02-03T23:39:16.724Z",
            "deleted_at": null
        },
        {
            "id": 8,
            "area": 19.2180428874158,
            "shape": "SQUARE",
            "uid": 23,
            "created_at": "2021-02-03T23:42:55.382Z",
            "updated_at": "2021-02-03T23:42:55.382Z",
            "deleted_at": null
        },
        {
            "id": 9,
            "area": 16,
            "shape": "SQUARE",
            "uid": 23,
            "created_at": "2021-02-03T23:43:09.631Z",
            "updated_at": "2021-02-03T23:43:09.631Z",
            "deleted_at": null
        },
        {
            "id": 10,
            "area": 50.2654824574367,
            "shape": "CIRCLE",
            "uid": 23,
            "created_at": "2021-02-03T23:43:52.564Z",
            "updated_at": "2021-02-03T23:43:52.564Z",
            "deleted_at": null
        },
        {
            "id": 11,
            "area": 50.2654824574367,
            "shape": "CIRCLE",
            "uid": 23,
            "created_at": "2021-02-03T23:44:05.693Z",
            "updated_at": "2021-02-03T23:44:05.693Z",
            "deleted_at": null
        },
        {
            "id": 12,
            "area": 50.2654824574367,
            "shape": "CIRCLE",
            "uid": 23,
            "created_at": "2021-02-03T23:44:09.772Z",
            "updated_at": "2021-02-03T23:44:09.772Z",
            "deleted_at": null
        },
        {
            "id": 13,
            "area": 50.27,
            "shape": "CIRCLE",
            "uid": 23,
            "created_at": "2021-02-03T23:44:05.361Z",
            "updated_at": "2021-02-03T23:44:05.361Z",
            "deleted_at": null
        },
        {
            "id": 14,
            "area": 50.27,
            "shape": "CIRCLE",
            "uid": 23,
            "created_at": "2021-02-03T23:44:42.414Z",
            "updated_at": "2021-02-03T23:44:42.414Z",
            "deleted_at": null
        },
        {
            "id": 15,
            "area": 50.2654824574367,
            "shape": "CIRCLE",
            "uid": 23,
            "created_at": "2021-02-03T23:48:22.485Z",
            "updated_at": "2021-02-03T23:48:22.485Z",
            "deleted_at": null
        }
    ],
    "items_per_page": 15,
    "current_page": 1,
    "total_pages": 2
}
```

**_Status Code:_** 200

<br>

## Users

Users APIs

### 1. Create User API

An api that lets an authenticated user create a new user

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: https://abs-shape-calculator.herokuapp.com/users
```

**_Body:_**

```js
{
    "email": "email@example.com",
    "password": "password",
    "name": "User"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create User Response

**_Body:_**

```js
{
    "email": "email@example.com",
    "password": "password",
    "name": "User"
}
```

##### I. Example Response: Create User Response

```js
{
    "message": "User created successfully!",
    "data": {
        "id": 24,
        "email": "email@example.com",
        "password": "$2a$10$NTpvgiHaUfZdlEZ6mzLeWuNGgXnhIVf6PIZJ8h7Q3zop.a3guqKxO",
        "name": "User",
        "updated_at": "2021-02-04T00:01:38.248Z",
        "created_at": "2021-02-04T00:01:38.248Z"
    },
    "error": false
}
```

**_Status Code:_** 201

<br>

### 2. Delete User API

Delete a particular user.

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: https://abs-shape-calculator.herokuapp.com/users/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "name": "New Name"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Update User Response

**_Body:_**

```js
{
    "name": "New Name"
}
```

##### I. Example Response: Update User Response

```js
{
    "message": "User updated successfully!",
    "data": {
        "id": 24,
        "email": "email@example.com",
        "name": "New Name",
        "password": "$2a$10$NTpvgiHaUfZdlEZ6mzLeWuNGgXnhIVf6PIZJ8h7Q3zop.a3guqKxO",
        "created_at": "2021-02-04T00:01:38.248Z",
        "updated_at": "2021-02-04T00:05:12.234Z"
    },
    "error": false
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: Delete User Response

**_Body:_**

```js
{
    "name": "New Name"
}
```

##### II. Example Response: Delete User Response

```js
{
    "message": "User deleted successfully!",
    "error": false
}
```

**_Status Code:_** 200

<br>

##### III. Example Request: Get User by Id Response

##### III. Example Response: Get User by Id Response

```js
{
    "id": 24,
    "name": "User",
    "email": "email@example.com",
    "created_at": "2021-02-04T00:01:38.248Z",
    "updated_at": "2021-02-04T00:01:38.248Z",
    "deleted_at": null
}
```

**_Status Code:_** 200

<br>

### 3. Fetch Users API

Allows an authenticated user to fetch all other registered users

**_Endpoint:_**

```bash
Method: GET
Type:
URL: https://abs-shape-calculator.herokuapp.com/users
```

**_More example Requests/Responses:_**

##### I. Example Request: Users Response

**_Query:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| limit | 5     |             |
| page  | 1     |             |

##### I. Example Response: Users Response

```js
{
    "count": 1,
    "rows": [
        {
            "id": 23,
            "name": "Admin",
            "email": "admin@mail.com",
            "created_at": "2021-02-03T23:08:28.778Z",
            "updated_at": "2021-02-03T23:08:28.778Z",
            "deleted_at": null
        }
    ],
    "items_per_page": 5,
    "current_page": 1,
    "total_pages": 1
}
```

**_Status Code:_** 200

<br>

### 4. Get User by Id

Fetch a particular user by the user id.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: https://abs-shape-calculator.herokuapp.com/users/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Get User by Id Response

##### I. Example Response: Get User by Id Response

```js
{
    "id": 24,
    "name": "User",
    "email": "email@example.com",
    "created_at": "2021-02-04T00:01:38.248Z",
    "updated_at": "2021-02-04T00:01:38.248Z",
    "deleted_at": null
}
```

**_Status Code:_** 200

<br>

### 5. Update User API

Update a particular user.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: https://abs-shape-calculator.herokuapp.com/users/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "name": "New Name"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Get User by Id Response

##### I. Example Response: Get User by Id Response

```js
{
    "id": 24,
    "name": "User",
    "email": "email@example.com",
    "created_at": "2021-02-04T00:01:38.248Z",
    "updated_at": "2021-02-04T00:01:38.248Z",
    "deleted_at": null
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: Update User Response

**_Body:_**

```js
{
    "name": "New Name"
}
```

##### II. Example Response: Update User Response

```js
{
    "message": "User updated successfully!",
    "data": {
        "id": 24,
        "email": "email@example.com",
        "name": "New Name",
        "password": "$2a$10$NTpvgiHaUfZdlEZ6mzLeWuNGgXnhIVf6PIZJ8h7Q3zop.a3guqKxO",
        "created_at": "2021-02-04T00:01:38.248Z",
        "updated_at": "2021-02-04T00:05:12.234Z"
    },
    "error": false
}
```

**_Status Code:_** 200

<br>

---

[Back to top](#shape-area-calculator-api)
