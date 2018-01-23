This sample application shows how you use OAuth2.0 to authenticate with the PlanGrid API and make a batch request to retrieve user profile and first page of projects.

To run locally:
1. Clone this repository using `git clone https://github.com/sophatsam/plangrid-sample-connector`.
2. Create a `.env` file in the root directory (copy/rename the existing `.env-sample` file).
3. Modify the contents of the `.env` file to include your client ID, client secret, redirect URI, and port number to use for the web server. (If running locally, ensure that you have supplied PlanGrid with a `http://localhost:PORT` address as a redirect URI)
4. Run `yarn install` to install dependencies.
5. Start your application with `node index.js`.
6. Access your application in the browser via `http://localhost:PORT`.