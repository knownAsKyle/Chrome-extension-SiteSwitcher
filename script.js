(function() {
    /*domains*/
    var dropdownOptions = ["caller", "commercialappeal", "courierpress", "thegleaner", "naplesnews", "tcpalm", "knoxnews", "vcstar", "timesrecordnews", "reporternews", "independentmail", "kitsapsun", "kpbj", "gosanangelo", "redding", "jsonline", "manual..."];
    /*
    	arr - list of domains
    	return formatted array of objs
    */
    function getDropDownOptions(arr) {
        var temp = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            temp.push(getNewDropDownOptionObject(arr[i]));
        }
        return temp;
    }

    function getNewDropDownOptionObject(url) {
        return {
            "url": url
        };
    }

    function init() {
        if (checkIfMenuExists()) {
            buildMenu();
            addControl();
            setCheckBoxes();
        }
    }

    function checkIfMenuExists() {
        if (document.getElementById("cbp-spmenu-s3")) {
            setCheckBoxes();
            return false;
        }
        return true;
    }

    function buildMenu() {
        var nav = document.createElement("nav");
        nav.id = "cbp-spmenu-s3";
        nav.className = "cbp-spmenu cbp-spmenu-horizontal cbp-spmenu-top";
        nav.appendChild(buildLaunchButton());
        nav.appendChild(buildDropDown(getDropDownOptions(dropdownOptions)));
        var wrapper = document.createElement("div");
        wrapper.className = "checkBoxWrapper";
        nav.appendChild(buildCheckBox(wrapper, {
            "name": "Dev"
        }));
        nav.appendChild(buildCheckBox(wrapper, {
            "name": "Stage"
        }));
        nav.appendChild(buildCheckBox(wrapper, {
            "name": "Mobile"
        }));
        document.body.appendChild(nav);
    }

    function setCheckBoxes() {
        if (location.search.match("mobile") || window.location.host.substring(0, 1) === 'm') {
            var cbM = document.getElementById("switch_Mobile");
            cbM.checked = true;
        }
        if (location.hostname.match("dev".toLowerCase())) {
            var d = document.getElementById("switch_Dev");
            d.checked = true;
        }
        if (location.hostname.match("stage".toLowerCase())) {
            var s = document.getElementById("switch_Stage");
            s.checked = true;
        }
    }

    function buildLaunchButton() {
        var launchButton = document.createElement("button");
        launchButton.id = "launchPageButton";
        launchButton.appendChild(document.createTextNode("Go"));
        launchButton.addEventListener("click", handleLaunchClick);

        function handleLaunchClick(e) {
            var dd = document.getElementById("switcher_dropdown");
            var target = dd.options[dd.options.selectedIndex].value;
            var newUrl = null;
            if (target === "manual...") {
                var newLoc = prompt("Enter Url you wish to go to (including all prefixes (dev, stage, etc...))");
                if(newLoc)window.location.assign(newLoc);
            } else {
                var start = "http://www.",
                    end = ".com";
                if (document.getElementById("switch_Dev").checked) {
                    start = "http://dev.www.";
                }
                if (document.getElementById("switch_Stage").checked) {
                    start = "http://stage.www.";
                }
                if (document.getElementById("switch_Mobile").checked) {
                    if (target === "jsonline") {
                        start = "http://m.";
                    }
                    if (target === "jsonline" && start === "http://dev.www.") {
                        start = "http://dev.m.";
                    }
                    if (target === "jsonline" && start === "http://stage.www.") {
                        start = "http://stage.m.";
                    }
                    end = (target === "jsonline") ? end : (end + "?d=mobile");
                }
                target = start + target + end;
                window.location.assign(target);
            }
        }
        return launchButton;
    }

    function buildDropDown(listOfOptions) {
        var span = document.createElement("span");
        var selectWrapper = document.createElement("div");
        selectWrapper.className = "select_style";
        var select = document.createElement("select");
        select.id = "switcher_dropdown";
        for (var i = 0; i < listOfOptions.length; i++) {
            var option = document.createElement("option");
            option.value = listOfOptions[i].url;
            option.text = listOfOptions[i].url;
            if (location.hostname.match(listOfOptions[i].url)) {
                option.selected = "selected";
            }
            select.appendChild(option);
        }
        select.addEventListener('change', handleSelectBoxChange);

        function handleSelectBoxChange(e) {
            var target = this.options[this.options.selectedIndex].value;
            if (target === "manual...") {
                var newLoc = prompt("Enter Url you wish to go to (including all prefixes (dev, stage, etc...))");
                if(newLoc)window.location.assign(newLoc);
            } else {
                var start = "http://www.",
                    end = ".com";
                if (document.getElementById("switch_Dev").checked) {
                    start = "http://dev.www.";
                }
                if (document.getElementById("switch_Stage").checked) {
                    start = "http://stage.www.";
                }
                if (document.getElementById("switch_Mobile").checked) {
                    if (target === "jsonline") {
                        start = "http://m.";
                    }
                    if (target === "jsonline" && start === "http://dev.www.") {
                        start = "http://dev.m.";
                    }
                    if (target === "jsonline" && start === "http://stage.www.") {
                        start = "http://stage.m.";
                    }
                    end = (target === "jsonline") ? end : (end + "?d=mobile");
                }
                target = start + target + end;
                window.location.assign(target);
            }
        }
        selectWrapper.appendChild(select);
        selectWrapper.appendChild(span);
        return selectWrapper;
    }

    function buildHamburgerThing() {
        var toggler = document.createElement("div");
        toggler.id = "nav-icon3";
        for (var i = 0; i < 4; i++) {
            var span = document.createElement("span");
            toggler.appendChild(span);
        }
        return toggler;
    }

    function addControl() {
        var button = document.createElement("button");
        button.id = "showTop";
        button.appendChild(buildHamburgerThing());
        document.body.appendChild(button);
        var menuTop = document.getElementById('cbp-spmenu-s3'),
            showTop = document.getElementById('showTop');
        hamburgerAnimate = document.getElementById('nav-icon3');
        showTop.addEventListener("click", handleMenuToggleClick);

        function handleMenuToggleClick(e) {
            console.dir(this);
            toggleMe(this, "active");
            toggleMe(menuTop, "cbp-spmenu-open");
            toggleMe(hamburgerAnimate, "open");
            var top = (this.className === " active") ? "50" : "0";
            this.setAttribute("style", "top: " + top + "px");
        }
    }

    function toggleMe(ele, className) {
        var temp = ele.classList.contains(className) ? false : className;
        if (temp) {
            return ele.className += " " + temp;
        } else {
            return ele.classList.remove(className);
        }
    }

    function buildCheckBox(parent, options) {
        options = options || {};
        options.name = options.name || "Dev";
        var modeDev = document.createElement("input");
        modeDev.type = "checkbox";
        modeDev.name = "switch_";
        modeDev.id = "switch_" + options.name;
        modeDev.className = "css-checkbox";
        modeDev.addEventListener("click", function() {
            if (this.checked && this.id !== "switch_Mobile") {
                var allChecks = document.getElementsByClassName("css-checkbox");
                for (var i = 0; i < allChecks.length; i++) {
                    if (allChecks[i] !== this && allChecks[i].id !== "switch_Mobile") {
                        allChecks[i].checked = false;
                    }
                }
            }
        });
        var modeDevLbl = document.createElement("label");
        modeDevLbl.htmlFor = modeDev.id;
        modeDevLbl.className = "css-label";
        modeDevLbl.appendChild(document.createTextNode(options.name));
        parent.appendChild(modeDev);
        parent.appendChild(modeDevLbl);
        return parent;
    }
    /*CALL INIT*/
    init();
})();