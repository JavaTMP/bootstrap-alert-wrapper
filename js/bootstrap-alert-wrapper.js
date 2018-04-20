(function (root, factory) {
    "use strict";
    // CommonJS module is defined
    if (typeof module !== "undefined" && module.exports) {
        module.exports = factory(require("jquery"), require("bootstrap"));
    }
// AMD module is defined
    else if (typeof define === "function" && define.amd) {
        define("bootstrap-alert-wrapper", ["jquery", "bootstrap"], function ($) {
            return factory($);
        });
    } else {
// planted over the root!
        root.BootstrapAlertWrapper = factory(root.jQuery);
    }

}(this, function ($) {
    "use strict";

    var defaults = {};

// The actual plugin constructor
    function AlertWrapperFactory(options) {
        this.options = $.extend({}, defaults, options);
        this.defaults = defaults;
    }

    AlertWrapperFactory.prototype.createAlert = function (options) {

        options = $.extend(true, {
            container: "", // alerts parent container(by default placed after the page breadcrumbs)
            place: "append", // "append" or "prepend" in container
            type: 'success', // alert's type
            message: "", // alert's message
            close: true, // make alert closable
            reset: true, // close all previouse alerts first
            focus: true, // auto scroll to the alert after shown
            closeInSeconds: 0, // auto close after defined seconds
            icon: "", // put icon before the message
            offset: 0
        }, options);

        var id = getUniqueID("alertAuto");

        var html = '<div id="' + id + '" class="custom-alerts alert alert-' + options.type + '">'
                + (options.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"><span aria-hidden="true">×</span></button>' : '')
                + (options.icon !== "" ? '<i class="' + options.icon + '"></i>  ' : '')
                + options.message + '</div>';

        if (options.reset) {
            $('.custom-alerts').remove();
        }

        if (options.place === "append") {
            $(options.container).append(html);
        } else {
            $(options.container).prepend(html);
        }

        if (options.focus) {
            scrollTo($('#' + id), options.offset);
        }

        if (options.closeInSeconds > 0) {
            setTimeout(function () {
                $('#' + id).remove();
            }, options.closeInSeconds * 1000);
        }

        return id;
    };

    function scrollTo(el, offset, container) {
        var pos = (el && el.length > 0) ? el.offset().top : 0;
        var actuallContainer = !!container ? container : "html,body";
        pos = pos - el.height() - offset;
        $(actuallContainer).animate({
            scrollTop: pos
        }, 'slow');
    }

    function uuid() {
        var uuid = "", i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += "-";
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }

    var getUniqueID = function (prefix) {
        return prefix + "-" + new Date().getTime() + "-" + uuid();
    };

    return new AlertWrapperFactory();
}));
