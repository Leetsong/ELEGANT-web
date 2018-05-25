<p style="text-align: center; margin: 30px 0;"><img src="./ELEGANT.png" style="max-width: 80%;" /></p>

## Introduction

ELEGANT, is a tool used to locate fragmentation induced compatibility issues.

### FIC Issues

FIC is short for <u>f</u>ragmentation <u>i</u>nduced <u>c</u>ompatibility issues [1] the Android ecosystem is severely suffering from. In the Android ecosystem, various devices bounded with different device models (Google Pixel, Samsung Galaxy, etc.) and operating system versions (Lollipop, etc.) arises every day. The developers of these models/versions sometimes change the behavior of some apis, making them different with the behavior described in the official documents, with or without notifying developers of these changes. In result, apps developed using these apis will behave differently in different devices (good on one, but crash on another). And a developer cannot exhaustively test all the various devices due to the numerous combinations of the models and versions.

### API-Context Pair Model

ELEGANT is a tool that can locate FIC issues, and the magic ELEGANT uses is *API-Context Pair* model [1].

By empirical study, L. Wei, et al. observed many issues exhibit common patterns:

> They are triggered by the improper use of an Android API, which we call *issue-inducing API*, in a problematic software/hardware environment, which we call *issue-triggering context*. [1]

Thus, a model combining both of the *issue-inducing API* and the *issue-triggering context* is proposed, namely *API-Context Pair* model in short. And generally, an *API-Context Pair* is represented as,
$$
<API, Context>
$$
For example, the api `AppCompactActivity.setSupportActionBar(…) ` will crash on some Samsung devices, then the *API-Context Pair* model can be represented as,
$$
<AppCompactActivity.setSupportActionBar(…), DeviceModel \neq ["Samsung"]>
$$
Check references [1] for more details on *API-Context Pair* model and its empirical study.

### Third Party Library Detection

