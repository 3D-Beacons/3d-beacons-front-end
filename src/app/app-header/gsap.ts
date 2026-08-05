import gsap from "gsap";

export const heroAnimation = () => {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power2.out",
    },
  });

  tl.from(".logo-img", {
    opacity: 0,
    y: -20,
  })
    .from(
      ".logo-title",
      {
        opacity: 0,
        y: 20,
      },
      "-=0.3",
    )
    .from(
      ".dropdown li",
      {
        opacity: 0,
        y: 10,
        stagger: 0.08,
      },
      "-=0.3",
    );
};
