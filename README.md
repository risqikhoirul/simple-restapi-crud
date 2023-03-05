# simple-restapi-crud
simple rest api crud with expressjs and mysql

## Create Database

```
CREATE DATABASE produksi_pangan;
```

## Install

```
git clone https://github.com/risqikhoirul/simple-restapi-crud.git
cd simple-restapi-crud
npm i -g nodemon
npm i
```

## Usage

```
npm start
```

## Api

### GET ALL
Mehod: GET

Url: /

```
curl -X GET http://localhost:3000/
```

### POST or Update
Method: POST

Url: /add

```
curl -H "Content-Type: application/json" -X POST -d '{"Jenis": "Telur", "Tanam": 1234.9, "Panen": 1987.8, "Produksi": 31366.4, "Provitas": 4.86 }' http://localhost:3000/add
```

### Get One By No
Method: GET

Url: /:No

```
curl -X GET http://localhost:3000/1
```

### Update By No
Method: PUT

Url: /update/:No

```
curl -H "Content-Type: application/json" -X PUT -d '{"Jenis": "Jagung", "Tanam": 1500, "Panen": 2500, "Produksi": 100000, "Provitas": 40 }' http://localhost:3000/update/1
```

### Delete By No
Method: DELETE

Url: /delete/:No

```
curl -X DELETE http://localhost:3000/delete/1
```
