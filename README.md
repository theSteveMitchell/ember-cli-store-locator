# Ember-cli-store-locator

This README outlines the details of collaborating on this Ember addon.

## Installation

* `npm install ember-cli-store-locator`
* `npm install`

## Usage

* put this script in your index.html: `<script src="https://maps.googleapis.com/maps/api/js?client=gme-grouponinc2&libraries=places"></script>` (I know this is annoying, I plan to fix it!)
* somewhere in your app, `{{store-map}}`

## Why?

Every business website has a store locator.  You might call it a "store" or "dropbox" or "drug stash" or a "deal location" or a "red light camera" or anything else, but it's all the same; you want to display a list of locations on a map, with some information about them.  Google maps has the best map UI in the world (my opinion).  They also have a library for building store locators at https://github.com/googlemaps/js-store-locator.  

But their library is terrble if you want to actually extend or modify its presentation in any way.  All styling is inline, all elements are added with document.writes, it's no fun!

this ember addon will give you an easy-to-use, easy-to-extend base for your store locator.

* ALL the styling is done with simple CSS.  The first C is for "cascading", so you can change styling easily.
* Data sources are super easy to extend, modify, etc.
* You can easily customize your data fields to be displayed, filtering, search options, etc.


