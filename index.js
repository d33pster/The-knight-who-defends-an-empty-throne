/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
export default (app) => {
  // Your code here
  app.log.info("The Knight Who Defends An Empty Throne - IGRIS - LOGIN");

  // issues

  // opened
  app.on("issues.opened", async (context) => {
    const username_ = context.payload.issue.user.login;
    const username = context.payload.repository.owner.login;
    let message = "";
    if (username == username_) {
      message = `Thanks for opening this issue, @${username_}!🤩 \nTitle: ${context.payload.issue.title} #${context.payload.issue.number}`;
    } else {
      message = `Thanks for opening this issue, @${username_}!🤩 @${username} will look into it asap.😬\nTitle: ${context.payload.issue.title} #${context.payload.issue.number}`;
    }
    // console.log(message)
    const issueComment = context.issue({
      body: message,
    });
    return context.octokit.issues.createComment(issueComment);
  });
  // closed
  app.on("issues.closed", async (context) => {
    const username_ = context.payload.issue.user.login;
    const username = context.payload.repository.owner.login;
    let message = "";
    if (username == username_) {
      message = `Thanks for closing this issue, @${username_}!🤩 \nTitle: ${context.payload.issue.title} #${context.payload.issue.number} is closed now!🥳🤩`;
    } else {
      message = `Thanks for closing this issue, @${username_}!🤩 \nThanks from @${username}\nTitle: ${context.payload.issue.title} #${context.payload.issue.number} is closed now!🥳🤩`;
    }

    // Add your comment here
    const commentBody = context.issue({body:message});

    // Post a comment on the closed issue
    await context.octokit.issues.createComment(commentBody);
  });
  // reopened
  app.on("issues.reopened", async (context) => {
    const username_ = context.payload.issue.user.login;
    const username = context.payload.repository.owner.login;
    let message = "";
    if (username == username_) {
      message = `Issue reopened @${username_}!😱 \nTitle: ${context.payload.issue.title} #${context.payload.issue.number}\n😮‍💨😵‍💫`;
    } else {
      message = `Thanks for re-opening this issue, @${username_}!😅 @${username} will look into it asap.😤\nTitle: ${context.payload.issue.title} #${context.payload.issue.number} has been re-opened!🫠`;
    }
    const commentBody = context.issue({body: message});
    await context.octokit.issues.createComment(commentBody);
  });

  // Pull requests

  app.on("pull_request.closed", async (context) => {

    // Add your comment here
    const commentBody = context.issue({body: 'This pull request is now closed.'});

    // Post a comment on the closed pull request
    await context.octokit.issues.createComment(commentBody);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
