echo hello

docker build -t alexsthub/reviewsystemtest .

docker rm -f reviewsystemtest

docker run -d \
-p 3308:3306 \
--name reviewsystemtest \
-e MYSQL_ROOT_PASSWORD="password" \
-e MYSQL_DATABASE="reviewsystem" \
alexsthub/reviewsystemtest:latest

# mocha ../../build/tests/*.js --exit

# docker rm -f reviewsystemtest
