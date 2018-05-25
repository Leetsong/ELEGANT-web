## Download Guidance

### 1. Download Jar Files

Click above button to download either *ELEGANT*.jar or *elegant-cli.jar*. And put them in a folder, e.g. `ELEGANT`.

+ **ELEGANT.jar**

  This is the kernel of ELEGANT. A library that you can use to write your own codes.

+ **elegant-cli.jar**

  This is command line standalone tool that uses *ELEGANT.jar* to provide the functionalities that ELEGANT has. And it is the best practice of using ELEGANT.

### 2. Download Database Files

#### if you are using *elegant-cli.jar*

Open your command line, entering the folder that containing *ELEGANT.jar* or *elegant-cli.jar*, e.g. `ELEGANT`. Typing the following commands.

``` bash
$ git clone https://github.com/Leetsong/ELEGANT-dbs.git dbs
$ cd dbs && rm -rf .git && cd ..
```

Then you can use *elegant.jar*,

```bash
usage: java -jar elegant-cli.jar [option ...] <apk>
option:
 -d3,--d3-algo <value>        algorithms used in 3rd party library
                              detection, <value> is one of: d3.none,
                              d3.whitelist, d3.libscout.
 -h,--help                    show help
 -m,--models <file>           custom api context models, in json format
 -o,--output <file>           redirect technique report output to <file>
 -p,--platforms <direcotry>   android platforms
 -V,--verbose                 print verbose information
 -v,--version                 show version
```

#### if you are using *ELEGANT.jar*

Assume the root folder your project that you want to use *ELEGANT.jar* is `YOUR-PROJECT-ROOT-FOLER`, entering `YOUR-PROJECT-ROOT-FOLER` and type the following commands,

```bash
$ git clone https://github.com/Leetsong/ELEGANT-dbs.git dbs
$ cd dbs && rm -rf .git && cd ..
```

Then add *ELEGANT.jar* to your class path.



