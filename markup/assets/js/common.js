// 상수 정의
const MOBILE_BREAKPOINT = 1025;

// 전역 변수

let scrollY;
let wrap;

// 스크린 높이 계산
function syncHeight() {
  document.documentElement.style.setProperty(
    "--window-inner-height",
    `${window.innerHeight}px`
  );
}

// mobile check
function isMobile() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

// body scroll lock
function bodyLock() {
  if (!wrap) {
    console.warn("wrap element not found");
    return;
  }
  scrollY = window.scrollY;
  document.documentElement.classList.add("is-locked");
  document.documentElement.style.scrollBehavior = "auto";
  wrap.style.top = `-${scrollY}px`;
}

// body scroll unlock
function bodyUnlock() {
  document.documentElement.classList.remove("is-locked");
  if (scrollY !== undefined) {
    window.scrollTo(0, scrollY);
  }
  if (wrap) {
    wrap.style.top = "";
  }
  document.documentElement.style.scrollBehavior = "";
}

// popup open
function popOpen(id) {
  const popup = document.getElementById(id);
  if (!popup) {
    console.warn(`Popup with id "${id}" not found`);
    return;
  }
  $("#" + id).fadeIn("fast");
  bodyLock();
}

// popup close
function popClose(obj) {
  $(obj).parents(".popup").fadeOut("fast");
  bodyUnlock();
}

// 🔹 페이지 처음 로드될 때 처let baseHref = "";
document.addEventListener("DOMContentLoaded", () => {
  wrap = document.querySelector(".wrap");
  if (!wrap) {
    console.error("Wrap element not found");
    return;
  }
  syncHeight();
  
  // 이벤트 위임: data-action 속성을 가진 요소에 대한 이벤트 처리
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;
    
    e.preventDefault();
    const action = target.getAttribute("data-action");
    const actionTarget = target.getAttribute("data-target");
    
    if (!action) return;
    
    try {
      switch (action) {
        case "toggleGroup":
          if (actionTarget) {
            toggleGroup(actionTarget);
          }
          break;
        default:
          console.warn(`Unknown action: ${action}`);
      }
    } catch (error) {
      console.error(`Error executing action ${action}:`, error);
    }
  });


  // 프로젝트 셀렉터 드롭다운 토글
  const projectSelector = document.querySelector(".project-selector");
  if (projectSelector) {
    const trigger = projectSelector.querySelector("#project-selector-trigger") || projectSelector;
    const label = projectSelector.querySelector(".project-selector-label");
    const dropdown = projectSelector.querySelector(".project-selector-dropdown");

    trigger.addEventListener("click", (e) => {
      if (dropdown?.contains(e.target)) return;
      const isOpen = projectSelector.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", isOpen);
    });

    dropdown?.addEventListener("click", (e) => {
      const option = e.target.closest("[role='option']");
      if (!option) return;
      const value = option.getAttribute("data-value") || option.textContent.trim();
      if (label) label.textContent = value;
      dropdown.querySelectorAll("[role='option']").forEach((el) => el.setAttribute("aria-selected", "false"));
      option.setAttribute("aria-selected", "true");
      projectSelector.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("click", (e) => {
      if (!projectSelector.contains(e.target)) {
        projectSelector.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // depth01 > li.has-depth > a 클릭 시 depth02 펼침/접힘
  document.querySelectorAll(".depth01 > li.has-depth > a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const li = this.parentElement;
      const isActive = li.classList.contains("active");

      // 같은 depth01 내 다른 has-depth 메뉴 닫기 (accordion)
      const depth01 = li.closest(".depth01");
      depth01.querySelectorAll(":scope > li.has-depth").forEach((item) => {
        if (item !== li) item.classList.remove("active");
      });

      li.classList.toggle("active", !isActive);
    });
  });

  // input-auto: 입력값에 따라 너비 자동 확장 (field-sizing 미지원 브라우저용)
  if (!CSS.supports?.("field-sizing", "content")) {
    const resizeInputAuto = (input) => {
      const measure = document.createElement("span");
      const style = getComputedStyle(input);
      measure.style.cssText = `
        position:absolute;visibility:hidden;white-space:pre;
        font:${style.font};letter-spacing:${style.letterSpacing};
        padding:0 ${style.paddingLeft} 0 ${style.paddingRight};
      `;
      measure.textContent = input.value || input.placeholder || "";
      document.body.appendChild(measure);
      const w = Math.max(80, measure.offsetWidth + 2);
      input.style.width = w + "px";
      document.body.removeChild(measure);
    };
    document.querySelectorAll(".input-auto").forEach((input) => {
      resizeInputAuto(input);
      input.addEventListener("input", () => resizeInputAuto(input));
    });
  }

  $("[id^=open-modal]").click(function () {
    var modalId = this.id.replace("open-", "");
    $("#" + modalId).show();
  });

  // 닫기 버튼 또는 배경 클릭 시
  $(".close").click(function () {
    $(".modal").hide();
  });
  // 🔹 모달 바깥 클릭 시 닫기
  $(document).on("click", ".modal", function (e) {
    // 클릭한 영역이 .modal-content 내부가 아닐 경우만 닫기
    if (!$(e.target).closest(".modal-content").length) {
      $(this).hide();
    }
  });
});

window.addEventListener("resize", () => {
  syncHeight();
});

window.addEventListener("scroll", () => {});

function includehtml() {
  var allElements = document.querySelectorAll("[data-include-path]");
  Array.prototype.forEach.call(allElements, function (el) {
    var includePath = el.dataset.includePath;
    var secId = el.id;
    if (includePath) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          //el.outerHTML = this.responseText;
          el.innerHTML = this.responseText;
          el.removeAttribute("data-include-path");
        }
      };
      xhttp.open("GET", includePath, false); 
      xhttp.send();
    }
  });
}

// 상위메뉴 접힘 펼침
function toggleGroup(_id) {
  var element = document.getElementById(_id);
  if (element) {
    element.classList.toggle("d-none");
    element.parentElement.classList.toggle("active");
  }
}

function updateDepthState(activeIndex) {
  const depthItems = document.querySelectorAll(".nav .depth02 li");
  depthItems.forEach((item, idx) => {
    const depth02 = item.closest(".depth02");
    let depth01 = depth02.parentElement;
    if (idx === activeIndex) {
      item.classList.add("active");
      depth02.classList.remove("d-none");
      depth01.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
