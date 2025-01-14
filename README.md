# Auth Error Handling

Registration success
```
{
    user: userid,
    verified: boolean
}
```
Registration failed
```
{
    "errors": {
        "email": "email-msg",
        "password": "pwd-msg",
        "credentials": ""
    }
}
```
Login success
```
{
    user: userid,
    verified: boolean
}
```
Login Failed
```
{
    errors: {
        "email": "",
        "password": ""
        "credentials": "Invalid email or password"
    }
}
``` 
Auth Failed
```
{
    unauthorized: "Unauthorized"
}
```
Email Verification Success
```
{
    verified: true, 
    message: "User verified"
}
```
Email Verification Error 
```
{
    verified: false, 
    message: "User already verified"
}
```

Features: 

- Routing & Controllers for API structure
- Sign up & Log in
- Mongoose validation
- Email validation with validator
- Hashing password using bcryptjs and mongoose middlewares
- JWT Authentication with cookies
- email verification system with nodemailer and JWT
- server side & client side route protecting