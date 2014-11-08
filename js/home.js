$(function () {

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

  var $examples = $("section.example div");
  var $exampleSelectContainer = $("<div>").addClass("select-wrap");
  var $exampleSelect = $("<select/>");
  $exampleSelectContainer.append($exampleSelect);

  $examples.each(function () {
    var title = $(this).find("h4").text();
    $exampleSelect.append("<option>" + title + "</option>");
  });

  $exampleSelect.on("change", function (e) {
    $examples.removeClass("current");
    $examples.eq(this.selectedIndex).addClass("current");
  });

  $("section.example").prepend($exampleSelectContainer);

});
