#!/bin/bash
set -e 
BEACONS_API_URL=${BEACONS_API_URL:-"https://www.ebi.ac.uk/pdbe/pdbe-kb/3dbeacons/api"}
BEACONS_GA_TAG=${BEACONS_GA_TAG:-"TEST"}

mainFileName="$(ls /usr/share/nginx/html/main*.js)" 
envsubst '\$BEACONS_API_URL \$BEACONS_GA_TAG ' < ${mainFileName} > /tmp/main.tmp && \
mv /tmp/main.tmp ${mainFileName} && \

exec "$@"