#!/bin/bash

(cd ./src/backend && yarn dev) & (cd ./src/frontend && yarn dev)
