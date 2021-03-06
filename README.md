# Tantalus

Tantalus must "speak" with MongoDB and export Developer query to JSON or CSV

Application is using nodeserver: https://github.com/ibm-developer/generator-nodeserver

## Run locally as Node.js application

```bash
npm install
npm test
npm start
```

## Cloudstrap

### Configurations

Please use these congirations to encrypt or decrypt file: 

```
cloudstrap-microservice-tool encrypt --file=openshift/env/dev/service.env
cloudstrap-microservice-tool decrypt --file=openshift/env/dev/service.env.enc
```

## Credentials

Application should have follow `process.env`: 

### Database configurations

 - `TANTALUS_CONNECTION_STRING` or `CONNECTION_STRING`

### S3 configurations

 - `TANTALUS_S3_ACCESS_KEY_ID` or `S3_ACCESS_KEY_ID`
 - `TANTALUS_S3_SECRET_ACCESS_KEY`or `S3_SECRET_ACCESS_KEY`
 - `TANTALUS_S3_BUCKET` or `S3_BUCKET`
 - `TANTALUS_AMAZON_REGION` or `AMAZON_REGION`

### File system Configurations

 - `TANTALUS_TEMP_DIR` or `TEMP_DIR`

### AUTH Service

Cloud provider is responsible to provide these variables.

Each application has a proto Buffer for authentication.

 - `TANTALUS_AUTH_SERVICE_TOKEN_REST_API` or `AUTH_SERVICE_TOKEN_REST_API`
 - `TANTALUS_AUTH_SERVICE_DATABASE_URI_REST_API` or `AUTH_SERVICE_DATABASE_URI_REST_API`
 - `TANTALUS_AUTH_MASTER_KEY_REQUEST_SERVICE_ID` or `AUTH_MASTER_KEY_REQUEST_SERVICE_ID`
 - `TANTALUS_AUTH_APP_ID` or `AUTH_APP_ID`

### Cloud provider Testing and Development Variables

You can access these variables on `Cloud Provider` -> `App Settings` -> `Security & Keys`

 - `TANTALUS_CLOUD_PROVIDER_APP_ID`
 - `TANTALUS_CLOUD_PROVIDER_MASTER_KEY`

### Agenda

 - `TANTALUS_AGENDA_DB_STRING` or `AGENDA_DB_STRING`
 - `TANTALUS_AGENDA_HEALTH_SERVICE_PORT` or `AGENDA_HEALTH_SERVICE_PORT`

### OpenShift

```bash
 ./oc login https://console-1-eu-os.cloudstrap.io
```

```bash
./oc projects
```

```bash
# Create a new pod from last successful build
./oc scale dc worker --replicas=1
```

```bash
./oc get deploymentconfigs
```

```bash
./oc get pods
```

### Feature Toggles

More about Feature toggles -> [Feature Toggles (aka Feature Flags)](https://martinfowler.com/articles/feature-toggles.html)

 - `AGENDA_IS_ACTIVE` - If process variables is equal to `false`. Api doesn't create background tasks
 - `AWS_S3_IS_ACTIVE` - If process variables is equal to `true`. Api doesn't upload files on Amazon S3 

 ### Mongoexport

 Export parse collection: 

 ```bash
mongoexport --db dev --collection GameScore --jsonArray --out gamescore.json
 ```

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

### npm build tool

- [NPM is an amazing build tool](http://lucasmreis.github.io/blog/npm-is-an-amazing-build-tool)
- [how to run a script without logging that that stupid npm error if it doesn't exit with code 0?](https://github.com/npm/npm/issues/6124)


