enable-docker:
	sudo chmod 666 /var/run/docker.sock

run:
	docker-compose up

ambassadors:
	npm run seed:ambassadors
