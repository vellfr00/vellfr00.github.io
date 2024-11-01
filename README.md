# Francesco Velluto | Portfolio

My personal portfolio, built with React and hosted on GitHub Pages.

## Build and Deployment

Build and Deployment on GitHub Pages is done automatically by GitHub Actions. The workflow is triggered on push to the `main` branch.
The branch `gh-pages` is used to deploy the website.

## Local Development with Docker

Website can be run locally in a Jekyll container that replicates the GitHub Pages environment.
Simply run:
```bash
npm run test-local-windows
```

Steps to perform to run manually the website locally:
1. Clear the local `build` directory
2. Make sure to have in local `public/api__cache` folder the latest data from the APIs
3. Build the React app with command:
```bash
npm run build
```
4. Move to the `build` directory
5. Build the website with command:
```bash
docker run -v ${PWD}:/site bretfisher/jekyll new . --force
```
6. Start the Jekyll server with command:
```bash
docker run -p 4000:4000 -v ${PWD}:/site bretfisher/jekyll-serve
```
7. Open the website at `http://localhost:4000`