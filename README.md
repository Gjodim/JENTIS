# JENTIS
Cypres end-to-end tests for JENTIS

## clone repository
`gh repo clone Gjodim/JENTIS`

## install packages
run `npm install`

## run tests with Cypress runner app (UI)
- run `npx cypress open`
- follow initial setup guide
- select 'E2E Testing'
- select browser (preferably Chrome)
- click on desired test in order to run
- watch test in UI + debug info

## run tests in headless/cli mode
run scripts (headless run):
- `npm run cy:run:chrome`  -  run all
- `npm run cy:report`  -  run all with generated reports
