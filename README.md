# Reduced Fares

The Reduced Fares repository houses information used within the SimpliGov platform. These documents might be style sheets, data sets, or other material that may be used for our Youth Pass program.

## Development Setup

1. Install language dependencies

   asdf install

1. Install Python packages

   pip install -r requirements.txt

1. Install Node packages

   npm install

## Building

We use [Sass][sass] to transform build our CSS files including shared common rules.

While developing, run `npm start` in the terminal and leave it running to automatically build the CSS files while you work.

Alternately, you can run `npm run build` to manually build the CSS files after making changes and before commiting your changes or deploying.

We check the built CSS files into GitHub in order to have a record of what was deployed to SimpliGov at any given time since this unfortunately a manual process at this time.

## Deploying

When deploying to SimpliGov, we should upload the appropriate CSS file from the `build/` directory.

[sass]: https://sass-lang.com
