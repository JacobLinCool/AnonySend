import { Octokit } from "octokit";
import md2text from "markdown-to-txt";
import { GITHUB_TOKEN, WHITE_LIST } from "./config";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

export async function send(
    from: string,
    to: string,
    content: string,
    info: string[] = [],
    labels = ["anonysend"],
): Promise<{ success: boolean; link: string }> {
    if (!WHITE_LIST.test(to)) {
        throw new Error("Destination not allowed.");
    }

    const [owner, repo] = to.split("/");

    const plain = md2text(content).split(/\s/g);
    let short = "";
    for (let i = 0; i < plain.length; i++) {
        if (short.length + plain[i].length > 60) {
            short += "...";
            break;
        }
        short += plain[i] + " ";
    }
    const title = `[AnonySend] ${from}: ${short}`;
    const body = `From: **${from}**\n\n---\n\n${content}\n\n---\n\n${info
        .map((t) => "> " + t)
        .join("\n")}`;

    const { data } = await octokit.rest.issues.create({ owner, repo, title, body, labels });

    return { success: true, link: data.html_url };
}
