# Tantalus

Tantalus must "speak" with MongoDB and export Developer query to JSON or CSV

Application is using nodeserver: https://github.com/ibm-developer/generator-nodeserver

## Run locally as Node.js application

```bash
npm install
npm test
npm start
```

## Build, run, and deploy using IDT

```bash
# Install needed dependencies:
npm run idt:install
# Build the docker image for your app:
npm run idt:build
# Run the app locally through docker:
npm run idt:run
# Deploy your app to IBM Cloud:
npm run idt:deploy
```

## Credentials

Application should have follow `process.env`: 

### Database configurations

 - `TANTALUS_DATABASE_SERVER`
 - `TANTALUS_DATABASE`
 - `TANTALUS_TESTING_DATABASE_SERVER`
 - `TANTALUS_TESTING_DATABASE`

### S3 configurations

 - `TANTALUS_S3_ACCESS_KEY_ID`
 - `TANTALUS_S3_SECRET_ACCESS_KEY`
 - `TANTALUS_S3_BUCKET`
 - `TANTALUS_AMAZON_REGION`

### File system Configurations

 - `TANTALUS_TEMP_DIR`

### AUTH Service

Sashido is responsible to provide these variables.

Each application has a proto Buffer for authentication.

 - `TANTALUS_AUTH_SERVICE_TOKEN_REST_API`
 - `TANTALUS_AUTH_SERVICE_DATABASE_URI_REST_API`
 - `TANTALUS_AUTH_MASTER_KEY_REQUEST_SERVICE_ID`

### Sashido Testing and Development Variables

You can access these variables on `Sashido` -> `App Settings` -> `Security & Keys`

 - `TANTALUS_SASHIDO_APP_ID`
 - `TANTALUS_SASHIDO_MASTER_KEY`

### Agenda

 - `TANTALUS_AGENDA_DB_STRING`

## Resources / Ideas

#### Mongoose
- [TypeScript: Declaring Mongoose Schema + Model](https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/)


#### Routing Controllers

- [routing-controllers-express-demo](https://github.com/pleerock/routing-controllers-express-demo)
- [routing-controllers](https://github.com/typestack/routing-controllers)

#### AWS

- [Configuring the SDK in Node.js](http://docs.amazonaws.cn/en_us/AWSJavaScriptSDK/guide/node-configuring.html)
- [Support for Promises in the SDK](https://aws.amazon.com/blogs/developer/support-for-promises-in-the-sdk/)
- [Pipe a stream to s3.upload()](https://stackoverflow.com/questions/37336050/pipe-a-stream-to-s3-upload/37366093#37366093)

#### TUS

- [TUS: Server](https://github.com/tus/tus-node-server)
- [TUS: JS Client](https://github.com/tus/tus-js-client)
- [TUS: JS Client and Nodejs Example](https://github.com/tus/tus-js-client/blob/master/demo/node.js)

#### Mocha

- [TypeScript 2 + Express + Mongoose + Mocha + Chai](https://brianflove.com/2016/11/11/typescript-2-express-mongoose-mocha-chai/)
- [How to specify test directory for mocha?](https://stackoverflow.com/questions/10753288/how-to-specify-test-directory-for-mocha)
- [Mocha glob pattern](https://remarkablemark.org/blog/2017/02/07/mocha-glob-pattern/)
- [const {NODE_PORT, NODE_ENV} = process.env](https://medium.com/@maxcbc/mocking-environment-variables-in-node-js-a17a416e127c)
- [How to Test Promises with Mocha](https://wietse.loves.engineering/testing-promises-with-mocha-90df8b7d2e35)


