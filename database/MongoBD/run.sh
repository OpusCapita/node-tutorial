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
#echo 'Init cluster...'
#while true ; do
#	docker exec -it couchbase couchbase-cli cluster-init \
#		--cluster-username root \
#		--cluster-password password \
#		--cluster-name cluster-name \
#	2>/dev/null 1>&2 \
#	&& break # Re-try until server is really up and cluster is initialized
#	sleep 1
#done
#echo 'Create bucket...'
#docker exec -it couchbase couchbase-cli \
#	bucket-create \
#	--bucket test-bucket \
#	--bucket-type couchbase \
#	--bucket-ramsize 100 \
#	--cluster couchbase \
#	--username root \
#	--password password
#	# cluster is hostname
#	# minimum ram is 100 MiB
## This will create scope=_default and collection=_default

echo 'Starting dev env...'
docker-compose up -d mongodb_dev >/dev/null 2>&1

echo "Open http://localhost:8081/ to manage"
echo "Ctrl+C to end"
sleep 2
docker-compose logs --follow mongodb_dev
#( trap exit SIGINT ; read -r -d '' _ </dev/tty )
