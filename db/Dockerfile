FROM postgres:alpine3.18

EXPOSE $POSTGRES_PORT

CMD ["postgres", "-c", "logging_collector=on", "-c", "log_directory=/var/log/postgresql"]