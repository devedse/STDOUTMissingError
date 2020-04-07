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

However when I read the `stdout` in my custom Azure DevOps task I see the same output except the 2 lines I added #### in front off:

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

The code I'm currently using to call docker-compose and read the output is as follows:

[./src/index.ts](./src/index.ts)
```
console.log("Setup...");
tl.cd("../SampleComposeProject");

var command = tl.tool("docker-compose");
command.arg(["-f", "docker-compose.yml"])
command.arg(["build"]);

// setup variable to store the command output
let output = "";
command.on("stdout", data => {
    output += data;
});


console.log("Executing command...");
await command.exec()
console.log("Command completed :)");

console.log(`\nAnd now for the full output:\n\n${output}`);
```

## Build status

To be able to easily reproduce the issue, I've also added the following automated buid pipelines. As you can see in the logging the STDOUT log lines are missing for `Building sample1` and `Building sample2`

| Travis (Linux/Osx build) | AppVeyor (Windows build) |
|:------------------------:|:------------------------:|
| [![Build Status](https://travis-ci.org/devedse/STDOUTMissingError.svg?branch=master)](https://travis-ci.org/devedse/STDOUTMissingError) | [![Build status](https://ci.appveyor.com/api/projects/status/2js9l5te9md65reu?svg=true)](https://ci.appveyor.com/project/devedse/stdoutmissingerror) |
