#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${DIR}/../react-mb-client"

echo "----------- START INSTALLING REACT DEPENDENCY -----------"
npm install --loglevel verbose

echo "---------------- START BUILDING REACT APP ---------------"
npm run build


