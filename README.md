# ReadyPlayer Bot

## Setup

Get discord token and node info and place into `.env` file in the root directory.

```
NODE_LOCAL_PORT=3600
```
```
NODE_DOCKER_PORT=3600
```

Start Server

```bash
docker-compose up --detach
```

Refresh Server

```bash
docker-compose down
```

To Automate RasPi for program to start on startup add to rc.local file:

```bash
sudo nano /etc/rc.local
```

```bash
docker-compose up --detach /Projects/playerReadyBot &
```