export function useScrolled(threshold = 10) {
  const scrolled = ref(false);

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        scrolled.value = window.scrollY > threshold;
        ticking = false;
      });
      ticking = true;
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { scrolled };
}
