echo "Building container...\n"
docker build -t alexsthub/reviewsystemtest .

docker rm -f reviewsystemtest

docker run -d \
-p 3308:3306 \
--name reviewsystemtest \
-e MYSQL_ROOT_PASSWORD="password" \
-e MYSQL_DATABASE="reviewsystem" \
alexsthub/reviewsystemtest:latest

printf "\nWaiting for test container to spin up for 15s...\n"
total=15
for i in {1..15}
do 
  if ((i % 5 == 0))
  then
    let val=$total-$i
    echo $val seconds remaining...
  fi
  sleep 1
done

mocha ../../build/tests/*.js --exit

docker rm -f reviewsystemtest
