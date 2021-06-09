/* Project links with an animated arrow should play their entire arrow animation before stopping to
 * prevent the arrow from jumping to the animation end state too early. It looks smoother when the
 * arrow moves their naturally and then stop. This is impossible (as far as I know) with pure CSS,
 * so this code snippet ensures the arrow finishes its animation before stopping, even when the
 * cursor leaves too early. If JavaScript is disabled, the arrows will still animate but fall back
 * to the jumpier end state instead.
 */
!function(links){
    "use strict";
    for (var i = links.length - 1; i >= 0; i--) {
        links[i].addEventListener("mouseenter", function() {
            this.setAttribute("data-hover-state", "active");
            runAnimation(this);
        });
        links[i].addEventListener("mouseleave", function() {
            this.setAttribute("data-hover-state", "inactive");
        })
    }

    function runAnimation(element) {
        if (element.hasAttribute("data-running-interval")) {
            return;
        }
        element.setAttribute("data-running-interval", setInterval(function() {
            if (element.getAttribute("data-hover-state") == "inactive") {
                clearInterval(+element.getAttribute("data-running-interval"));
                element.removeAttribute("data-running-interval");
                element.setAttribute("data-playing-state", "inactive");
            }
        }, 400));
        element.setAttribute("data-playing-state", "active");
    }
}(document.querySelectorAll("main h3 > a"));