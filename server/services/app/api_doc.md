# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

- `GET /jobs`
- `GET /jobs/:id`
- `POST /jobs`
- `PATCH /jobs/:id`
- `DELETE /jobs/:id`

- `GET /companies`
- `POST /companies`
- `PATCH /companies/:id`
- `DELETE /companies/:id`

&nbsp;

## 1. POST /register

Description:

- Create new user. Can be used to register both admin and user, client need to define role property

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "role": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Account created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username can not be empty"
}
OR
{
  "message": "Username already exist"
}
OR
{
    "message": "Password can not be empty"
}
OR
{
    "message": "Password length must be at least 5 characters"
}
OR
{
    "message": "Email can not be empty"
}
OR
{
    "message": "Email format is not recognized"
}
```

&nbsp;

## 2. POST /login

Description:

- Validate user existence and credentials. Return access token

Request:

- body:

```json
{
  "username": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Wrong email or password"
}
```

&nbsp;

## 3. GET /jobs

Description:

- Get all jobs data

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "filter": "string"
}
```

_Response (200 - OK)_

```json
  [
    {
        "id": 1,
        "title": "Backend Developer",
        "companyId": 1,
        "minimumSalary": "8.000.000",
        "maximumSalary": "11.000.000",
        "minimumExperience": 1,
        "maximumExperience": 3,
        "postDate": "2023-03-19T00:00:00.000Z",
        "category": "Technology",
        "authorId": 1,
        "jobType": "Full Time",
        "description": "Design and develop backend systems to support our web applications. Write clean and efficient code that meets the project requirements. Collaborate with cross-functional teams to design and implement new features. Optimize backend code for scalability and performance. Maintain and improve existing systems and applications. Write and maintain technical documentation. The ideal candidate should have a Bachelor's degree in Computer Science or a related field and at least [Insert number] years of experience in backend development. They should have strong proficiency in programming languages such as Python, Java, or Ruby and experience working with databases such as MySQL, PostgreSQL, or MongoDB. Familiarity with web frameworks such as Django, Flask, or Ruby on Rails, as well as knowledge of cloud computing services such as AWS or Google Cloud Platform is a plus. The candidate should possess excellent problem-solving and analytical skills, strong communication and teamwork skills. Experience with containerization technologies such as Docker or Kubernetes, familiarity with DevOps practices and tools such as Ansible, Terraform, or Jenkins, and knowledge of message brokers such as RabbitMQ or Apache Kafka are also preferred.",
        "createdAt": "2023-03-19T09:08:43.891Z",
        "updatedAt": "2023-03-19T09:08:43.891Z",
        "User": {
            "id": 1,
            "username": "admin1",
            "email": "admin@mail.com",
            "role": null,
            "address": "Jakarta",
            "createdAt": "2023-03-19T09:08:43.814Z",
            "updatedAt": "2023-03-19T09:08:43.814Z"
        },
        "Company": {
            "id": 1,
            "name": "Goceng",
            "companyLogo": "https://1.bp.blogspot.com/-DCZPTZhbuOw/YIJtfI43UlI/AAAAAAAACj0/Ky5ZU0Kb7woucb0cgHMkn6MVpXZmgogeACNcBGAsYHQ/s2048/Gojek.png",
            "location": "Bandung",
            "email": "goceng@mail.com",
            "description": "Goceng is a leading provider of online taxi, food delivery, and package delivery services, serving millions of customers across the globe. Our platform connects riders with drivers in real-time, making it easy and convenient to get where you need to go. Our food delivery service allows customers to order food from their favorite local restaurants and have it delivered right to their doorstep. And our package delivery service provides fast and reliable shipping for businesses and individuals alike. We pride ourselves on providing high-quality services that are affordable, convenient, and safe. Our mission is to make transportation and delivery services accessible to everyone, no matter where they are in the world.",
            "createdAt": "2023-03-19T09:08:43.882Z",
            "updatedAt": "2023-03-19T09:08:43.882Z"
        },
        "Skills": [
            {
                "id": 1,
                "jobId": 1,
                "name": "Javascript",
                "level": "Beginner",
                "createdAt": "2023-03-19T09:08:43.900Z",
                "updatedAt": "2023-03-19T09:08:43.900Z"
            },
            {
                "id": 8,
                "jobId": 1,
                "name": "MongoDB",
                "level": "Intermediate",
                "createdAt": "2023-03-19T09:08:43.900Z",
                "updatedAt": "2023-03-19T09:08:43.900Z"
            }
        ],
        "updatedDate": "19 Maret 2023"
    },
    ...
  ]
```

