# Shardus.com — Shardus's Official Website

Source code for the Shardus website, published at [Shardus.com](https://shardus.com/).

## Getting Started

First, install Ruby and Ruby Gems on your machine.

Verify that Ruby Gems are installed by running:

```
gem --version
```

Make sure this yields a result such as `3.0.9`.

Then, install Jekyll locally by running:

```
gem install jekyll
```

Next, install bundler:

```
gem install bundler
```

Then, clone this repo and enter into it in the command line. Now, install dependencies by running:

```
bundle install
```

Finally, run a local version of the site by running:

```
bundle exec jekyll serve
```

Open a the local server at [http://localhost:4000/](http://localhost:4000/) and reload the page to view your re-generated changes in real-time. Note: changes to `_config.yml` will not update until you restart the local server with the most recent command listed previously.

View the [Jekyll documentation](https://jekyllrb.com/) for more info on setting up a Jekyll environment like the one used on this repo.

## Technologies

The site is written in Jekyll and published automatically with GitHub pages. There currently no CI/CD in this repo, so any commits pushed to the main branch will be automatically added to the public site.

The general config data for the site is located at `_config.yml` and in the `_data/` directory.

For JS, the site uses jQuery along with a couple of useful plugins for various features. For CSS, we're using a couple of additional libraries as well as Bootstrap. Most of these additional CSS libraries are minimized, and will have the `.min.css` extension.

One particular plugin, the jQuery Toast Plugin, is installed with Node.js and is located in the `node_modules` directory.

CSS, JS, images, and other assets are located in the `assets/` directory.

When writing additional CSS and JS for the site, edit `assets/css/our-styles.css` and `assets/js/scripts.js` respectively.

## Includes & Layouts

There are couple of includes, primarily for the main reused components like the footer, header, scripts, and `<head>`.

The only layout is `default`, which encloses all of the content within the structure of the header and footer.

## Shardus Docs

Documentation is currently hosted on GitLab and is not on the main site. Currently, the docs link and the `/docs/` path are directed to the GitLab docs site.
