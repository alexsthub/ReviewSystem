docker build -t alexsthub/reviewsystem .

docker rm -f reviewsystem

docker run -d \
-p 3500:3500 \
--name reviewsystem \
-e MYSQL_ROOT_PASSWORD="password" \
-e MYSQL_DATABASE="reviewsystem" \
alexsthub/reviewsystem:latest

# To connect from console
# docker exec -it reviewsystem mysql -u root -p