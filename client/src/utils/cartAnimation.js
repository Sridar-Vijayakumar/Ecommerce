export const animateProductToCart = (sourceElement) => {
  const cart = document.getElementById("navbar-cart");
  if (!cart) return;

  cart.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.25)" },
      { transform: "scale(1)" },
    ],
    { duration: 450, delay: 350, easing: "ease-out" },
  );

  if (!sourceElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const source = sourceElement.getBoundingClientRect();
  const destination = cart.getBoundingClientRect();
  const flyingImage = sourceElement.cloneNode(true);

  Object.assign(flyingImage.style, {
    position: "fixed",
    zIndex: "100",
    pointerEvents: "none",
    margin: "0",
    left: `${source.left}px`,
    top: `${source.top}px`,
    width: `${source.width}px`,
    height: `${source.height}px`,
    borderRadius: "18px",
    objectFit: "cover",
  });
  document.body.appendChild(flyingImage);

  const animation = flyingImage.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 0.95 },
      { transform: "translate(0, -30px) scale(.65)", opacity: 0.85, offset: 0.35 },
      {
        transform: `translate(${destination.left - source.left}px, ${destination.top - source.top}px) scale(.12)`,
        opacity: 0.2,
      },
    ],
    { duration: 700, easing: "cubic-bezier(.4, 0, .2, 1)" },
  );

  animation.onfinish = () => flyingImage.remove();
  animation.oncancel = () => flyingImage.remove();
};