&nbsp;

## 4. GET /jobs/:id

Description:

- Get job data based on job ID

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "Backend Developer",
  "companyId": 1,
  "minimumSalary": "8.000.000",
  "maximumSalary": "11.000.000",
  "minimumExperience": 1,
  "maximumExperience": 3,
  "postDate": "2023-03-19T00:00:00.000Z",
  "category": "Technology",
  "authorId": 1,
  "jobType": "Full Time",
  "description": "Design and develop backend systems to support our web applications. Write clean and efficient code that meets the project requirements. Collaborate with cross-functional teams to design and implement new features. Optimize backend code for scalability and performance. Maintain and improve existing systems and applications. Write and maintain technical documentation. The ideal candidate should have a Bachelor's degree in Computer Science or a related field and at least [Insert number] years of experience in backend development. They should have strong proficiency in programming languages such as Python, Java, or Ruby and experience working with databases such as MySQL, PostgreSQL, or MongoDB. Familiarity with web frameworks such as Django, Flask, or Ruby on Rails, as well as knowledge of cloud computing services such as AWS or Google Cloud Platform is a plus. The candidate should possess excellent problem-solving and analytical skills, strong communication and teamwork skills. Experience with containerization technologies such as Docker or Kubernetes, familiarity with DevOps practices and tools such as Ansible, Terraform, or Jenkins, and knowledge of message brokers such as RabbitMQ or Apache Kafka are also preferred.",
  "createdAt": "2023-03-19T09:08:43.891Z",
  "updatedAt": "2023-03-19T09:08:43.891Z",
  "User": {
    "id": 1,
    "username": "admin1",
    "email": "admin@mail.com",
    "role": null,
    "address": "Jakarta",
    "createdAt": "2023-03-19T09:08:43.814Z",
    "updatedAt": "2023-03-19T09:08:43.814Z"
  },
  "Company": {
    "id": 1,
    "name": "Goceng",
    "companyLogo": "https://1.bp.blogspot.com/-DCZPTZhbuOw/YIJtfI43UlI/AAAAAAAACj0/Ky5ZU0Kb7woucb0cgHMkn6MVpXZmgogeACNcBGAsYHQ/s2048/Gojek.png",
    "location": "Bandung",
    "email": "goceng@mail.com",
    "description": "Goceng is a leading provider of online taxi, food delivery, and package delivery services, serving millions of customers across the globe. Our platform connects riders with drivers in real-time, making it easy and convenient to get where you need to go. Our food delivery service allows customers to order food from their favorite local restaurants and have it delivered right to their doorstep. And our package delivery service provides fast and reliable shipping for businesses and individuals alike. We pride ourselves on providing high-quality services that are affordable, convenient, and safe. Our mission is to make transportation and delivery services accessible to everyone, no matter where they are in the world.",
    "createdAt": "2023-03-19T09:08:43.882Z",
    "updatedAt": "2023-03-19T09:08:43.882Z"
  },
  "Skills": [
    {
      "id": 1,
      "jobId": 1,
      "name": "Javascript",
      "level": "Beginner",
      "createdAt": "2023-03-19T09:08:43.900Z",
      "updatedAt": "2023-03-19T09:08:43.900Z"
    },
    {
      "id": 8,
      "jobId": 1,
      "name": "MongoDB",
      "level": "Intermediate",
      "createdAt": "2023-03-19T09:08:43.900Z",
      "updatedAt": "2023-03-19T09:08:43.900Z"
    }
  ],
  "updatedDate": "19 Maret 2023"
}
```

&nbsp;

## 5. POST /jobs

Description:

- Create new job data

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
      "title": "string",
      "companyId": "integer",
      "minimumSalary": "integer",
      "maximumSalary": "integer",
      "minimumExperience": "integer",
      "maximumExperience": "integer",
      "postDate": "string",
      "category": "string",
      "authorId": "integer",
      "jobType": "string",
      "description": "text",
      "skills": [
        {
            "name": "string",
            "level": "string"
        },
        {
            "name": "string",
            "level": "string"
        },
        ...,
      ]
}
```

_Response (201 - Created)_

