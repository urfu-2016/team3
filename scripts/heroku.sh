#!/usr/bin/env bash

if [ "${NODE_ENV}" != "production" ]; then
  npm run build
  node scripts/clear-db.js
  node scripts/fill-db.js
fi

npm start
