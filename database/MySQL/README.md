# Environment setup

To run a local instance of MySQL execute:
`docker-compose up -d`
This will create 2 containers:
- `mysql`
- `mysql_mysql_adminer_1`

The "mysql" prefix is the current directory name

To execute commands in the MySQL container:
`docker exec -it mysql bash`

To see the logs of MySQL:
`docker logs mysql`

To stop:
`docker-compose down`

# Tools

Container `adminer` provides user interface for MySQL - just open localhost:8080 and use password from the docker-compose.yml

# Tutorial files

<details>
  <summary>01-csv.txt</summary>
  Describes what a database is used for
</details>
