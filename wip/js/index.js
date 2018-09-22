((d, w) => {
    w.init = function() {
        function scroll(id) {
            d.getElementById(id).scrollIntoView({behavior:"smooth"});
        }
        
        function visible(id) {
            return (document.getElementById(id).getBoundingClientRect().x + w.innerWidth > 0);
        }
        
        // Desktop view
        // Redirect vertical scrolling to horizontal
        d.addEventListener("wheel", e => {
            if (w.innerWidth > w.innerHeight) {
                w.scrollBy({
                    left: e.deltaY*120,
                    behavior:"smooth"
                });
            }
        });
        
        // Handle rotating device
        w.addEventListener("resize", e => {
            if (w.innerWidth > w.innerHeight) {
                w.scroll({
                    top: 0
                });
            } else {
                w.scroll({
                    left: 0
                });
                // Reset parallax effects
                d.querySelectorAll("*[style]").forEach(e => {
                    e.setAttribute("style", "");
                });
            }
        });
        
        // Landing intro
        document.querySelector("section#landing div.title").setAttribute("style", "left: 0vw;transition:left 2s cubic-bezier(.19,.77,.28,1);");
        document.querySelector("section#landing div.title h1").setAttribute("style", "left: 0vw;transition:left 2s cubic-bezier(.19,.77,.28,1);");
        document.querySelector("section#landing div.title h3").setAttribute("style", "left: 0vw;transition:left 2s cubic-bezier(.19,.77,.28,1);");
        
        d.addEventListener("scroll", e => {
            if (w.innerWidth > w.innerHeight) {
                // Desktop view
                
                // Landing section parallax
                if (visible("landing")) {
                    let e = document.getElementById("landing");
                    let p = w.scrollX / w.innerWidth;
                    
                    e.getElementsByClassName("title")[0].setAttribute("style", `left: -${p*10}vw;`);
                    e.getElementsByTagName("h3")[0].setAttribute("style", `left: -${p*50}px;`);
                    
                    e.getElementsByTagName("img")[0].setAttribute("style", `transform: rotateY(-${p*150}deg);`);
                    e.getElementsByClassName("slanted-box")[0].setAttribute("style", `transform: rotateY(-${p*150}deg);`);
                }
            }
        });
    };
})(document, window);