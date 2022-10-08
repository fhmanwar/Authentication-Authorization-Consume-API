# Authentication-Authorization-Consume-API

- [`Usage`](#usage)
- [`End Point`](#end-point)

## Usage
clone this project
```git
git clone https://github.com/fhmanwar/Authentication-Authorization-Consume-API.git
cd Authentication-Authorization-Consume-API
```

install package and running project
```node
 npm i
 npm run dev
```

## End Point
- `POST` SignUp : `http://{host:port}/api/auth/signup`
  ```json
      {
        "username": "{Your UserName}",
        "password": "{Your Password}"
      }
  ```
- `POST` SignIn : `http://{host:port}/api/auth/signin`
  ```json
      {
        "username": "{Your UserName}",
        "password": "{Your Password}"
      }
  ```
- `POST` Jobs All : `http://{host:port}/api/jobs`
  Request Body
  ```json
      {
        "desc": "{Description Search}",
        "loc": "{Location Search}",
        "page": "1"
      }
  ```
  
  Add to header or Api Key
  ```bulk
  Key: x-acceess-token
  Value: {Access Token After Signin}
  ```

- `GET` Jobs ID : `http://{host:port}/api/jobs/{id}`
  Add to header or Api Key
  ```bulk
  Key: x-acceess-token
  Value: {Access Token After Signin}
  ```
