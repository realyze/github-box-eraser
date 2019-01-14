$(() => {
  console.log("SCRIPT LOADED");
  $("body").on("click", 'button[type="submit"][data-details-container=".js-merge-pr"]', () => {
    console.log("clicked merge button");
    const mergeBoxSelector = "form.merge-branch-form textarea#merge_message_field";
    waitForExist(mergeBoxSelector, () => {
      $(mergeBoxSelector).text('');
    }, 1000);
  });
});

const waitForExist = (selector, fun, timeoutMs) => {
  let startedAt = Date.now();
  const interval = window.setInterval(() => {
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
