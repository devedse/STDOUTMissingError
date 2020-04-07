import * as tl from "azure-pipelines-task-lib/task";

async function run() {
    try {
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
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();