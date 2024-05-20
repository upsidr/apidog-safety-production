# overview
This is api-dog, a chrome extension to secure the Production environment.
Whenever the API is executed in the Production environment, a dialog is displayed.

- Guaranteed node version 22.1.0.  
- To simplify deployment, dist is included in git and managed.

# how to use
1. Import dist folder from chrome extension

https://github.com/upsidr/apidog-safety-production/assets/36062615/bbfa9fd2-dcfd-41e4-8773-2ac15d104758

In both the design and debug tabs, the DOM changes are detected so that the dialog is displayed in the production environment and not displayed in other environments.



# dev
`npm run dev`

# production
`npm run build`

