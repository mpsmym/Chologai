(function () {
  var NUMBER = "01717101768";
  var ids = ["fName","fPhone","fFrom","fTo","fDate","fCar"];
  var el = {}; ids.forEach(function (i) { el[i] = document.getElementById(i); });
  var preview = document.getElementById("preview");
  var wa = document.getElementById("waBtn");
  var status = document.getElementById("status");

  function build() {
    var lines = ["আসসালামু আলাইকুম, আমি গাড়ি ভাড়া নিতে চাই।"];
    if (el.fName.value.trim()) lines.push("নাম: " + el.fName.value.trim());
    if (el.fPhone.value.trim()) lines.push("ফোন: " + el.fPhone.value.trim());
    if (el.fFrom.value.trim()) lines.push("কোথা থেকে: " + el.fFrom.value.trim());
    if (el.fTo.value.trim()) lines.push("গন্তব্য: " + el.fTo.value.trim());
    if (el.fDate.value) lines.push("তারিখ: " + el.fDate.value);
    lines.push("গাড়ি: " + el.fCar.value);
    lines.push("ভাড়া ও গাড়ির তথ্য জানাবেন, ধন্যবাদ।");
    return lines.join("\n");
  }
  function refresh() {
    var msg = build();
    preview.textContent = msg;
    wa.href = "https://wa.me/88" + NUMBER + "?text=" + encodeURIComponent(msg);
  }
  ids.forEach(function (i) {
    el[i].addEventListener("input", refresh);
    el[i].addEventListener("change", refresh);
  });
  refresh();

  function say(t) {
    status.textContent = t;
    setTimeout(function () { if (status.textContent === t) status.textContent = ""; }, 3500);
  }
  function copy(text, okMsg) {
    function fallback() {
      var r = document.createRange();
      var node = preview;
      if (text === NUMBER) { node = document.querySelector("footer .big"); }
      r.selectNodeContents(node);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      say("লেখাটি নির্বাচন করা হয়েছে, এখন কপি করুন।");
    }
    try {
      navigator.clipboard.writeText(text).then(function () { say(okMsg); }, fallback);
    } catch (e) { fallback(); }
  }
  document.getElementById("copyMsg").addEventListener("click", function () { copy(build(), "মেসেজ কপি হয়েছে।"); });
  document.getElementById("copyNum").addEventListener("click", function () { copy(NUMBER, "নম্বর কপি হয়েছে।"); });
  document.getElementById("bookForm").addEventListener("submit", function (e) { e.preventDefault(); });
})();
