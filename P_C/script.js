function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

};
loco();

const tl = gsap.timeline({
    scrollTrigger:{
        trigger:`.page-1>h1`,
        scroller:`#main`,
        start:`top 3%`,
        end:`bottom top`,
        // markers:true,
        scrub:3,
    }
});
tl.to(".page-1>h1",{
    x:-100,

},'anim');
tl.to(".page-1>h2",{
    x:100,
},'anim');
tl.to('.video>video',{
    width:'65%',
},'anim');

const tl1 = gsap.timeline({
    scrollTrigger:{
        trigger:`page-1>h1`,
        scroller:`#main`,
        start:`top -110%`,
        end:`top -130%`,
        scrub:1,
        duration:1,
        delay:1,
        // stragger:true,
    }
});
tl1.to('.page-2',{
    backgroundColor:'#fff',
    color:"black"
});
tl1.to(".page2-left>h2",{
    color:'#000',

})
tl1.to(".page2-right>p",{
    color:'#000',
    
});
tl1.to(".page-2>h1",{
    color:'#000',
    
})