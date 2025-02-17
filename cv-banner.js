_cv = {
    info: {
        "en-GB": {
            title:"There is an ongoing outbreak of COVID-19",
            url: "https://www.nhs.uk/conditions/coronavirus-covid-19",
            description: "Learn more about how you can protect yourself and others"
        },
        "en-US": {
            title:"There is an ongoing outbreak of COVID-19",
            url: "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
            description: "Learn more about how you can protect yourself and others"
        },
        "zh-CN": {
            title:"COVID-19疫情已经开始",
            url: "https://www.chinacdc.cn/jkzt/crb/zl/szkb_11803/",
            description: "了解如何保护自己和他人"
        }
    },

    body: document.getElementsByTagName("body")[0],
    id: "cv-banner",

    getInfo: function(lang) {
        lang = {
            "de": "de-DE",
            "en": "en-GB",
            "es": "es-ES",
            "pt": "pt-PT",
            "zh": "zh-CN"
        }[lang] || lang;

        var lookup = this.info[lang];
        if (!lookup) {
            this.log("Language unavailable, defaulting to en-GB", true);
            lookup = this.info["en-GB"];
        }
        return lookup;
    },

    checkCookie: function() {
        return document.cookie && document.cookie.indexOf("cvBannerCookie") != -1;
    },
    
    setCookie: function() {
        var d = new Date(), days = 15;
        d.setTime(d.getTime() + (days*86400000)); // Calculate expiry time
        var str = "cvBannerCookie; expires="+d.toUTCString() + ";";
        // console.log(str);
        document.cookie = str;
    },
    
    hide: function() {
        var b = document.getElementById(this.id);
        b.style.display = "none";
        this.setCookie();
    },

    display: function(lang) {
        if (this.checkCookie()) return; // If cookie exists, don't draw

        var i  = this.getInfo(lang);
    
        var div = document.createElement("div"), 
            h1 = document.createElement("h1"),
            p = document.createElement("p"),
            a = document.createElement("a"),
            close = document.createElement("i");

        h1.innerText = i.title;
        a.innerText = i.description;
        a.href = i.url; 
        p.appendChild(a);

        close.innerText = "x";
        close.addEventListener("click", this.hide.bind(this));

        div.appendChild(h1);
        div.appendChild(p);
        div.appendChild(close);
        div.id = this.id;

        this.style();
        this.body.appendChild(div);
    },

    style: function() {
        var s = document.createElement("style");
        s.type = "text/css";
        s.innerText = "\
            body {margin-left:0;} \
            #cv-banner {background:#000; color:#FFF; position:fixed; top:0; width:100%; padding:1.5rem; font-family:Arial,sans-serif;} \
            #cv-banner a {color: firebrick;} \
            #cv-banner i {font-style: bold !important; position: fixed; top:.5rem; right:.5rem; cursor:pointer;} \
            #cv-banner i:hover {color: firebrick;} \
        ";
        this.body.appendChild(s);
    },

    log: function(msg, e=false) {
        if (e) console.warn("CV: "+msg);
        else console.log("CV: "+msg);
    }
};

// _cv.display("en-gb");