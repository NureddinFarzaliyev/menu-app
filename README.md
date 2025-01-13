Registration success
```
{
    user: userid
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
    user: userid
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


Features: 

- Routing & Controllers for API structure
- Sign up & Log in
- Mongoose validation
- Email validation with validator
- Hashing password using bcryptjs and mongoose middlewares
- JWT Authentication with cookies


