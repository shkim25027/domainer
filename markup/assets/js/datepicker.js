/**
 * 공통 날짜 입력 (type="text" + 유효성 검사 + 숨겨진 type="date" 캘린더)
 * 사용: <input type="text" class="input-datepicker" placeholder="시작일">
 * 동적 추가 시: document.querySelectorAll('.input-datepicker').forEach(initDatepicker);
 */

(function () {
  /** 입력값이 날짜 형식인지 검사하고 input[type=date]용 YYYY-MM-DD로 변환. 변환 불가면 null */
  function parseDateForInput(val) {
    if (!val || typeof val !== 'string') return null;
    var s = val.trim().replace(/\s/g, '');
    if (!s) return null;
    var y, m, d;
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(s)) {
      var parts = s.split('-');
      y = parseInt(parts[0], 10); m = parseInt(parts[1], 10); d = parseInt(parts[2], 10);
    } else if (/^\d{4}[.\/]\d{1,2}[.\/]\d{1,2}$/.test(s)) {
      var parts = s.split(/[.\/]/);
      y = parseInt(parts[0], 10); m = parseInt(parts[1], 10); d = parseInt(parts[2], 10);
    } else if (/^\d{8}$/.test(s)) {
      y = parseInt(s.slice(0, 4), 10); m = parseInt(s.slice(4, 6), 10); d = parseInt(s.slice(6, 8), 10);
    } else if (/^\d{6}$/.test(s)) {
      y = parseInt(s.slice(0, 4), 10); m = parseInt(s.slice(4, 6), 10); d = 1;
    } else {
      return null;
    }
    if (isNaN(y) || isNaN(m) || isNaN(d) || m < 1 || m > 12 || d < 1 || d > 31) return null;
    var date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
    m = String(m); d = String(d);
    return y + '-' + (m.length === 1 ? '0' + m : m) + '-' + (d.length === 1 ? '0' + d : d);
  }

  /** type="text" 날짜 입력: 유효성 검사 + 숨겨진 type="date"로 캘린더 열기 */
  function initDatepicker(textInput) {
    var placeholder = textInput.getAttribute('placeholder') || textInput.getAttribute('aria-label') || '';
    var raw = (textInput.value || '').trim();
    var normalized = parseDateForInput(raw);
    if (normalized) {
      textInput.value = normalized.replace(/-/g, '.');
    } else if (raw) {
      textInput.value = raw;
    }

    var wrap = document.createElement('div');
    wrap.className = 'datepicker-wrap';
    textInput.parentNode.insertBefore(wrap, textInput);
    wrap.appendChild(textInput);

    var nativeInput = document.createElement('input');
    nativeInput.type = 'date';
    nativeInput.className = 'datepicker-native';
    nativeInput.setAttribute('aria-hidden', 'true');
    nativeInput.tabIndex = -1;
    if (normalized) nativeInput.value = normalized;
    wrap.appendChild(nativeInput);

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'datepicker-trigger';
    trigger.setAttribute('aria-label', '캘린더 열기');
    wrap.appendChild(trigger);

    function openPicker() {
      nativeInput.focus();
      if (typeof nativeInput.showPicker === 'function') {
        try { nativeInput.showPicker(); } catch (e) {}
      }
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var v = (textInput.value || '').trim();
      if (v) {
        var n = parseDateForInput(v);
        if (n) nativeInput.value = n;
      }
      openPicker();
    });

    nativeInput.addEventListener('change', function () {
      if (nativeInput.value) {
        textInput.value = nativeInput.value.replace(/-/g, '.');
      }
    });

    textInput.addEventListener('blur', function () {
      var v = (textInput.value || '').trim();
      var n = parseDateForInput(v);
      if (n) {
        textInput.value = n.replace(/-/g, '.');
        nativeInput.value = n;
      }
    });
  }

  window.parseDateForInput = parseDateForInput;
  window.initDatepicker = initDatepicker;

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.input-datepicker').forEach(initDatepicker);
  });
})();
