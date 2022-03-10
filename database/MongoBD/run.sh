#!/bin/bash
function waitForContainer {
	while [[ ! $(docker ps --filter name=${1} --filter status=running --format={{.Status}} 2>/dev/null) ]] ; do
		sleep 1
	done
}
export STARTED='no'
trap '[[ $STARTED == "yes" ]] && { docker-compose down; STARTED="no"; };exit' SIGINT
trap '[[ $STARTED == "yes" ]] && { docker-compose down; STARTED="no"; }' EXIT
 
echo 'starting DB..'
STARTED="yes"
docker-compose up -d mongodb >/dev/null 2>&1
waitForContainer mongodb

echo 'Starting dev env...'
docker-compose up -d mongodb_dev >/dev/null 2>&1

echo "Open http://localhost:8081/ to manage"
sleep 2
docker-compose logs --follow mongodb_dev
#( trap exit SIGINT ; read -r -d '' _ </dev/tty )
