docker run -d \
-p 3500:3500 \
--name reviewauth \
-e MYSQL_ROOT_PASSWORD="password" \
-e MYSQL_DATABASE="users" \
alexsthub/reviewauth:latest

# To connect from console
# docker exec -it reviewauth mysql -u root -p