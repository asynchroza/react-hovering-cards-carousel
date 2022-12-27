### Generate declaration files ([Github Issue](https://github.com/vitejs/vite/issues/2049)):
```shell
tsc lib/index.ts --declaration --emitDeclarationOnly --jsx react --esModuleInterop --outDir dist
```

### Build library/package: 
```shell
vite build
```