Third party libraries are commonly used in Android (and/or many other kinds of) developing. Tools like [FicFinder](http://sccpu2.cse.ust.hk/ficfinder/index.html) will report FIC issues that happens in a third party library, but actually they take few account of the total. 

And we believe that, 

1. from a perspective of a third party lib developer, fixing them (FIC issues happens in a third party library) up and masking the details of them against the (this library’s) users is one of the most important task that should be accomplished. 
2. according to 1, the number of FIC issues that happens in a third party library is rare.
3. reporting a FIC issue that happens in a third party library does no helps to an app developer.

Thus, ELEGANT are capable of detecting third party libraries, i.e. ELEGANT has the ability to eliminate them while doing locating with the sacrificing of some efficiency.

ELEGANT has provided 3 methods, by far, that can perform a third party library detection:

1. **None**  ELEGANT will detect no third party libraries (except some official ones, e.g. `java`, `android`, `oracle`, etc.), and will report issues happens in a third party library.
2. **Whitelist** ELEGANT's *recommended* and *default* third party library detection algorithms. This is a commonly used manner for detecting third party libraries. When a relatively proper-size whitelist is maintained, it provides a relatively high precision and high performance. Without any initialization works, except loading the whitelist into the memory, this way is more faster. However, for those apks which are obfuscated, the whitelist way gives no help at all.
3. **LibScout** [LibScout](https://github.com/reddr/LibScout) is a library detection tool that is resilient against common code obfuscations and that is capable of pinpointing the exact library version, proposed by M. Backes, et al. in 2016. By assigning the third party library detection algorithms to LibScout, ELEGANT will use *LibScout*  as a backend third party library detection tools. It provides a more precise third party library detection but takes some time to do the initialization work (loading the profiles, and constructing the data structure), and not very efficient when doing the matching algorithm.

### Call Site Tree and Call Chain

ELEGANT constructs a call site tree while doing locating, and in the end can report the call chain of a specific API, to give developers more information and help do debug.

## Models

The *API-Context Pair* Models we used are modeled into Json format in our implementation. An example Json file are,

``` json
[
  {
    "api": {
      "@type": "method",
      "pkg": "android.media",
      "iface": "AudioMedia",
      "method": "setRouting",
      "ret": {
        "pkg": "",
        "iface": "void"
      },
      "paramList": [
        {
          "pkg": "",
          "iface": "int"
        },
        {
          "pkg": "",
          "iface": "int"
        },
        {
          "pkg": "",
          "iface": "int"
        }
      ]
    },
    "context": {
      "min_api_level": 1,
      "max_api_level": 3
    }
  },
  {
    "api": {
      "@type": "field",
      "pkg": "android.content",
      "iface": "Intent",
      "type": {
        "pkg": "java.lang",
        "iface": "String"
      },
      "field": "EXTRA_REMOTE_INTENT_TOKEN"
    },
    "context": {
      "min_api_level": 5,
      "message": "This api is introduced in API level 5, its dangerous to use it on SDKs less than API level 5"
    }
  },
  {
    "api": {
      "@type": "iface",
      "pkg": "android.provider.SyncStateContract",
      "iface": "Constants"
    },
    "context": {
      "min_api_level": 5,
      "important": "min_api_level"
    }
  }
]
```

As shown above, a models JSON file is an `array` of *API-Context Pair Model*s, and each model is composed of an `api` field specifying the sepcific <code>API</code>, and a `context` field describing the <code>Context</code>.

### `api`

For any `api`, the field `@type` and `pkg` is **REQUIRED**, of which the former one describes the type of this <code>API</code>, and the latter the package that this <code>API</code> inhabits in.

There three types of `api` in terms of different value of `@type`:

+ `@type` = `method`  represents a method
  + `pkg`  *REQUIRED string* package name of this method.
  + `iface` *REQUIRED string* class or interface name this method inhabits in. For an inner class `B` of class `A`, this field should be assigned to `A$B`. For a generic class `A<T>`, assign this field to `A` (with the generic type erased).
  + `method` *REQUIRED string* method name of this method.
  + `ret` *REQUIRED shapeOf({"pkg", "iface"})* return type of this method.
    + `pkg` *REQUIRED string* package name of this type.
    + `iface` *REQUIRED string* class or interface name this type. For a generic method with a generic type `T` as return type, erase it and assign `java.lang.Object ` it to this field.
  + `paramList`  *REQUIRED arrayOf(shapeOf({"pkg", "iface"}))* parameters list of this method.
    + `pkg` *REQUIRED string* package name of this type.
    + `iface` *REQUIRED string* class or interface name this type. For a generic method with a generic type `T` as a parameter type, erase it to `java.lang.Object `. For a method with variable length arguments such as `int…` as parameters, replace it with `int[]`.
+ `@type` = `iface` represents a type
  + `pkg` *REQUIRED string* package name of this type.
  + `iface` *REQUIRED string* class or interface name of this type. For a generic method with a generic type `T` as return type, erase it and assign `java.lang.Object ` it to this field.
+ `@type` = `field` represents a field
  + `pkg` *REQUIRED string* package name of this field.
  + `iface` *REQUIRED string* class or interface name this field inhabits in. For a generic method with a generic type `T` as return type, erase it and assign `java.lang.Object ` it to this field.
  + `type` *REQUIRED shapeOf({"pkg", "iface"})*
    + pkg` *REQUIRED string* package name of this type.
    + `iface` *REQUIRED string* class or interface name this type. For a generic method with a generic type `T` as return type, erase it and assign `java.lang.Object ` it to this field.
  + `field` *REQUIRED string* name of this field

### `context`

+ `min_api_level` *OPTIONAL number* API level the paired api introduced in.
+ `max_api_level` *OPTIONAL number* API level the paired api deprecated at.
+ `bad_devices` *OPTIONAL arrayOf(string)* array of incompatible devices of the paired api.
+ `important` *OPTIONAL string* field that is important. If a field is marked as important, as long as a issue is *detected*, the *validation* phase will be ignored and then reported.
+ `message` *OPTIONAL string* messages that you want to tell to the developer.

## Tutorial

ELEGANT is a library, on top of [Soot]() [3], writing in Java. Having downloaded ELEGANT.jar according to [download](/download), there are 3 steps left to use ELEGANT.

### 1. Create an `ELEGANT` instance

The first thing you do is to create an `ELEGANT` instance using the builder `ELEGANT.Builder`,

``` java
String apkPath       = "some_directory/test.apk";
String modelsPath    = "some_directory/test.models.json";
String platformsPath = "your_android_home/platforms";
String d3Algo        = "d3.whitelist";

ELEGANT.Builder builder = new ELEGANT.Builder();
ELEGANT elegant = builder
  .withApkPath(apkPath)
  .withModelsPath(modelsPath)
  .withPlatformsPath(platformsPath)
  .withD3Algo(d3Algo)
  .build();
```

As shown above, the `ELEGANT.Builder` will guide you to construct a legal `ELEGANT` instance. If any *REQUIRED* field are missed, `ELEGANT.Builder` willfail. All fields are,

+ `withApkPath` *REQUIRED* 
+ `withModelsPath` *REQUIRED* you can use `models.json`  provided by *elegant-cli*, see details in section ELEGANT-cli
+ `withPlatformsPath` *REQUIRED*
+ `withD3Algo`  *OPTIONAL* alternatives are `d3.whitelist`, `d3.none` and `d3.libscout`.

### 2. Watch issues

The second step is to write a issue handle to receive the issues emitted by `ELEGANT`, and watch it.

#### 2.1 Write a Issue Handle

Any issue handle you want to use must inherit from `PubSub.Handle`. `ELEGANT`, by far, reports 2 types of `Issue`, i.e. `PIssue` and `RIssue`, you receive them using your issue handle one by one and take care of them.

```java
public abstract class IssueHandle implements PubSub.Handle {

    @Override
    public void handle(PubSub.Message message) {
        if (!(message instanceof Issue)) {
            return ;
        } else if (message instanceof PIssue){
            System.out.println("PIssue: " + message.toString());
        } else if (message instanceof RIssue){
            System.out.println("RIssue: " + message.toString());
        }
    }
}
```

#### 2.2 Watch it

Then you should tell `ELEGANT` that you want to watch issues by your issue handle.

```java
elegant.watchIssues(new IssueHandle());
```

### 3. Report issues

The last step is to report them. The report codes should inhabit in your issue handle, but the recommended way is to write your own reporter to take care of them separately and use your issue handle as a proxy from `ELEGANT` to your own reporter.

## elegant-cli

For easily use, we provide a tool *elegant-cli* that you can use from your command line. And `ELEGANT-cli` is a best practice of using `ELEGANT`. To use *ELEGANT-cli*,

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

As shown above,

+ `-d3` or `--d3-algo` designate the third party library detection algorithms. `d3.whitelist` as default, `d3.none` and `d3.libscout` are alternatives.
+ `-m` or `--models` designate the models json file you want to use. The `model.json` provide in `res` directory is the default one.
+ `-o` or `--output` designate the output file that the technique report will redirect to. `stdout` by default.
+ `-p` or `--platforms` designate the android platforms directory. `$ANDROID_HOME/platforms` by default.
+ `-V` or `—verbose` designate whether output the call chain details. `false` by default.

## ELEGANT API

### `simonlee.elegant.ELEGANT`

`ELEGANT` is the proxy that you can use to communicate with ELEGANT.

``` java
/**
  * subscribe to watch issues ELEGANT emitted
  *
  * @param handle handle to be registered
  * @return       a handler of handle
  */
public int watchIssues(PubSub.Handle handle);

/**
  * subscribe to watch issues ELEGANT emitted
  *
  * @param handler a handler return by watchIssues
  */
public void unwatchIssues(int handler);

/**
  * subscribe to watch options ELEGANT parsed
  *
  * @param handle handle to be registered
  * @return       a handler of handle
  */
public int watchOpts(PubSub.Handle handle);

/**
  * subscribe to watch options ELEGANT parsed
  *
  * @param handler a handler return by watchOpts
  */
public void unwatchOpts(int handler);

/**
  * get the options elegant has parsed
  *
  */
public String[] getOptions();

/**
  * get the app has parsed
  *
  */
public SetupApplication getApp();

/**
  * get the manifest elegant has parsed
  *
  */
public ProcessManifest getManifest();

/**
  * get the set of Api-Context Pair models elegant has parsed
  *
  */
public Set<ApiContext> getModels();

/**
  * get the 3rd party library detection algorithms elegant has parsed
  *
  */
public AbstractD3Algo getD3Algo();

/**
  * get the inter-procedural cfg elegant has parsed
  *
  */
public IInfoflowCFG getInterproceduralCFG();

/**
  * get the call graph elegant has parsed
  *
  */
public CallGraph getCallGraph();

/**
  * get the app name elegant has parsed
  *
  */
public String getAppName();

/**
  * get the app package signature elegant has parsed
  *
  */
public String getAppPackage();
```

### `simonlee.elegant.ELEGANT$Builder`

`ELEGANT.Builder` will guide you to construct a legal `ELEGANT` instance. If any *REQUIRED* field are missed, `ELEGANT.Builder` will fail. All fields are,

- `withApkPath` *REQUIRED* 

- `withModelsPath` *REQUIRED* 

  ​	you can use `models.json`  provided by *elegant-cli*, see details in section ELEGANT-cli

- `withPlatformsPath` *REQUIRED*

- `withD3Algo`  *OPTIONAL* 

  ​	alternatives are `d3.whitelist`, `d3.none` and `d3.libscout`.

```java
public Builder withApkPath(String apkPath);
public Builder withModelsPath(String modelsPath);
public Builder withPlatformsPath(String platformsPath);
public Builder withD3Algo(String d3Algo);
public ELEGANT build();
```

### `simonlee.elegant.utils.PubSub`

`PubSub` is a utility interface that help you to construct objects following the Pub-Sub/Listener/Observer patten. It is a frequently used interface in ELEGANT. 

Each publisher extends this interface and use `publish` to publish a message with type `Message`.

Each subscriber who would like to listen to a publisher must inherit from `Handle` and then subscribe to it using `subscribe`. (using `unsubscribe` to unregister from a publisher).

``` java
interface Message {}

interface Handle {
  void handle(Message message);
}

/**
  * subscribe to watch messages
  *
  * @param handle
  * @return
  */
int subscribe(Handle handle);

/**
  * unsubscribe to watch messages
  *
  * @param handler
  */
void unsubscribe(int handler);

/**
  * publish a message
  *
  * @param message
  */
void publish(Message message);
```

## References

[1]. Lili Wei, Yepang Liu, and S.C. Cheung. "Taming Android Fragmentation: Characterizing and Detecting Compatibility Issues for Android Apps". In Proceedings of the 31st IEEE/ACM International Conference on Automated Software Engineering (ASE 2016).

[2]. Michael Backes,  Sven Bugiel,  Erik Derr. "Reliable Third-Party Library Detection in Android and its Security Applications". In Proceedings of 23rd ACM Conference on Computer and Communications Security (CCS '16).

[3]. P. Lam, E. Bodden, O. Lhota ́k, and L. Hendren. The Soot Framework for Java Program Analysis: A Retrospective. In CETUS, 2011. 