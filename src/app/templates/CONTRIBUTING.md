# How to contribute to ****CHANGE****
## Issue Tracking
**Did you find a bug?**
- Ensure the bug was not already reported by searching [Issues](****change****).
- If you are unable to find an issue addressing the problem, create a new issue following the Bug Report template.
- Leave the newly created issue in the New Issues Pipeline in Zenhub until the team has a chance to review the issue.

**Would you like to change an existing feature or add a new one?**
- Open a new feature issue in Github. Please keep the issue in the New Issues Pipeline until the team has a chance to review the proposed changes.
- When creating new feature issues:
  - Use the Feature issue template
  - If a feature spans multiple issues, be sure to add an Epic Issue as well
  - Mark any dependencies that exist between tickets
  - Keep the newly created issues in the New Issues Pipeline so the team has a chance to review the the new feature.

## Development
### Things to know before you begin
- [Flow](https://flow.org/en/docs/react/): 8 out of 10 of the [top errors in Javascript](https://rollbar.com/blog/top-10-javascript-errors/) are type errors that can be prevented by using a type system. Type checking software also aids in the maintainability of the codebase. Therefore, this project uses Flow, a static type checker.
- [React](https://reactjs.org) is the UI library.
- [GraphQL](https://graphql.org) is used for the API layer. [Apollo Client](https://www.apollographql.com/docs/react/) is used to implement the GraphQL client.
- [Redux](https://redux.js.org/) is used for some client-side data layer implementations of the application.
- [Redux Thunk](https://github.com/gaearon/redux-thunk) Redux middleware that allows Redux action creators to be functions. When an action creator returns a function the action is allowed to have side effects, like dispatching other actions (i.e. network calls).
- [React Router](https://github.com/ReactTraining/react-router) enables Dynamic Routing within components.

### Getting Started
1. Clone project and `$ cd` into the repo
2. Install dependencies: `$ yarn install`
3. Start the server: `$ yarn start`. By default the app will point to the staging API for development purposes.

### Atom Environment
The following packages may be helpful to install when working with the Atom IDE. The end result should highlight Flow and ESLint errors in the IDE.
- atom-ide-ui: Adds IDE features
- ide-flowtype: Flow support
- linter-eslint: Linter support
- sort-lines: Helps to alphabetize lists of imports/variables.
- zentabs: Allow you to keep more opened tabs than the limit.

### Testing
There are two types of tests: unit tests and integration tests.

Unit tests are located near the code they test and are in `__tests__` directories and are marked by the `.spec.js` file designation. These tests use `jest` and `enzyme` and can be run with `$ yarn test`.

End-to-End (E2E) tests spin up a copy of the client, the API, and a seeded database and run click-through tests of the application. E2E tests are located under the test directory and can be run locally with `$ yarn test:e2e:headless`

### Commit Messages
A good commit message succinctly describes the changes associated with the commit. When in doubt, start the commit message with a verb: 'Fix, Add, Create'. Use the present tense: 'Add' vs 'Added'.

### Pull Requests
 When your change is ready to be added, submit a pull request in Github. Follow the Pull Request Template to proactively catch commonly requested changes. Once the PR is submitted, the CI pipeline will check the code. The checks must pass and another developer must review the code and approve the pull request to merge.

### Git
When naming and merging branches, please use the Git Flow convention.

Git Flow is a template for using Git that reduces merge conflicts, aids in structured branch naming conventions, and imposes organization on the chaos that can occur when many people work on a single repository at the same time. The guides below serve as a good primer on Git Flow.
- [Atlassian Git Flow Guide](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Why aren't you using Git Flow?](https://jeffkreeftmeijer.com/git-flow/)
- [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

Generally, following Git Flow means you are working on a branch prepended with `feature/`, `release/`, or `hotfix/` and issuing pull requests into `develop` and `master`.

This repository uses the [rebase](https://www.atlassian.com/git/articles/git-team-workflows-merge-or-rebase) merge strategy - please **rebase** upstream changes instead of **merging** to keep the repository history clean.

Rebase as often as possible to keep code synced tightly with `develop`, solving merge conflicts before they have a chance to fester into something unmanageable.

Example:
1. New code is committed to `develop`
2. `$ git checkout develop` - checkout develop locally
3. `$ git pull origin develop` - pull remote develop changes
4. `$ git checkout feature/[branch_name]` - switch back to your branch
5. `$ git rebase develop` - rebase your branch with the changes from develop

Be sure to follow the **Golden Rule of Rebasing** - never rebase a branch other team members may be working from. This includes PR items as well as trunk branches like develop and master.

### Style Guide
This repository uses the [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript). ESLint is run as a part of the PR checks - style guide violations will block your code from being merged. You can run `$ yarn lint` to check the code for lint errors and `$ yarn fix` to have the linter automatically fix most style violations.

### Comments
This repository encourages the use of value-adding comments to the codebase. The adage 'Good code documents itself' is true - but only up to a point. Code can only tell you how; comments are used to tell you why. Understand the difference between value-add comments and trivial, repetitive comments. This is a [good guide](http://antirez.com/news/124). In PRs, requests to add clarifying comments as well as requests to remove trivial comments are both valid critiques.

## Developer Conduct
**Do:**
- Be gracious - courteous, kind, pleasant
- Bring up concerns or difference of opinion in valid forums (Slack, Github issues).
- Put the team and the product above personal vanity - developing is a team sport.
- Have patience and give team members the benefit of the doubt.
- Limit the scope of changes to keep PRs small and efficient.
- Leave the codebase better than you found it.

**Don't:**
- Engage in conduct or speech which might be considered sexist, racist, homophobic, transphobic, ableist or otherwise discriminatory or offensive in nature.
- Intimidate or Harass
- Show disrespect toward differences of opinion.
- Confuse the difference between constructive criticism and disparagement.
- Continually re-litigate an issue after a decision has been made. At a minimum, new information/data must become available before readdressing a past choice.
- "Go rogue" - Refactor or make significant changes without having the work first approved in sprint planning.

**A note on PR reviews/differences of opinion:**
Many developers can be quite opinionated on best practices. This is a good thing, but can turn destructive if not handled correctly. The best practices ascribed to in this repository will be defined and amended by the entire team; it will require some bending by all in one way or another.

Try to separate your personal feelings from the code you produce. When your code is being reviewed, don't take criticism of the code personally; we are all in this together and committed to producing a quality product and codebase. When you are reviewing someone else's code, personal criticisms are never acceptable.

The same goes for difference of opinion. Vary rarely is something the 'right' answer in all circumstances. When possible, try to understand differences of opinion in terms of underlying trade-offs - the difference probably exists because you are valuing underlying pros and cons differently.

**Finally, go slow to go fast.**
Working as a team and keeping quality high may slow you down individually, but it will allow the team to execute efficiently and consistently into the future.
