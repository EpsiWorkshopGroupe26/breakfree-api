#!/bin/bash

# Build the API
node ace build
sleep 5
cd build
node bin/server.js
