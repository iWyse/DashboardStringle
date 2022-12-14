(() => {
    "use strict";
    //* Скрипт на динамическую дату честно нагуглил за минуты. Очень рад что это быстро реализовалось
    // let d = new Date;
    // let day = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    // let month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    // document.getElementById("currentDate").innerHTML = `${+d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear() + ", " + day[d.getDay()]}`;
    //* Скрипт на сворачивается бокового блока
    // const userInfo = document.querySelector(".main-user");
    // const aboutUser = document.querySelector(".about");
    // const closeUser = document.querySelector(".close-user");
    // userInfo.addEventListener("click", (() => {
    //     if (!aboutUser.classList.contains("user-open")) {
    //         aboutUser.classList.add("user-open");
    //         aboutUser.style.animation = "slideLeft 0.45s ease-in-out forwards";
    //     } else {
    //         setTimeout((() => {
    //             aboutUser.classList.remove("user-open");
    //         }), 300);
    //         aboutUser.style.animation = "slideRight 0.45s ease-in-out forwards";
    //     }
    // }));
    // closeUser.addEventListener("click", (() => {
    //     if (aboutUser.classList.contains("user-open")) {
    //         setTimeout((() => {
    //             aboutUser.classList.remove("user-open");
    //         }), 300);
    //         aboutUser.style.animation = "slideRight 0.45s ease-in-out forwards";
    //     }
    // }));
    //* Скрипт на закрытие поиска и удаление слов набранных в инпуте при нажатии на поиск
    // const searchButton = document.querySelector(".search-box__button");
    // const searchInput = document.querySelector(".search-box__input");
    // const nowDate = document.getElementById("currentDate");
    // searchButton.onclick = function(e) {
    //     searchInput.value = "";
    // };
    // document.addEventListener("click", (e => {
    //     const target = e.target;
    //     target === searchButton ? toggle() : false;
    // }));
    // function toggle() {
    //     searchInput.classList.toggle("search-box__input--active");
    //     nowDate.classList.toggle("date-block__date--active");
    // }
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    const menu = document.querySelector(".menu");
    const menuList = menu.querySelector(".menu-list");
    const menuClosed = menu.querySelector(".menu-mobile-close");
    const menuToggle = document.querySelector(".menu-mobile-toggle");
    const menuOverlay = document.querySelector(".overlay");
    menuList.addEventListener("click", (e => {
        if (!menu.classList.contains("active")) return;
        if (e.target.closest(".menu-item") || e.target.closest(".sidebar__item")) toggleMenu();
    }));
    menuToggle.addEventListener("click", (() => {
        toggleMenu();
    }));
    menuClosed.addEventListener("click", (() => {
        toggleMenu();
    }));
    menuOverlay.addEventListener("click", (() => {
        toggleMenu();
    }));
    function toggleMenu() {
        menu.classList.toggle("active");
        if (menu.classList.contains("active")) bodyLock(); else bodyUnlock();
        menuOverlay.classList.toggle("active");
    }
    window.onresize = function() {
        if (this.innerWidth > 991) if (menu.classList.contains("active")) toggleMenu();
    };
    function DynamicAdapt(type) {
        this.type = type;
    }
    DynamicAdapt.prototype.init = function() {
        const _this = this;
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
        this.arraySort(this.оbjects);
        this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
            return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }), this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        }));
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ",");
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                return item.breakpoint === mediaBreakpoint;
            }));
            matchMedia.addListener((function() {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            }));
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
        if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        } else for (let i = оbjects.length - 1; i >= 0; i--) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
    };
    DynamicAdapt.prototype.moveTo = function(place, element, destination) {
        element.classList.add(this.daClassname);
        if ("last" === place || place >= destination.children.length) {
            destination.insertAdjacentElement("beforeend", element);
            return;
        }
        if ("first" === place) {
            destination.insertAdjacentElement("afterbegin", element);
            return;
        }
        destination.children[place].insertAdjacentElement("beforebegin", element);
    };
    DynamicAdapt.prototype.moveBack = function(parent, element, index) {
        element.classList.remove(this.daClassname);
        if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
    };
    DynamicAdapt.prototype.indexInParent = function(parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    DynamicAdapt.prototype.arraySort = function(arr) {
        if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) return 0;
                if ("first" === a.place || "last" === b.place) return -1;
                if ("last" === a.place || "first" === b.place) return 1;
                return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
        })); else {
            Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return 1;
                    if ("last" === a.place || "first" === b.place) return -1;
                    return b.place - a.place;
                }
                return b.breakpoint - a.breakpoint;
            }));
            return;
        }
    };
    const da = new DynamicAdapt("max");
    da.init();
    let d = new Date;
    let day = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    let month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    document.getElementById("currentDate").innerHTML = `${+d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear() + ", " + day[d.getDay()]}`;
    const userInfo = document.querySelector(".main-user");
    const aboutUser = document.querySelector(".about");
    const closeUser = document.querySelector(".close-user");
    userInfo.addEventListener("click", (() => {
        if (!aboutUser.classList.contains("user-open")) {
            aboutUser.classList.add("user-open");
            aboutUser.style.animation = "slideLeft 0.45s ease-in-out forwards";
        } else {
            setTimeout((() => {
                aboutUser.classList.remove("user-open");
            }), 300);
            aboutUser.style.animation = "slideRight 0.45s ease-in-out forwards";
        }
    }));
    closeUser.addEventListener("click", (() => {
        if (aboutUser.classList.contains("user-open")) {
            setTimeout((() => {
                aboutUser.classList.remove("user-open");
            }), 300);
            aboutUser.style.animation = "slideRight 0.45s ease-in-out forwards";
        }
    }));
    const searchButton = document.querySelector(".search-box__button");
    const searchInput = document.querySelector(".search-box__input");
    const nowDate = document.getElementById("currentDate");
    searchButton.onclick = function(e) {
        searchInput.value = "";
    };
    document.addEventListener("click", (e => {
        const target = e.target;
        target === searchButton ? toggle() : false;
    }));
    function toggle() {
        searchInput.classList.toggle("search-box__input--active");
        nowDate.classList.toggle("date-block__date--active");
    }
    window["FLS"] = false;
    isWebp();
})();