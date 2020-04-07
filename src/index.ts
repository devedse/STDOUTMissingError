import * as tl from "azure-pipelines-task-lib/task";
import * as colors from "colors";

async function run() {
    try {
        console.log("Setup...");
        tl.cd("../SampleComposeProject");

        var command = tl.tool("docker-compose");
        command.arg(["-f", "docker-compose.yml"])
        command.arg(["build"]);

        // setup variable to store the command output
        let stdout = "";
        command.on("stdout", data => {
            stdout += data;
        });

        // let stdline = "";
        // command.on("stdline", data => {
        //     stdline += data;
        // });

        let stderr = "";
        command.on("stderr", data => {
            stderr += data;
        });


        console.log("Executing command...");
        await command.exec()
        console.log("Command completed :)");

        console.log("\nAnd now for the full output:");
        console.log(`\n\n\n#### stdout:####\n\n${stdout}`);
        // console.log(`\n\n\n#### stdline:####\n\n${stdline}`);
        console.log(`\n\n\n#### stderr:####\n\n${stderr}`);


        if (stderr.length != 0) {
            console.error(colors.red(`\n\n\n\nWhy would these lines be in stderr????????????: \n${stderr}`));
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();