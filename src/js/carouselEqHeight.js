(function(){
    function eqHeight(parent_id) {
        var child = document.getElementById(parent_id).children,
            childAmount = child.length,
            boxHeight = 0,
            i = childAmount - 1;

        // Find the greatest height
        for(; i >= 0; i--) {
            if(child[i].offsetHeight && child[i].offsetHeight > boxHeight) {
                child[i].style.height = '';
                boxHeight = child[i].offsetHeight;
            }
        }
        // Apply the greatest height to all child elements while accounting for padding and borders
        for(; i >= 0; i--) {
            if(child[i].offsetHeight) {
                child[i].style.height = boxHeight + 'px';
            }
            if(child[i].offsetHeight > boxHeight) {
                child[i].style.height = boxHeight - (child[i].offsetHeight - child[i].clientHeight) + 'px';
                child[i].style.height = boxHeight - ((child[i].offsetHeight - boxHeight) + (child[i].offsetHeight - child[i].clientHeight)) + 'px';
            }
        }
    }
    eqHeight('carouselInner');
    window.onresize = function() {
        eqHeight('carouselInner');
    }
})();