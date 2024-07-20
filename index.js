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
      message = `Thanks for opening this issue, @${username_}!🤩 \nIssue: ${context.payload.issue.title} #${context.payload.issue.number}`;
    } else {
      message = `Thanks for opening this issue, @${username_}!🤩 @${username} will look into it asap.😬\nIssue: ${context.payload.issue.title} #${context.payload.issue.number}`;
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
      message = `Thanks for closing this issue, @${username_}!🤩 \nIssue: ${context.payload.issue.title} #${context.payload.issue.number} is closed now!🥳🤩`;
    } else {
      message = `Thanks for closing this issue, @${username_}!🤩 \nThanks from @${username}\nIssue: ${context.payload.issue.title} #${context.payload.issue.number} is closed now!🥳🤩`;
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
      message = `@${username_} re-opened the issue!🧐 \nIssue: ${context.payload.issue.title} #${context.payload.issue.number}\n😮‍💨😵‍💫`;
    } else {
      message = `Thanks for re-opening this issue, @${username_}!😅 @${username} will look into it asap.😤\nIssue: ${context.payload.issue.title} #${context.payload.issue.number} has been re-opened!🫠`;
    }
    const commentBody = context.issue({body: message});
    await context.octokit.issues.createComment(commentBody);
  });
  // edited
  app.on("issues.edited", async (context) => {
    const username_ = context.payload.issue.user.login;
    const username = context.payload.repository.owner.login;
    let message = "";
    if (username == username_) {
      message = `Issue ${context.payload.issue.number} has been edited.😌`;
    } else {
      message = `Thanks @${username_}!😌\nIssue ${context.payload.issue.number} has been edited!`;
    }
    const commentBody = context.issue({body: message});
    await context.octokit.issues.createComment(commentBody);
  });

  // Pull requests

  // opened
  app.on("pull_request.opened", async (context) => {
    const username_ = context.payload.issue.user.login;
    const username = context.payload.repository.owner.login;
    let message = "";
    if (username == username_) {
      message =  `Pull Request opened!🧐;`
    } else {
      message =  `Thanks for pull request ${context.payload.pull_request.number} ${username_}!🧐\n@${username} will look into it asap!😌\n"${context.payload.pull_request.title}" has been created.😴`;
    }
    const commentBody = context.issue({body: message});
    await context.octokit.issues.createComment(commentBody);
  });
  // // closed
  // app.on("pull_request.closed", async (context) => {
  //   let 

  //   // Add your comment here
  //   const commentBody = context.issue({body: message});

  //   // Post a comment on the closed pull request
  //   await context.octokit.issues.createComment(commentBody);
  // });
  // reopened
  app.on("pull_request.reopened", async (context) => {
    const username_ = context.payload.issue.user.login;
    const username = context.payload.repository.owner.login;
    let message = "";
    if (username == username_) {
      message =  `Pull Request re-opened!🧐;`
    } else {
      message =  `Thanks for re-opening pull request ${context.payload.pull_request.number} ${username_}!🧐\n@${username} will look into it asap!😌\n"${context.payload.pull_request.title}" has been re-created.😴`;
    }
    const commentBody = context.issue({body: message});
    await context.octokit.issues.createComment(commentBody);
  });
  // merged or closed
  app.on("pull_request.closed", async (context) => {
    const username_ = context.payload.issue.user.login;
    const username = context.payload.repository.owner.login;
    let message = "";
    if (username == username_) {
      message =  `Pull Request ${context.payload.pull_request.number} is now merged!🤩;`
    } else {
      message =  `Pull Request ${context.payload.pull_request.number} is now merged!🤩\nThanks @${username_}!🥳`;
    }
    if (context.payload.pull_request.merged) {
      const commentBody = context.issue({body: message});
      await context.octokit.issues.createComment(commentBody);
    } else {
      message = `Pull request ${context.payload.pull_request.number} is now closed!`;
      const commentBody = context.issue({body: message});
      await context.octokit.issues.createComment(commentBody);
    }
  });
  // edited
  app.on("pull_request.edited", async (context) => {
    const username_ = context.payload.issue.user.login;
    const username = context.payload.repository.owner.login;
    let message = "";
    if (username == username_) {
      message =  `Pull Request ${context.payload.pull_request.number} has been edited!😄;`
    } else {
      message =  `Pull Request ${context.payload.pull_request.number} has been edited!😄\nThanks @${username_}!🥳`;
    }
    const commentBody = context.issue({body: message});
    await context.octokit.issues.createComment(commentBody);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
