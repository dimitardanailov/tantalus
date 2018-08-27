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

### S3 configurations

 - `TANTALUS_S3_ACCESS_KEY_ID`
 - `TANTALUS_S3_SECRET_ACCESS_KEY`
 - `TANTALUS_S3_BUCKET`

 ## Resources / Ideas

- [TypeScript: Declaring Mongoose Schema + Model](https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/)
- [routing-controllers-express-demo](https://github.com/pleerock/routing-controllers-express-demo)
- [routing-controllers](https://github.com/typestack/routing-controllers)
- [TypeScript 2 + Express + Mongoose + Mocha + Chai](https://brianflove.com/2016/11/11/typescript-2-express-mongoose-mocha-chai/)
- [How to specify test directory for mocha?](https://stackoverflow.com/questions/10753288/how-to-specify-test-directory-for-mocha)
- [Configuring the SDK in Node.js](http://docs.amazonaws.cn/en_us/AWSJavaScriptSDK/guide/node-configuring.html)
- [Support for Promises in the SDK](https://aws.amazon.com/blogs/developer/support-for-promises-in-the-sdk/)
- [Pipe a stream to s3.upload()](https://stackoverflow.com/questions/37336050/pipe-a-stream-to-s3-upload/37366093#37366093)
