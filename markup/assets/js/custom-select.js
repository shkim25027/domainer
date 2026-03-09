/**
 * 공통 커스텀 셀렉트 (ms-wrap / ms-trigger / ms-dropdown)
 * - 단일/다중 선택 지원
 * - 동적 추가 select는 MutationObserver로 자동 초기화
 * 사용: initSelect(selectElement) 또는 공통으로 페이지 내 모든 select 자동 적용
 */
(function () {
  function initSelect(sel) {
    if (!sel || sel.nodeName !== 'SELECT') return;
    if (sel.closest('.ms-wrap') || sel.dataset.msInit) return;
    sel.dataset.msInit = '1';

    var isMultiple = sel.multiple;
    var cols = sel.dataset.cols || 5;
    var firstOpt = sel.options[0];
    var firstAsPlaceholder = firstOpt && (firstOpt.disabled || firstOpt.value === '');
    var placeholder = isMultiple
      ? (sel.getAttribute('aria-placeholder') || sel.dataset.placeholder || (firstAsPlaceholder ? firstOpt.text : '') || '선택')
      : (firstAsPlaceholder ? firstOpt.text : '');

    sel.style.display = 'none';

    var wrap = document.createElement('div');
    wrap.className = 'ms-wrap';
    if (isMultiple) wrap.classList.add('ms-wrap--multiple');
    ['select-sm', 'select-md', 'select-lg'].forEach(function (c) {
      if (sel.classList.contains(c)) wrap.classList.add(c);
    });
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'ms-trigger is-placeholder';
    trigger.textContent = placeholder;
    wrap.insertBefore(trigger, sel);

    var dropdown = document.createElement('div');
    dropdown.className = 'ms-dropdown';
    dropdown.style.setProperty('--ms-cols', cols);
    wrap.appendChild(dropdown);

    if (isMultiple) {
      var allLabel = document.createElement('label');
      allLabel.className = 'ms-all';
      var allChk = document.createElement('input');
      allChk.type = 'checkbox';
      allLabel.appendChild(allChk);
      allLabel.appendChild(document.createTextNode('[전체 선택]'));
      dropdown.appendChild(allLabel);
      var checkboxes = [];
    }

    var grid = document.createElement('div');
    grid.className = 'ms-grid';
    dropdown.appendChild(grid);

    if (isMultiple) {
      Array.from(sel.options).forEach(function (opt, i) {
        if (i === 0 && opt.value === '' && (opt.disabled || opt.hidden)) return; // placeholder 옵션은 목록에서 제외
        var label = document.createElement('label');
        label.className = 'ms-item';
        var chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.value = opt.value || opt.text;
        chk.checked = opt.selected;
        if (chk.checked) label.classList.add('is-checked');
        checkboxes.push({ chk: chk, label: label, optIndex: i });
        label.appendChild(chk);
        label.appendChild(document.createTextNode(opt.text));
        grid.appendChild(label);
        chk.addEventListener('change', syncAll);
      });

      function syncAll() {
        checkboxes.forEach(function (item) {
          sel.options[item.optIndex].selected = item.chk.checked;
          item.label.classList.toggle('is-checked', item.chk.checked);
        });
        var chks = checkboxes.map(function (i) { return i.chk; });
        var all = chks.every(function (c) { return c.checked; });
        var none = chks.every(function (c) { return !c.checked; });
        allChk.checked = all;
        allChk.indeterminate = !all && !none;
        var selected = chks.filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
        trigger.textContent = selected.length ? selected.join(', ') : placeholder;
        trigger.classList.toggle('is-placeholder', !selected.length);
      }

      allChk.addEventListener('change', function () {
        checkboxes.forEach(function (item) { item.chk.checked = allChk.checked; });
        syncAll();
      });
      syncAll();
    } else {
      function getSelectedText() {
        var idx = sel.selectedIndex;
        if (idx < 0) return placeholder;
        var opt = sel.options[idx];
        if (opt.disabled && opt.value === '') return placeholder;
        return opt.text;
      }

      Array.from(sel.options).forEach(function (opt, i) {
        if (opt.value === '' && (opt.disabled || opt.hidden)) return;
        var item = document.createElement('div');
        item.className = 'ms-option';
        if (opt.selected) item.classList.add('is-selected');
        item.textContent = opt.text;
        item.addEventListener('click', function () {
          if (opt.disabled) return;
          sel.selectedIndex = i;
          trigger.textContent = getSelectedText();
          trigger.classList.toggle('is-placeholder', opt.value === '' && opt.disabled);
          grid.querySelectorAll('.ms-option').forEach(function (el) { el.classList.remove('is-selected'); });
          item.classList.add('is-selected');
          wrap.classList.remove('is-open');
          dropdown.classList.remove('is-open');
          sel.dispatchEvent(new Event('change', { bubbles: true }));
        });
        grid.appendChild(item);
      });

      trigger.textContent = getSelectedText();
      trigger.classList.toggle('is-placeholder', getSelectedText() === placeholder);
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var opening = !wrap.classList.contains('is-open');
      document.querySelectorAll('.ms-wrap.is-open').forEach(function (w) {
        w.classList.remove('is-open');
        var d = w.querySelector('.ms-dropdown');
        if (d) d.classList.remove('is-open');
      });
      if (opening) {
        wrap.classList.add('is-open');
        dropdown.classList.add('is-open');
      }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove('is-open');
        dropdown.classList.remove('is-open');
      }
    });
  }

  window.initSelect = initSelect;

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('select').forEach(initSelect);

    // .btn-add-primary 클릭 시 추가된 select에 커스텀 셀렉트 적용
    document.body.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('.btn-add-primary')) return;
      setTimeout(function () {
        document.querySelectorAll('select:not([data-ms-init])').forEach(initSelect);
      }, 50);
    });
  });

  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        if (node.tagName === 'SELECT') initSelect(node);
        if (node.querySelectorAll) node.querySelectorAll('select').forEach(initSelect);
      });
    });
  }).observe(document.body, { childList: true, subtree: true });
})();
