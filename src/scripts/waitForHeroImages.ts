async function waitForHeroImagesToLoad() {
  const heroImages = Array.from(document.querySelectorAll('img[fetchpriority="high"]'));
  if (!heroImages.length) return;

  document.body.classList.add('loading');
  document.body.classList.remove('loaded');

  await Promise.all(
    heroImages.map(img => {
      const image = img as HTMLImageElement;
      if (image.complete) {
        return image.decode().catch(() => {});
      } else {
        return new Promise<void>(resolve => {
          image.onload = () => {
            image.decode().catch(() => {}).finally(() => resolve());
          };
          image.onerror = () => resolve();
        });
      }
    })
  );

  sessionStorage.setItem('imagesLoaded', 'true');
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');
}

if (sessionStorage.getItem('imagesLoaded')) {
  document.body.classList.add('loaded');
} else {
  waitForHeroImagesToLoad();
}

document.addEventListener('astro:after-swap', () => {
  waitForHeroImagesToLoad();
});

document.addEventListener('astro:transition-cancel', () => {
  if (!sessionStorage.getItem('imagesLoaded')) {
    document.body.classList.add('loading');
    document.body.classList.remove('loaded');
  }
});