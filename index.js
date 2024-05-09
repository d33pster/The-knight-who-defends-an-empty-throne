/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
export default (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue! @d33pster will look into it asap.",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  app.on("issues.closed", async (context) => {
    // const issue = context.payload.issue;
    // const owner = issue.owner.login;
    // const repo = issue.repo.name;
    // const issueNumber = issue.number;

    // Add your comment here
    const commentBody = context.issue({body:'This issue is now closed.'});

    // Post a comment on the closed issue
    await context.octokit.issues.createComment(commentBody);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
