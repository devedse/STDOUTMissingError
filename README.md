# STDOUTMissingError

I've created this repository to reproduce an issue I'm running into with an Azure DevOps task I'm developing. For some reason the output from the docker-compose command is missing 2 specific lines.

Task I'm creating:
https://github.com/devedse/DeveDockerCaching

## Missing output

When I run docker-compose build in my custom Azure DevOps task I see the following output in Azure DevOps:

```
Building sample1
Step 1/2 : FROM nginx:alpine
 ---> 377c0837328f
Step 2/2 : COPY . /usr/share/nginx/html
 ---> Using cache
 ---> 6cac8912ab73

Successfully built 6cac8912ab73
Successfully tagged sample1:latest
Building sample2
Step 1/2 : FROM nginx:alpine
 ---> 377c0837328f
Step 2/2 : COPY . /usr/share/nginx/html
 ---> Using cache
 ---> 6cac8912ab73

Successfully built 6cac8912ab73
Successfully tagged sample2:latest
```

However when I read the `stdout` in my custom Azure DevOps task I see the following output:

```
##### Building sample1 <-- missing
Step 1/2 : FROM nginx:alpine
 ---> 377c0837328f
Step 2/2 : COPY . /usr/share/nginx/html
 ---> Using cache
 ---> 6cac8912ab73

Successfully built 6cac8912ab73
Successfully tagged sample1:latest
##### Building sample2 <-- missing
Step 1/2 : FROM nginx:alpine
 ---> 377c0837328f
Step 2/2 : COPY . /usr/share/nginx/html
 ---> Using cache
 ---> 6cac8912ab73

Successfully built 6cac8912ab73
Successfully tagged sample2:latest
```

![](src/DeveDockerCaching.png)

Note: This extension is currently under development.

## Build status

| Travis (Linux/Osx build) | AppVeyor (Windows build) |
|:------------------------:|:------------------------:|
| [![Build Status](https://travis-ci.org/devedse/DeveDockerCaching.svg?branch=master)](https://travis-ci.org/devedse/DeveDockerCaching) | [![Build status](https://ci.appveyor.com/api/projects/status/nirya7203ltfb8gn?svg=true)](https://ci.appveyor.com/project/devedse/devedockercaching) |