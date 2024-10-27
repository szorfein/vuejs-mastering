# 

## Learned
- Create a Electron/vue project
- axios (post, delete, put, ...)
- vue-router@4 on src/main.js
- use [json-server](https://www.npmjs.com/package/json-server) to test API
- Some component can be excluded, depending the current page (e.g: login page)
- `@submit.prevent` on form
- inject param with vue-router and query

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
the database
```
./node_modules/.bin/json-server photo_api/db.json
```

On web browser

```
npm run serve
```

Desktop App (electron)

```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
