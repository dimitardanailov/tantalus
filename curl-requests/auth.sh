#!/usr/bin/env bash

APP_ID=$TANTALUS_SASHIDO_APP_ID
MASTER_KEY=$TANTALUS_SASHIDO_MASTER_KEY

# echo $APP_ID
# echo $MASTER_KEY

END_POINT="http://localhost:3000/api/operations/decorator"

# Example and idea: https://gist.github.com/Starefossen/6699580

curl -X POST \
  -H "X-Application-Id: $APP_ID" \
  -H "X-Master-Key: $MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{}' \
  $END_POINT
