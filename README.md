# ELEGANT-web

The official site of [ELEGANT](https://github.com/Leetsong/ELEGANT.git).

## Development

### step 1: clone or download

``` bash
$ git clone https://github.com/Leetsong/ELEGANT-web.git
```

### step 2: download dbs

Entering the following commands to download [ELEGANT-dbs](https://github.com/Leetsong/ELEGANT-dbs.git)

``` bash
$ cd service
$ git clone https://github.com/Leetsong/ELEGANT-dbs.git dbs
$ cd dbs && rm -rf .git && cd .. # remove .git
$ cd ..
```

### step 3: set android platforms

You can set the android platforms in 2 options.

#### Option 1: set to your `${ANDROID_HOME}`

If you have Android SDK installed, open SDK Manager and download different platforms (the more, the better).

Entering the following commands to set your android platforms

```
$ cd service
$ ln -s ${ANDROID_HOME}/platforms android-platforms
$ cd ..
```

#### Option 2: manually download

Google and download different platforms (the more, the better), order them in a directory hirarchy like,

``` text
./android-platforms
├── android-1
│   └── android.jar
├── android-2
│   └── android.jar
...
├── android-22
│   └── android.jar
├── android-26
│   └── android.jar
...
```

Entering the following commands to set your android platforms

```
$ cd service
$ ln -s <path-to-your-downloaded-android-platforms> android-platforms
$ cd ..
```

### step 4: install npm depencencies

``` bash
$ cd service && npm i && cd ..
$ cd webapp && npm i && cd ..
```

### step5: run them

run the front end,

``` bash
$ cd webapp
$ npm run dev
``` 

run the back end,

``` bash
$ cd service
$ npm run dev
```

## Build and Deploy

> ;-( TO BE ADDED