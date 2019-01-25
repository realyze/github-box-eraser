$(() => {
  $("body").on("click", 'button[type="submit"][data-details-container=".js-merge-pr"]', () => {
    const mergeBoxSelector = "form.merge-branch-form textarea#merge_message_field";
    waitForExist(mergeBoxSelector, () => {
      console.log("Merge box found => Erasing contents...");
      $(mergeBoxSelector).text('');
    }, 1000);
  });
  $("body").on("click", 'button[type="submit"].js-merge-commit-button', () => {
    const retryButtonSelector = 'button[type="button"].js-merge-box-try-again:visible';
    waitForExist(retryButtonSelector, () => {
      console.log("Retry button found => changing...");
      const $button = $(retryButtonSelector);
      $button.text('Reload page');
      $button.on('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        location.reload();
        return false;
      });
    }, 10000);
  })
});

const waitForExist = (selector, fun, timeoutMs) => {
  let startedAt = Date.now();
  const interval = window.setInterval(() => {
    console.log('running');
    if (Date.now() - startedAt >= timeoutMs) {
      window.clearInterval(interval);
      return;
    }
    const exists = $(selector).length > 0;
    if (exists) {
      window.clearInterval(interval);
      fun();
      return;
    }
  }, 25);
};
