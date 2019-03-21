# CPF-CNPJ

## Dependencies
- [docker](https://www.docker.com/)

## How to run:
After clone, you can run
```bash 
bash install.sh
```

then... you can visit http://localhost:3000

If you aren't in a UNIX based system, you can run these commands:

```bash
docker build -t next-app . 

docker run -d --name mongodb -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb 

docker run -it -p 3000:3000 --link mongodb:mongo next-app
```
...then, visit http://localhost:3000


Simpler than Bettina's methods :speak_no_evil:

If something goes wrong... don't give up... but you will need another dependencies :kissing_closed_eyes:

- [mongodb](https://www.mongodb.com/) - running on port 27017;
- [nodejs](https://nodejs.org/en/) 

... and at least... but not less important... 
you must install internal dependencies running

`npm install`

then run

`npm run dev`

then... visit http://localhost:3000
