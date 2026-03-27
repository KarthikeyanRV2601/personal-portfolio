document.querySelectorAll('[data-accordion] .acc-head').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.acc-item');
    const wrap = button.closest('[data-accordion]');

    wrap.querySelectorAll('.acc-item').forEach((node) => {
      if (node !== item) node.classList.remove('active');
    });

    item.classList.toggle('active');
  });
});