```json
{
  "message": "job title" + " has been added to system"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Minimum salary is required"
}
OR
{
  "message": "Minimum experience is required"
}
OR
{
  "message": "Maximum salary is required"
}
OR
{
  "message": "Maximum salary is required"
}
OR
{
  "message": "Category is required"
}
OR
{
  "message": "Job type is required"
}
OR
{
  "message": "Description is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 6. PATCH /jobs/:id

Description:

- Patch/update job data based on id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (201 - Created)_

```json
{ "message": "job title" + " has been edited" }
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Minimum salary is required"
}
OR
{
  "message": "Minimum experience is required"
}
OR
{
  "message": "Maximum salary is required"
}
OR
{
  "message": "Maximum salary is required"
}
OR
{
  "message": "Category is required"
}
OR
{
  "message": "Job type is required"
}
OR
{
  "message": "Description is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 7. DELETE /jobs/:id

Description:

- Delete job data based on id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{ "message": "job title" + " has been deleted " }
```

&nbsp;

## 8. GET /companies

Description:

- Get all companies data

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
  [
    {
        "id": 1,
        "name": "Goceng",
        "companyLogo": "https://1.bp.blogspot.com/-DCZPTZhbuOw/YIJtfI43UlI/AAAAAAAACj0/Ky5ZU0Kb7woucb0cgHMkn6MVpXZmgogeACNcBGAsYHQ/s2048/Gojek.png",
        "location": "Bandung",
        "email": "goceng@mail.com",
        "description": "Goceng is a leading provider of online taxi, food delivery, and package delivery services, serving millions of customers across the globe. Our platform connects riders with drivers in real-time, making it easy and convenient to get where you need to go. Our food delivery service allows customers to order food from their favorite local restaurants and have it delivered right to their doorstep. And our package delivery service provides fast and reliable shipping for businesses and individuals alike. We pride ourselves on providing high-quality services that are affordable, convenient, and safe. Our mission is to make transportation and delivery services accessible to everyone, no matter where they are in the world.",
        "createdAt": "2023-03-19T09:08:43.882Z",
        "updatedAt": "2023-03-19T09:08:43.882Z",
        "Jobs": [
            {
                "id": 1,
                "title": "Backend Developer",
                "companyId": 1,
                "minimumSalary": 8000000,
                "maximumSalary": 11000000,
                "minimumExperience": 1,
                "maximumExperience": 3,
                "postDate": "2023-03-19T00:00:00.000Z",
                "category": "Technology",
                "authorId": 1,
                "jobType": "Full Time",
                "description": "Design and develop backend systems to support our web applications. Write clean and efficient code that meets the project requirements. Collaborate with cross-functional teams to design and implement new features. Optimize backend code for scalability and performance. Maintain and improve existing systems and applications. Write and maintain technical documentation. The ideal candidate should have a Bachelor's degree in Computer Science or a related field and at least [Insert number] years of experience in backend development. They should have strong proficiency in programming languages such as Python, Java, or Ruby and experience working with databases such as MySQL, PostgreSQL, or MongoDB. Familiarity with web frameworks such as Django, Flask, or Ruby on Rails, as well as knowledge of cloud computing services such as AWS or Google Cloud Platform is a plus. The candidate should possess excellent problem-solving and analytical skills, strong communication and teamwork skills. Experience with containerization technologies such as Docker or Kubernetes, familiarity with DevOps practices and tools such as Ansible, Terraform, or Jenkins, and knowledge of message brokers such as RabbitMQ or Apache Kafka are also preferred.",
                "createdAt": "2023-03-19T09:08:43.891Z",
                "updatedAt": "2023-03-19T09:08:43.891Z"
            },
            ...,
        ]
    },
    ...,
  ]
```

&nbsp;

## 9. POST /companies

Description:

- Create new company data

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "companyLogo": "string",
  "location": "string",
  "email": "string",
  "description": "string"
}
```

_Response (201 - Created)_

```json
{ "message": "Company <name> has been created" }
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Company logo required"
}
OR
{
  "message": "Company location required"
}
OR
{
  "message": "Company email is required"
}
OR
{
  "message": "Description is required"
}
```

## 10. PATCH /companies/:id

Description:

- Edit company data based on ID

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "string",
  "companyLogo": "string",
  "location": "string",
  "email": "string",
  "description": "string"
}
```

_Response (201 - Created)_

```json
{ "message": "Company <name> has been edited" }
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Company logo required"
}
OR
{
  "message": "Company location required"
}
OR
{
  "message": "Company email is required"
}
OR
{
  "message": "Description is required"
}
```

&nbsp;

## 11. DELETE /companies/:id

Description:

- Delete company data based on id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{ "message": "company <name>" + " has been deleted " }
```


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Resource not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
