# ImageAnalyserAngularGcp

Upload an image file and get hashtags automatically generated for your social media feed!
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deploying to Google Cloud Platform

* Build the project: `$ ng build --prod`
* Go to dist folder and rename image-analyser-angular-gcp folder to dist: `$ mv image-analyser-angular-gcp/ dist`
* Create a new GCP project called `my-image-analyser-angular`
* Create a Google Storage bucket called `my-image-analyser-angular`
* Upload `app.yaml` and the child `dist/` folder to the bucket
* Use Google Shell and run these commands:
  * `$ mkdir my-image-analyser-angular`
  * `$ gsutil rsync -r gs://my-image-analyser-angular ./my-image-analyser-angular`
* Lastly, deploy the app:
  * `$ cd my-image-analyser-angular/`
  * `$ gcloud app deploy`
  * Choose region eg. `australia-southeast1`

