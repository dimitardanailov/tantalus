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

 - `SASHIDO_TANTALUS_CONNECTION_STRING`
