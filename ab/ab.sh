#!/bin/bash

sleep 15

MIN_REQUESTS=1000
MAX_REQUESTS=10000

while true
do
    ab -k -c 350 -n $(($MIN_REQUESTS + $RANDOM % $MAX_REQUESTS)) http://hsa310-nginx/
	sleep 1
done