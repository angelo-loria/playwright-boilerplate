/**
 * Tesults API reference: https://www.tesults.com/docs/api/overview
 * This script creates a new Tesults target for the current branch if it doesn't exist,
 * or regenerates the token for the existing target if it does exist.
 * The script also deletes the target if the branch is deleted.
*/
const fetch = require("node-fetch");
const fs = require("fs");
const { argv } = require("process");

const repoName = "playwright-boilerplate"
const desiredTargetName = `${repoName}_${process.env.BRANCH}`;
const apiToken = process.env.TESULTS_API_TOKEN;

async function sendCreateRequest(apiToken, desiredTargetName, repoName) {
    let body = JSON.stringify({
        name: desiredTargetName,
        group: [repoName],
        build_consolidation: true,
    });

    let requestOptions = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + apiToken,
            "Content-Type": "application/json",
        },
        body: body,
    };

    try {
        console.log("creating target: " + desiredTargetName);
        const res = await fetch(
            "https://www.tesults.com/api/targets",
            requestOptions
        );
        return await res.json();
    } catch (error) {
        return console.log("send create request error", error);
    }
}

async function sendDeleteRequest(apiToken, targetId) {
    let requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + apiToken,
        },
    };

    try {
        console.log("deleting target...");
        const res = await fetch(
            "https://www.tesults.com/api/targets/" + targetId,
            requestOptions
        );
        return await res.json();
    } catch (error) {
        return console.log("send delete request error", error);
    }
}

async function sendGetTargetsRequest(apiToken) {
    let requestOptions = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + apiToken,
        },
    };

    try {
        const res = await fetch(
            "https://www.tesults.com/api/targets",
            requestOptions
        );
        return await res.json();
    } catch (error) {
        return console.log("set get request error", error);
    }
}

async function sendRegenerateTargetTokenRequest(apiToken, targetId) {
    let requestOptions = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + apiToken,
            "Content-Type": "application/json",
        },
    };

    try {
        const res = await fetch(
            `https://www.tesults.com/api/targets/${targetId}/regenerate_token`,
            requestOptions
        );
        return await res.json();
    } catch (error) {
        return console.log("send regenerate token request error", error);
    }
}

function findTargetId(currentTargets, targetName) {
    for (let currentTarget of currentTargets) {
        if (currentTarget.name === targetName) {
            return currentTarget.id;
        }
    }
    return null;
}

function isTargetExist(currentTargets, targetName) {
    for (let currentTarget of currentTargets) {
        if (currentTarget.name === targetName) {
            console.log("target exists");
            return true;
        }
    }
    return false;
}

function createTarget(apiToken, desiredTargetName, repoName) {
    let newToken;
    sendGetTargetsRequest(apiToken).then((res) => {
        if (!isTargetExist(res.data.targets, desiredTargetName)) {
            sendCreateRequest(apiToken, desiredTargetName, repoName)
                .then((res) => {
                    newToken = res.data.token;
                })
                .then(() => {
                    console.log(
                        "setting tesults token for created target: " +
                            desiredTargetName
                    );
                    fs.writeFile("tesultsToken.txt", newToken, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("tesults token > tesultsToken.txt");
                        }
                    });
                });
        } else {
            console.log(
                "regenerating token for existing target: " + desiredTargetName
            );
            sendRegenerateTargetTokenRequest(
                apiToken,
                findTargetId(res.data.targets, desiredTargetName)
            ).then((res) => {
                fs.writeFile(
                    "tesultsToken.txt",
                    res.data.token,
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("tesults token > tesultsToken.txt");
                        }
                    }
                );
            });
        }
    });
}

function deleteTarget(apiToken, desiredTargetName) {
    let targetId;
    sendGetTargetsRequest(apiToken)
        .then((res) => {
            targetId = findTargetId(res.data.targets, desiredTargetName);
        })
        .then(() => {
            sendDeleteRequest(apiToken, targetId).then((res) => {
                console.log(res);
            });
        });
}

switch (argv[2]) {
    case "create":
        createTarget(apiToken, desiredTargetName, repoName);
        break;
    case "delete":
        deleteTarget(apiToken, desiredTargetName);
        break;
    default:
        console.log("no target action specified, exiting...");
}
