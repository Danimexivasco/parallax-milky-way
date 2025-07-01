 const backToTopBtn = document.querySelector(".backToTop");
  const wrapperElement = document.querySelector(".wrapper");

  backToTopBtn?.addEventListener("click", () => {
    wrapperElement?.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  })