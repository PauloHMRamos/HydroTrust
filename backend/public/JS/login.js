  window.addEventListener('unload', function () {
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.value = '';
    }
  });

