# Angular PhotoSwipe

AngularJS Wrapper directive for [PhotoSwipe](http://photoswipe.com/).


Fork of: [Angular Photoswipe](https://github.com/m00s/angular-photoswipe) [Massimiliano Sartoretto](mailto:massimilianosartoretto@gmail.com)


Installation
------------

You can choose your preferred method of installation:
* Through bower: `bower install ng-photoswipe --save`

Usage
------
Inject `ngPhotoswipe` module in your application with:

``` js
angular
  .module('myApp', ['rcPhotoswipe'])
```

and use the directive as below:

``` html
<div rc-photoswipe
     slides="slides"
     slide-selector=".my-awesome-thumbnail"
     open="isOpen"
     on-close="onGalleryClose()"
     template-url="'./myGallery.template.html'"
     options="opts"></div>
```

where `slides` is an object defining the images, and the `slideSelector` is a valid [selector](https://www.w3.org/TR/css3-selectors/#selectors) to query the gallery images.

The `open` attribute is a scope boolean that start the gallery when truthy.

The `on-close` callback will be called after the gallery closes, not surprising.

You can also provide your own `template-url` that will override the default one.

(For further infos follow the [Official docs](http://photoswipe.com/documentation/options.html))


Changelog
------
### v1.0.0 (August 9, 2017)
* Fork of ngPhotoswipe
* change template to templateUrl and load template with $templateRequest
