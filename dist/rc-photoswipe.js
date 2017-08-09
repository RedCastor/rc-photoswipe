"format amd";

(function() {
    "use strict";
    function rcPhotoswipe(angular, Photoswipe) {
        rcPhotoswipeDirective.$inject = [ "$compile", "$templateRequest" ];
        function rcPhotoswipeDirective($compile, $templateRequest) {
            function linkFn(scope, iElement, iAttrs) {
                var startGallery = function() {
                    var pswpElement = document.querySelectorAll(".pswp")[0];
                    if (angular.isUndefined(scope.options.getThumbBoundsFn) && angular.isDefined(scope.slideSelector)) {
                        scope.options = angular.merge({}, {
                            getThumbBoundsFn: function(index) {
                                var thumbnail = document.querySelectorAll(scope.slideSelector)[index];
                                var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                                var rect = thumbnail.getBoundingClientRect();
                                return {
                                    x: rect.left,
                                    y: rect.top + pageYScroll,
                                    w: rect.width
                                };
                            }
                        }, scope.options);
                    }
                    scope.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default || false, scope.slides, scope.options);
                    scope.gallery.init();
                    scope.item = scope.gallery.currItem;
                    console.log(scope.gallery);
                    scope.gallery.listen("destroy", function() {
                        scope.safeApply(function() {
                            (scope.onClose || angular.noop)();
                        });
                    });
                    scope.gallery.listen("afterChange", function() {
                        scope.safeApply(function() {
                            scope.item = scope.gallery.currItem;
                        });
                    });
                };
                function renderTemplate(_templatePath) {
                    if (angular.isDefined(_templatePath) && _templatePath !== "$NONE") {
                        $templateRequest(_templatePath).then(function(html) {
                            var template = angular.element(html);
                            iElement.append($compile(template)(scope));
                        });
                    }
                    scope.$broadcast("rcPhotoswipe.templateRendered");
                }
                var templatePath = scope.templateUrl || "rc-photoswipe.tpl.html";
                renderTemplate(templatePath);
                scope.$watch("templateUrl", function() {
                    renderTemplate(scope.templateUrl);
                });
                scope.start = function() {
                    scope.open = true;
                    startGallery();
                };
                scope.$watch("open", function(nVal, oVal) {
                    console.log(nVal);
                    console.log(oVal);
                    if (nVal !== oVal) {
                        if (nVal) {
                            startGallery();
                        }
                    } else if (!nVal && scope.gallery) {
                        scope.gallery.close();
                        scope.gallery = null;
                    }
                });
                scope.safeApply = function(fn) {
                    var phase = this.$root.$$phase;
                    if (phase === "$apply" || phase === "$digest") {
                        if (fn && typeof fn === "function") {
                            fn();
                        }
                    } else {
                        this.$apply(fn);
                    }
                };
                scope.$on("destroy", function() {
                    scope.gallery = null;
                });
            }
            return {
                restrict: "AE",
                replace: true,
                scope: {
                    open: "=",
                    options: "=",
                    slides: "=",
                    slideSelector: "@",
                    templateUrl: "@",
                    onClose: "&"
                },
                link: linkFn
            };
        }
        return angular.module("rcPhotoswipe", []).directive("rcPhotoswipe", rcPhotoswipeDirective);
    }
    if (typeof define === "function" && define.amd) {
        define([ "angular", "photoswipe" ], rcPhotoswipe);
    } else if (typeof module !== "undefined" && module && module.exports) {
        rcPhotoswipe(angular, require("photoswipe"));
        module.exports = "rcPhotoswipe";
    } else {
        rcPhotoswipe(angular, (typeof global !== "undefined" ? global : window).Photoswipe);
    }
})();

angular.module("rcPhotoswipe").run([ "$templateCache", function($templateCache) {
    $templateCache.put("rc-photoswipe.tpl.html", '<div>\n  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\n    <div class="pswp__bg"></div>\n    <div class="pswp__scroll-wrap">\n\n        <div class="pswp__container">\n            <div class="pswp__item"></div>\n            <div class="pswp__item"></div>\n            <div class="pswp__item"></div>\n        </div>\n\n        <div class="pswp__ui pswp__ui--hidden">\n            <div class="pswp__top-bar">\n\n                <div class="pswp__counter"></div>\n\n                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n\n                <button class="pswp__button pswp__button--share" title="Share"></button>\n\n                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\n\n                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n\n                <div class="pswp__preloader">\n                    <div class="pswp__preloader__icn">\n                      <div class="pswp__preloader__cut">\n                        <div class="pswp__preloader__donut"></div>\n                      </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\n                <div class="pswp__share-tooltip"></div>\n            </div>\n\n            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">\n            </button>\n\n            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">\n            </button>\n\n            <div class="pswp__caption">\n                <div class="pswp__caption__center"></div>\n            </div>\n        </div>\n    </div>\n  </div>\n</div>\n');
} ]);
//# sourceMappingURL=rc-photoswipe.js.map
