# b8r_home Server

This server built in Node.js with TypeScript.

The project utilizes benefits of strong typings due to TypeScript.

## Requirements

For development, you will only need Node.js and a node global package, `npm`, installed in your environement.

Make sure you've installed and are using Node version 14.19.0 and above.

## Project Structure

```
b8r_home#v1.0.3
├── dist/                               # production distributable files for server. Copy them to production server and follow setup.
├── src/                                # project root
|   ├── config/                         # app configuration files reside here.
|   ├── constants/                      # app constants reside here
|   ├── controllers/                    # app controllers reside here
|   ├── helpers/                        # app helper methods reside here
|   ├── middleware/                     # app route middlewares reside here
|   ├── models/                         # database models reside here
|   ├── public/                         # public files can be found here
|   ├── routes/                         # app routes and route configuration reside here
|   ├── services/                       # integration services reside here
|   ├── templates/                      # dynamic content templates reside here. For example, email templates.
|   ├── app.ts                          # application entry point and Express server configurations.
├── tsconfig.json                       # TypeScript compiler config for the project
├── tslint.json                         # TypeScript compiler lint config for the project
├── .gitignore
├── package-lock.json
└── package.json
```

## Installation
This project is built using TypeScript, Node.js and Express.

### Repository Setup


### Setup Environment
Here is the information you need to setup your environment you wish to run your server in.

For ease of development you can keep `.env.prod` for production environment and `.env.stage` for development/staging environment and replace the main `.env` according to your deployment.

`.env` file must have the following keys.
``` bash

################ ENVIRONMENT KEYS ################

NODE_ENV = "development"
APP_KEY = ''
PORT = 3000
DB_URI = "mongodb://127.0.0.1:27017/b8r_home"
API_PREFIX = '/api/v1'

TIMEZONE = "IN"
SECRET = ''

HOST_URL = 'http://localhost:[$PORT]/'

EMAIL_SERVICE = 'SMTP'
EMAIL_HOST = 'smtp'
EMAIL_PORT = 465
EMAIL_AUTH_USERNAME = ''
EMAIL_AUTH_PASSWORD = ''
EMAIL_FROM = ''

S3_ACCESS_KEY_ID = ""
S3_SECRET_ACCESS_KEY = ""
S3_BUCKET_NAME = ""
S3_BUCKET_URL = ""
S3_BUCKET_REGION = ""

#### Development Environment

Set the `NODE_ENV` as 'development'

During development you can keep your `.env` file in the main `b8r_home-server/`.

Get your Google Service Account keys.json file and place it in the root folder.

#### Production Environment

Set the `NODE_ENV` as 'production'

During production you must keep your `.env` file in the root `/` wherever you\'re deploying the server files.

Get your Google Service Account keys.json file and place it in the root folder alongside package.json.

### Basic Usage

``` bash
# dev server with development environment setup
$ npm start
```

### Deployment

You will have to create a build for the server to get javascript executable files. 

``` bash

# To build a production build for deployment
$ npm run build

Deployment files for the server after the build can be found in the **dist/** directory.

Copy over the build files to your server and set it up with the following **package.json** config and install dependencies. (skip copying over dev-dependencies from your package)

`
    {
        "name": "b8r_home",
        "version": "1.4.0",
        "private": true,
        "author": "Ziance",
        "license": "ISC",
        "main": "app.js",
        "scripts": {
            "start": "node -r dotenv/config ."
        },
        "dependencies": {
            "@firebase/app-compat": "^0.1.16",
            "aws-sdk": "^2.1068.0",
            "cookie-parser": "~1.4.4",
            "cors": "^2.8.5",
            "debug": "~2.6.9",
            "dotenv": "^16.0.0",
            "ejs": "^3.1.6",
            "email-templates": "^8.0.8",
            "express": "~4.16.1",
            "firebase-admin": "^10.0.2",
            "googleapis": "^95.0.0",
            "http-errors": "~1.6.3",
            "isomorphic-fetch": "^3.0.0",
            "moment": "^2.29.1",
            "moment-timezone": "^0.5.34",
            "mongoose": "^6.1.7",
            "morgan": "~1.9.1",
            "multer": "^1.4.4",
            "multer-s3": "^2.10.0",
            "nodemailer": "^6.7.2"
        },
    }

`

$ npm install

# Setup the production environment file **.env** as above and run your project using.

$ npm start 

# or using a daemon process manager like **PM2** to keep your server processes running.
```
