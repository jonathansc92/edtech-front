echo "[####]Create file .env[####]"
touch .env && cp .env.example .env

echo "[####]Up container[####]"
docker-compose up -d

echo "[####]install project dependences[####]"
docker container exec edtech-front npm install

echo "[####]Done! Aplication is ready to run![####]"