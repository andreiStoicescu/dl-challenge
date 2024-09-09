#!/bin/bash

yarn run typeorm migration:run -d src/config/databaseConfig.ts && yarn run start:dev