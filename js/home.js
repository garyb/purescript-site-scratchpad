$(function () {

  var $window = $(window);

  var $menuButton = $("nav h2");

  $menuButton.on("click", function () {
    var $body = $(document.body);
    $body.toggleClass("show-nav");
    $menuButton.text($body.is(".show-nav") ? "Close" : "Menu");
  });

  // --------------------------------------------------------------------------

  var $featureList = $("section.features ul");
  var $more = $("<li class=\"moreless\">More&hellip;</li>");

  $more.on("click", function () {
    $featureList.toggleClass("expanded");
    $more.html($featureList.is(".expanded") ? "&hellip;Less" : "More&hellip;");
    // TODO: scroll to top of feature list if off screen after collapse
  });

  $featureList.append($more);

  // --------------------------------------------------------------------------

  var $examples = $("section.example div.example");
  var $prev = $("section.example #prev-example");
  var $next = $("section.example #next-example");

  var go = function (delta) {
    return function (e) {
      var index = $examples.filter(".current").index();
      var nextIndex = (index - 1 + delta) % $examples.length;

      var origSize = $examples.filter(".current").height();
      var origScroll = $window.scrollTop();

      $examples.removeClass("current");
      $examples.eq(nextIndex).addClass("current");

      var newSize = $examples.filter(".current").height();
      $window.scrollTop(newSize - origSize);

      e.preventDefault();
    };
  };

  $prev.on("click", go(-1));
  $next.on("click", go(1));

});
