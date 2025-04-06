!function() {
    var e = {
        6274: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.apiVersion = "v0.1"
        },
        1644: function(e, t) {
            "use strict";
            function n(e, t, n) {
                try {
                    var i;
                    r({
                        error: e,
                        context: t,
                        shopId: o() || (null === (i = window.Shopify) || void 0 === i ? void 0 : i.shop),
                        notes: n
                    })
                } catch (e) {}
            }
            function o() {
                try {
                    const e = document.getElementById("shopify-features").textContent;
                    return JSON.parse(e).shopId
                } catch (e) {
                    return null
                }
            }
            function r(e) {
                const t = new XMLHttpRequest;
                t.open("POST", "https://notify.bugsnag.com/", !0),
                t.setRequestHeader("Content-Type", "application/json"),
                t.setRequestHeader("Bugsnag-Api-Key", "95ba910bcec4542ef2a0b64cd7ca666c"),
                t.setRequestHeader("Bugsnag-Payload-Version", "5");
                const n = function(e) {
                    const t = (n = e.error).stackTrace || n.stack || n.description || n.name;
                    var n;
                    const [o,r] = (t || "unknown error").split("\n")[0].split(":");
                    return JSON.stringify({
                        payloadVersion: 5,
                        notifier: {
                            name: "ConsentTrackingAPI",
                            version: "latest",
                            url: "-"
                        },
                        events: [{
                            exceptions: [{
                                errorClass: (o || "").trim(),
                                message: (r || "").trim(),
                                stacktrace: [{
                                    file: "consent-tracking-api.js",
                                    lineNumber: "1",
                                    method: t
                                }],
                                type: "browserjs"
                            }],
                            context: e.context || "general",
                            app: {
                                id: "ConsentTrackingAPI",
                                version: "latest"
                            },
                            metaData: {
                                request: {
                                    shopId: e.shopId,
                                    shopUrl: window.location.href
                                },
                                device: {
                                    userAgent: window.navigator.userAgent
                                },
                                "Additional Notes": e.notes
                            },
                            unhandled: !1
                        }]
                    })
                }(e);
                t.send(n)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.reportError = n,
            t.sendBugsnagXhr = r,
            t.withBugsnag = function(e) {
                return (...t) => {
                    try {
                        return e(...t)
                    } catch (e) {
                        throw e instanceof TypeError || n(e),
                        e
                    }
                }
            }
        },
        1148: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(5730)
              , r = n(5732)
              , i = n(7249)
              , a = n(1644)
              , s = n(8740)
              , c = n(6274)
              , u = n(7973);
            function d() {
                return o.haveMarketingConsent()
            }
            function p() {
                return o.haveSaleOfDataConsent()
            }
            function l() {
                const e = {}
                  , t = r.getCMPConsentValues();
                for (const n of Object.keys(t))
                    e[r.transformKeyToDisplayName(n)] = r.transformConsentToDisplaySchema(t[n]);
                return e
            }
            function _(e, t) {
                const n = new s.Monorail;
                return n.produce("setTrackingConsent"),
                "object" == typeof e && e.headlessStorefront && !e.storefrontAccessToken ? (u.logger.warn("Headless consent has been updated. Please read shopify.dev/docs/api/customer-privacy to integrate."),
                n.produce("setTrackingConsent-Headless"),
                r.setStorefrontApiTrackingConsent(e, t || ( () => {}
                ))) : o.setTrackingConsent(e, t)
            }
            t.analyticsProcessingAllowed = function() {
                return o.haveAnalyticsConsent()
            }
            ,
            t.currentVisitorConsent = l,
            t.marketingAllowed = d,
            t.preferencesProcessingAllowed = function() {
                return o.havePreferencesConsent()
            }
            ,
            t.saleOfDataAllowed = p,
            t.setTrackingConsent = _,
            t.shopifyConsentAPI = function(e={
                useBugsnagReporting: !1,
                useInstrumentation: !1
            }) {
                return ( ({useBugsnagReporting: e, useInstrumentation: t}) => {
                    r.getCCPAConsentValue() != i.ConsentValues.DECLINED && !1 === o.GPCSignal() && o.setCCPAConsent(!1, ( () => !1));
                    const n = {
                        getTrackingConsent: o.getTrackingConsent,
                        setTrackingConsent: _,
                        userCanBeTracked: o.userCanBeTracked,
                        getRegulation: o.getRegulation,
                        isRegulationEnforced: o.isRegulationEnforced,
                        getShopPrefs: o.getShopPrefs,
                        shouldShowGDPRBanner: o.shouldShowGDPRBanner,
                        userDataCanBeSold: o.userDataCanBeSold,
                        setCCPAConsent: o.setCCPAConsent,
                        getCCPAConsent: o.getCCPAConsent,
                        shouldShowCCPABanner: o.shouldShowCCPABanner,
                        doesMerchantSupportGranularConsent: o.doesMerchantSupportGranularConsent,
                        analyticsProcessingAllowed: r.analyticsProcessingAllowed,
                        preferencesProcessingAllowed: r.preferencesProcessingAllowed,
                        marketingAllowed: d,
                        firstPartyMarketingAllowed: d,
                        saleOfDataAllowed: p,
                        thirdPartyMarketingAllowed: p,
                        currentVisitorConsent: l,
                        shouldShowBanner: r.shouldShowBanner,
                        saleOfDataRegion: r.saleOfDataRegion,
                        getRegion: o.getRegion,
                        getTrackingConsentMetafield: o.getTrackingConsentMetafield,
                        unstable: {
                            analyticsProcessingAllowed: r.analyticsProcessingAllowed,
                            preferencesProcessingAllowed: r.preferencesProcessingAllowed,
                            marketingAllowed: d,
                            saleOfDataAllowed: p,
                            currentVisitorConsent: l,
                            shouldShowBanner: r.shouldShowBanner,
                            saleOfDataRegion: r.saleOfDataRegion
                        },
                        __metadata__: {
                            name: "@shopify/consent-tracking-api",
                            version: c.apiVersion,
                            description: "Shopify Consent Tracking API"
                        }
                    };
                    if (new s.Monorail(t),
                    !e)
                        return n;
                    const u = ["unstable", "__metadata__"];
                    for (const e in n)
                        n.hasOwnProperty(e) && (n[e] = u.includes(e) ? n[e] : a.withBugsnag(n[e]));
                    return n
                }
                )(e)
            }
        },
        5732: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(7249)
              , r = n(809);
            const i = "_tracking_consent";
            function a() {
                const e = r.readCookie(i);
                if (void 0 !== e)
                    return function(e) {
                        const t = e.slice(0, 1);
                        return "{" == t ? function(e) {
                            var t;
                            let n;
                            try {
                                n = JSON.parse(e)
                            } catch {
                                return
                            }
                            if (n.v === o.CookieVersionV2 && null !== (t = n.con) && void 0 !== t && t.CMP)
                                return n
                        }(e) : "3" == t ? function(e) {
                            const t = e.slice(1).split("_")
                              , [n,r,i,a,s] = t;
                            let c, u;
                            try {
                                c = t[5] ? JSON.parse(t.slice(5).join("_")) : void 0
                            } catch {}
                            if (s) {
                                const e = s.replace(/\*/g, "/").replace(/-/g, "+")
                                  , t = Array.from(atob(e)).map((e => e.charCodeAt(0).toString(16).padStart(2, "0"))).join("");
                                u = [8, 13, 18, 23].reduce(( (e, t) => e.slice(0, t) + "-" + e.slice(t)), t)
                            }
                            function d(e) {
                                const t = n.split(".")[0];
                                return t.includes(e.toLowerCase()) ? o.ConsentValues.DECLINED : t.includes(e.toUpperCase()) ? o.ConsentValues.ACCEPTED : o.ConsentValues.NO_VALUE
                            }
                            function p(e) {
                                return n.includes(e.replace("t", "s").toUpperCase())
                            }
                            return {
                                v: o.CookieVersionV3,
                                con: {
                                    CMP: {
                                        [o.ConsentKeys.ANALYTICS]: d(o.ConsentKeys.ANALYTICS),
                                        [o.ConsentKeys.PREFERENCES]: d(o.ConsentKeys.PREFERENCES),
                                        [o.ConsentKeys.MARKETING]: d(o.ConsentKeys.MARKETING),
                                        [o.ConsentKeys.SALE_OF_DATA]: d(o.ConsentKeys.SALE_OF_DATA)
                                    }
                                },
                                region: r || "",
                                cus: c,
                                purposes: {
                                    [o.DataProcessingPurpose.ANALYTICS]: p(o.DataProcessingPurpose.ANALYTICS),
                                    [o.DataProcessingPurpose.PREFERENCES]: p(o.DataProcessingPurpose.PREFERENCES),
                                    [o.DataProcessingPurpose.MARKETING]: p(o.DataProcessingPurpose.MARKETING),
                                    [o.DataProcessingPurpose.SALE_OF_DATA]: p(o.DataProcessingPurpose.SALE_OF_DATA)
                                },
                                sale_of_data_region: "t" == a,
                                display_banner: "t" == i,
                                consent_id: u
                            }
                        }(e) : void 0
                    }(e)
            }
            function s() {
                try {
                    let e = a();
                    if (!e)
                        return;
                    return e
                } catch {
                    return
                }
            }
            function c() {
                return {
                    m: d(o.ConsentKeys.MARKETING),
                    a: d(o.ConsentKeys.ANALYTICS),
                    p: d(o.ConsentKeys.PREFERENCES),
                    s: d(o.ConsentKeys.SALE_OF_DATA)
                }
            }
            function u(e=null) {
                return null === e && (e = s()),
                void 0 === e
            }
            function d(e) {
                const t = s();
                if (!t)
                    return o.ConsentValues.NO_VALUE;
                const n = t.con.CMP;
                return n ? n[e] : o.ConsentValues.NO_VALUE
            }
            function p(e) {
                const t = a();
                if (!t || !t.purposes)
                    return !0;
                const n = t.purposes[e];
                return "boolean" != typeof n || n
            }
            t.CONSENT_COOKIE_NAME = i,
            t.analyticsProcessingAllowed = function() {
                return p(o.DataProcessingPurpose.ANALYTICS)
            }
            ,
            t.getCCPAConsentValue = function() {
                return c()[o.ConsentKeys.SALE_OF_DATA]
            }
            ,
            t.getCMPConsentValues = c,
            t.getConsentId = function() {
                const e = a();
                return e && e.consent_id || ""
            }
            ,
            t.getCustomValue = function(e) {
                const t = s();
                if (u(t) || !t.cus)
                    return;
                const n = t.cus[encodeURIComponent(e)];
                return n ? decodeURIComponent(n) : n
            }
            ,
            t.getCustomValues = function() {
                const e = s();
                if (!u(e) && e.cus)
                    return Object.entries(e.cus).map(( ([e,t]) => ({
                        key: decodeURIComponent(e),
                        value: decodeURIComponent(t)
                    })))
            }
            ,
            t.getRegionValue = function() {
                const e = s();
                return u(e) ? "" : e.region || ""
            }
            ,
            t.getSignal = d,
            t.marketingProcessingAllowed = function() {
                return p(o.DataProcessingPurpose.MARKETING)
            }
            ,
            t.preferencesProcessingAllowed = function() {
                return p(o.DataProcessingPurpose.PREFERENCES)
            }
            ,
            t.readCookieAndTransform = s,
            t.saleOfDataAllowed = function() {
                return p(o.DataProcessingPurpose.SALE_OF_DATA)
            }
            ,
            t.saleOfDataRegion = function() {
                const e = a();
                return e && e.sale_of_data_region || !1
            }
            ,
            t.setStorefrontApiTrackingConsent = function(e, t) {
                function n(e, t=o.ConsentValues.NO_VALUE) {
                    return !0 === e ? o.ConsentValues.ACCEPTED : !1 === e ? o.ConsentValues.DECLINED : t
                }
                const a = {
                    [o.ConsentKeys.ANALYTICS]: n(e[o.ConsentDisplayKeys.ANALYTICS], o.ConsentValues.DECLINED),
                    [o.ConsentKeys.MARKETING]: n(e[o.ConsentDisplayKeys.MARKETING], o.ConsentValues.DECLINED),
                    [o.ConsentKeys.PREFERENCES]: n(e[o.ConsentDisplayKeys.PREFERENCES], o.ConsentValues.DECLINED),
                    [o.ConsentKeys.SALE_OF_DATA]: n(e[o.ConsentDisplayKeys.SALE_OF_DATA])
                }
                  , s = {
                    v: o.CookieVersionV2,
                    reg: "",
                    con: {
                        CMP: a
                    }
                }
                  , c = encodeURIComponent(JSON.stringify(s));
                return r.writeCookie(i, e.rootDomain, 31536e6, c),
                t(null),
                new Promise(( (e, t) => {}
                ))
            }
            ,
            t.shouldShowBanner = function() {
                const e = a();
                return !!e && "boolean" == typeof e.display_banner && e.display_banner
            }
            ,
            t.transformConsentToDisplaySchema = function(e) {
                switch (e) {
                case o.ConsentValues.ACCEPTED:
                    return o.DisplayConsentValues.ACCEPTED;
                case o.ConsentValues.DECLINED:
                    return o.DisplayConsentValues.DECLINED;
                default:
                    return o.DisplayConsentValues.NO_VALUE
                }
            }
            ,
            t.transformKeyToDisplayName = function(e) {
                switch (e) {
                case o.ConsentKeys.ANALYTICS:
                    return o.ConsentDisplayKeys.ANALYTICS;
                case o.ConsentKeys.MARKETING:
                    return o.ConsentDisplayKeys.MARKETING;
                case o.ConsentKeys.PREFERENCES:
                    return o.ConsentDisplayKeys.PREFERENCES;
                case o.ConsentKeys.SALE_OF_DATA:
                    return o.ConsentDisplayKeys.SALE_OF_DATA
                }
            }
            ,
            t.validCookieDoesNotExist = u
        },
        5730: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(7249)
              , r = n(5732)
              , i = n(8740)
              , a = n(8680)
              , s = n(7973);
            function c() {
                if ((new i.Monorail).produce("getTrackingConsent"),
                r.validCookieDoesNotExist())
                    return o.DisplayConsentValues.NO_VALUE;
                const e = r.getCMPConsentValues();
                return e[o.ConsentKeys.MARKETING] === o.ConsentValues.ACCEPTED && e[o.ConsentKeys.ANALYTICS] === o.ConsentValues.ACCEPTED ? o.DisplayConsentValues.ACCEPTED : e[o.ConsentKeys.MARKETING] === o.ConsentValues.DECLINED || e[o.ConsentKeys.ANALYTICS] === o.ConsentValues.DECLINED ? o.DisplayConsentValues.DECLINED : o.DisplayConsentValues.NO_INTERACTION
            }
            function u(e) {
                return e ? d() ? window.location.pathname + window.location.search : "/" : null
            }
            function d() {
                if ("" === document.referrer)
                    return !0;
                const e = document.createElement("a");
                return e.href = document.referrer,
                window.location.hostname != e.hostname
            }
            function p() {
                return r.marketingProcessingAllowed() && r.analyticsProcessingAllowed()
            }
            function l() {
                return r.saleOfDataRegion() ? "string" == typeof navigator.globalPrivacyControl ? "1" !== navigator.globalPrivacyControl : "boolean" == typeof navigator.globalPrivacyControl ? !navigator.globalPrivacyControl : null : null
            }
            function _() {
                return !1 === l() ? o.DisplayConsentValues.DECLINED : (e = r.getCCPAConsentValue(),
                r.validCookieDoesNotExist() ? o.DisplayConsentValues.NO_VALUE : e === o.ConsentValues.NO_VALUE ? o.DisplayConsentValues.NO_INTERACTION : r.transformConsentToDisplaySchema(e));
                var e
            }
            t.saleOfDataRegion = r.saleOfDataRegion,
            t.GPCSignal = l,
            t.doesMerchantSupportGranularConsent = function() {
                return !0
            }
            ,
            t.getCCPAConsent = _,
            t.getLandingPageData = u,
            t.getRegion = function() {
                return r.getRegionValue()
            }
            ,
            t.getRegulation = function() {
                (new i.Monorail).produce("getRegulation"),
                s.logger.warn("getRegulation is deprecated and will be removed.");
                const e = r.getRegionValue();
                return "" === e ? "" : ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SI", "SK", "ES", "SE", "GB"].includes(e.slice(0, 2)) ? "GDPR" : "US" === e.slice(0, 2) && ["CA", "VA"].includes(e.slice(2, 4)) ? "CCPA" : ""
            }
            ,
            t.getShopPrefs = function() {
                return (new i.Monorail).produce("getShopPrefs"),
                s.logger.warn("getShopPrefs is deprecated and will be removed."),
                {
                    limit: []
                }
            }
            ,
            t.getTrackingConsent = c,
            t.getTrackingConsentMetafield = function(e) {
                return r.getCustomValue(e)
            }
            ,
            t.getTrackingConsentMetafields = function() {
                return r.getCustomValues()
            }
            ,
            t.hasConsentForGDPR = p,
            t.haveAnalyticsConsent = function() {
                return r.analyticsProcessingAllowed()
            }
            ,
            t.haveMarketingConsent = function() {
                return r.marketingProcessingAllowed()
            }
            ,
            t.havePreferencesConsent = function() {
                return r.preferencesProcessingAllowed()
            }
            ,
            t.haveSaleOfDataConsent = function() {
                return r.saleOfDataAllowed()
            }
            ,
            t.isBuyerOnFirstPageOfVisit = d,
            t.isRegulationEnforced = function() {
                return (new i.Monorail).produce("isRegulationEnforced"),
                s.logger.warn("isRegulationEnforced is deprecated and will be removed."),
                !0
            }
            ,
            t.setCCPAConsent = function(e, t) {
                if (s.logger.warn("This method is deprecated. Please read shopify.dev/docs/api/customer-privacy for the latest information."),
                "boolean" != typeof e)
                    throw TypeError("setCCPAConsent must be called with a boolean consent value");
                if ("function" != typeof t)
                    throw TypeError("setCCPAConsent must be called with a callback function");
                return a.storefrontApiUpdateTrackingConsent({
                    granular_consent: {
                        sale_of_data: e
                    }
                }, t)
            }
            ,
            t.setTrackingConsent = function(e, t) {
                if (function(e) {
                    if ("boolean" != typeof e && "object" != typeof e)
                        throw TypeError("setTrackingConsent must be called with a boolean or object consent value");
                    if ("object" == typeof e) {
                        const t = Object.keys(e);
                        if (0 === t.length)
                            throw TypeError("The submitted consent object is empty.");
                        const n = [o.ConsentDisplayKeys.MARKETING, o.ConsentDisplayKeys.ANALYTICS, o.ConsentDisplayKeys.PREFERENCES, o.ConsentDisplayKeys.SALE_OF_DATA, o.ConsentDisplayKeys.EMAIL, o.StorefrontApiConsentMetadata.ROOT_DOMAIN, o.StorefrontApiConsentMetadata.CHECKOUT_ROOT_DOMAIN, o.StorefrontApiConsentMetadata.STOREFRONT_ROOT_DOMAIN, o.StorefrontApiConsentMetadata.STOREFRONT_ACCESS_TOKEN, o.StorefrontApiConsentMetadata.HEADLESS_STOREFRONT, o.StorefrontApiConsentMetadata.IS_EXTENSION_TOKEN, o.StorefrontApiConsentMetadata.METAFIELDS];
                        for (const e of t)
                            if (!n.includes(e))
                                throw TypeError(`The submitted consent object should only contain the following keys: ${n.join(", ")}. Extraneous key: ${e}.`)
                    }
                }(e),
                void 0 !== t && "function" != typeof t)
                    throw TypeError("setTrackingConsent must be called with a callback function if the callback argument is provided");
                let n;
                !0 === e || !1 === e ? (s.logger.warn("Binary consent is deprecated. Please update to granular consent (shopify.dev/docs/api/consent-tracking)"),
                n = {
                    analytics: e,
                    preferences: e,
                    marketing: e
                }) : n = e;
                const r = function(e) {
                    return e ? d() ? document.referrer : "" : null
                }(n.analytics)
                  , i = u(n.analytics);
                return a.storefrontApiUpdateTrackingConsent({
                    granular_consent: n,
                    ...null !== r && {
                        referrer: r
                    },
                    ...null !== i && {
                        landing_page: i
                    }
                }, t)
            }
            ,
            t.shouldShowCCPABanner = function() {
                return (new i.Monorail).produce("shouldShowCCPABanner"),
                s.logger.warn("shouldShowCCPABanner is deprecated and will be removed."),
                r.saleOfDataRegion() && _() === o.DisplayConsentValues.NO_INTERACTION
            }
            ,
            t.shouldShowGDPRBanner = function() {
                return r.shouldShowBanner() && c() === o.DisplayConsentValues.NO_INTERACTION
            }
            ,
            t.userCanBeTracked = function() {
                return !!r.validCookieDoesNotExist() || p()
            }
            ,
            t.userDataCanBeSold = function() {
                return s.logger.warn("userDataCanBeSold is deprecated and will be replaced with saleOfDataAllowed."),
                r.saleOfDataAllowed()
            }
        },
        809: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(7973);
            function r(e, t=!1) {
                const n = document.cookie ? document.cookie.split("; ") : [];
                for (let t = 0; t < n.length; t++) {
                    const [o,r] = n[t].split("=");
                    if (e === decodeURIComponent(o))
                        return decodeURIComponent(r)
                }
                if (t && "_tracking_consent" === e && !window.localStorage.getItem("tracking_consent_fetched")) {
                    if (o.isTestEnv())
                        return;
                    return console.debug("_tracking_consent missing"),
                    i(),
                    window.localStorage.setItem("tracking_consent_fetched", "true"),
                    r(e, !1)
                }
            }
            function i(e="/") {
                const t = new XMLHttpRequest;
                t.open("HEAD", e, !1),
                t.withCredentials = !0,
                t.send()
            }
            function a(e) {
                return e === encodeURIComponent(decodeURIComponent(e))
            }
            t.makeSynchronousRequest = i,
            t.readCookie = function(e) {
                return r(e)
            }
            ,
            t.writeCookie = function(e, t, n, o) {
                if (!a(o))
                    throw new TypeError("Cookie value is not correctly URI encoded.");
                if (!a(e))
                    throw new TypeError("Cookie name is not correctly URI encoded.");
                let r = `${e}=${o}`;
                r += "; path=/",
                t && (r += `; domain=${t}`),
                r += `; expires=${new Date((new Date).getTime() + n).toUTCString()}`,
                document.cookie = r
            }
        },
        1928: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(7249)
              , r = n(1148)
              , i = n(5732);
            function a(e) {
                const t = new URL(e,window.location.origin)
                  , n = c(e) ? s(t) : s(t).replace(window.location.origin, "");
                return document.querySelectorAll(`a[href^="${n}"]`)
            }
            function s(e) {
                return `${e.origin}${t = e.pathname,
                t.replace(/\/$/, "")}`;
                var t
            }
            function c(e) {
                return e.startsWith("http://") || e.startsWith("https://")
            }
            function u(e) {
                switch (e) {
                case o.DisplayConsentValues.ACCEPTED:
                    return "1";
                case o.DisplayConsentValues.DECLINED:
                    return "0";
                default:
                    return ""
                }
            }
            t.appendConsentToCustomerAccountLinks = function(e) {
                if (!e)
                    return;
                const t = a(e);
                if (!t.length)
                    return;
                const n = i.getConsentId()
                  , o = function() {
                    const e = r.currentVisitorConsent();
                    if (!e)
                        return null;
                    if (!("analytics"in e && "marketing"in e && "preferences"in e))
                        return null;
                    const t = u(e.analytics)
                      , n = u(e.marketing)
                      , o = u(e.preferences);
                    return "" === t && "" === n && "" === o ? null : `a${t}m${n}p${o}`
                }();
                for (const r of Array.from(t)) {
                    const t = r.getAttribute("href");
                    if (!t)
                        continue;
                    const i = new URL(t,window.location.origin);
                    if (n && i.searchParams.set("consent_id", n),
                    o && i.searchParams.set("consent", o),
                    n || o) {
                        const t = c(e) ? i.toString() : i.toString().replace(window.location.origin, "");
                        r.setAttribute("href", t)
                    }
                }
            }
            ,
            t.findAllCustomerAccountAnchors = a
        },
        9401: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(7249)
              , r = n(5732);
            function i(e, t) {
                document.dispatchEvent(new CustomEvent(e,{
                    detail: t || {}
                }))
            }
            t.dispatchEvents = function(e) {
                void 0 !== e.granular_consent && function(e) {
                    const t = e[o.DataProcessingPurpose.MARKETING]
                      , n = e[o.DataProcessingPurpose.SALE_OF_DATA]
                      , r = e[o.DataProcessingPurpose.ANALYTICS]
                      , a = e[o.DataProcessingPurpose.PREFERENCES];
                    !0 === t ? i(o.TrackingEvents.MARKETING_ACCEPTED) : !1 === t && i(o.TrackingEvents.MARKETING_DECLINED),
                    !0 === n ? i(o.TrackingEvents.SALE_OF_DATA_ACCEPTED) : !1 === n && i(o.TrackingEvents.SALE_OF_DATA_DECLINED),
                    !0 === r ? i(o.TrackingEvents.ANALYTICS_ACCEPTED) : !1 === r && i(o.TrackingEvents.ANALYTICS_DECLINED),
                    !0 === a ? i(o.TrackingEvents.PREFERENCES_ACCEPTED) : !1 === a && i(o.TrackingEvents.PREFERENCES_DECLINED);
                    const s = function(e) {
                        return {
                            marketingAllowed: e[o.DataProcessingPurpose.MARKETING],
                            saleOfDataAllowed: e[o.DataProcessingPurpose.SALE_OF_DATA],
                            analyticsAllowed: e[o.DataProcessingPurpose.ANALYTICS],
                            preferencesAllowed: e[o.DataProcessingPurpose.PREFERENCES],
                            firstPartyMarketingAllowed: e[o.DataProcessingPurpose.MARKETING],
                            thirdPartyMarketingAllowed: e[o.DataProcessingPurpose.SALE_OF_DATA]
                        }
                    }(e);
                    i(o.TrackingEvents.CONSENT_COLLECTED, s);
                    const c = [r, a, t, n];
                    c.every((e => !0 === e)) && i(o.TrackingEvents.TRACKING_ACCEPTED),
                    c.every((e => !1 === e)) && i(o.TrackingEvents.TRACKING_DECLINED)
                }({
                    [o.DataProcessingPurpose.PREFERENCES]: r.preferencesProcessingAllowed(),
                    [o.DataProcessingPurpose.ANALYTICS]: r.analyticsProcessingAllowed(),
                    [o.DataProcessingPurpose.MARKETING]: r.marketingProcessingAllowed(),
                    [o.DataProcessingPurpose.SALE_OF_DATA]: r.saleOfDataAllowed()
                })
            }
            ,
            t.dispatchLoadedEvent = function() {
                i(o.TrackingEvents.CONSENT_TRACKING_API_LOADED)
            }
        },
        1875: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(7249)
              , r = n(5730)
              , i = n(5732)
              , a = n(9401)
              , s = n(1148);
            t.ConsentKeys = o.ConsentKeys,
            t.ConsentValues = o.ConsentValues,
            t.DisplayConsentValues = o.DisplayConsentValues,
            t.TrackingEvents = o.TrackingEvents,
            t.getRegion = r.getRegion,
            t.getRegulation = r.getRegulation,
            t.getShopPrefs = r.getShopPrefs,
            t.getTrackingConsent = r.getTrackingConsent,
            t.getTrackingConsentMetafield = r.getTrackingConsentMetafield,
            t.getTrackingConsentMetafields = r.getTrackingConsentMetafields,
            t.userCanBeTracked = r.userCanBeTracked,
            t.userDataCanBeSold = r.userDataCanBeSold,
            t.getSignal = i.getSignal,
            t.shouldShowBanner = i.shouldShowBanner,
            t.dispatchLoadedEvent = a.dispatchLoadedEvent,
            t.analyticsProcessingAllowed = s.analyticsProcessingAllowed,
            t.currentVisitorConsent = s.currentVisitorConsent,
            t.marketingAllowed = s.marketingAllowed,
            t.preferencesProcessingAllowed = s.preferencesProcessingAllowed,
            t.saleOfDataAllowed = s.saleOfDataAllowed,
            t.setTrackingConsent = s.setTrackingConsent,
            t.shopifyConsentAPI = s.shopifyConsentAPI
        },
        8740: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(5732);
            class r {
                constructor(e=!1) {
                    if (this.useInstrumentation = void 0,
                    r.instance)
                        return r.instance;
                    r.instance = this,
                    this.useInstrumentation = e
                }
                instrumentationEnabled() {
                    return this.useInstrumentation
                }
                setUseInstrumentation(e) {
                    this.useInstrumentation = e
                }
                produce(e, t) {
                    if (this.instrumentationEnabled() && o.analyticsProcessingAllowed())
                        try {
                            const n = {
                                schema_id: "customer_privacy_api_events/2.0",
                                payload: {
                                    shop_domain: window.location.host,
                                    method_name: e,
                                    call_details: t || null
                                }
                            }
                              , o = {
                                accept: "*/*",
                                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                                "content-type": "application/json; charset=utf-8",
                                "x-monorail-edge-event-created-at-ms": String(Date.now()),
                                "x-monorail-edge-event-sent-at-ms": String(Date.now())
                            };
                            if (!window.location.host.endsWith("spin.dev"))
                                return fetch("https://monorail-edge.shopifysvc.com/v1/produce", {
                                    headers: o,
                                    body: JSON.stringify(n),
                                    method: "POST",
                                    mode: "cors",
                                    credentials: "omit"
                                });
                            console.log("Monorail event from consent API:", o, n)
                        } catch (e) {}
                }
            }
            r.instance = void 0,
            t.Monorail = r
        },
        8680: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(9401)
              , r = n(809)
              , i = n(5732)
              , a = n(2189)
              , s = n(7973)
              , c = n(1928);
            const u = "_landing_page"
              , d = "_orig_referrer";
            function p(e) {
                const t = e.granular_consent
                  , n = {
                    visitorConsent: {
                        marketing: t.marketing,
                        analytics: t.analytics,
                        preferences: t.preferences,
                        saleOfData: t.sale_of_data,
                        ...t.metafields && {
                            metafields: t.metafields
                        }
                    },
                    ...t.email && {
                        visitorEmail: t.email
                    },
                    origReferrer: e.referrer,
                    landingPage: e.landing_page
                };
                return {
                    query: `query { consentManagement { cookies(${a.objectToGraphQL(n)}) { trackingConsentCookie cookieDomain landingPageCookie origReferrerCookie } customerAccountUrl } }`,
                    variables: {}
                }
            }
            t.storefrontApiUpdateTrackingConsent = function(e, t) {
                const n = e.granular_consent
                  , a = n.storefrontAccessToken || function() {
                    const e = document.documentElement.querySelector("#shopify-features")
                      , t = "Could not find liquid access token";
                    if (!e)
                        return void s.logger.warn(t);
                    const n = JSON.parse(e.textContent || "").accessToken;
                    if (n)
                        return n;
                    s.logger.warn(t)
                }()
                  , l = n.checkoutRootDomain || window.location.host
                  , _ = n.isExtensionToken ? "Shopify-Storefront-Extension-Token" : "x-shopify-storefront-access-token"
                  , f = {
                    headers: {
                        "content-type": "application/json",
                        [_]: a
                    },
                    body: JSON.stringify(p(e)),
                    method: "POST"
                };
                return fetch(`https://${l}/api/unstable/graphql.json`, f).then((e => {
                    if (e.ok)
                        return e.json();
                    throw new Error("Server error")
                }
                )).then((a => {
                    var s, p;
                    const l = 31536e6
                      , _ = 12096e5
                      , f = a.data.consentManagement.cookies.cookieDomain
                      , E = f || n.checkoutRootDomain || window.location.hostname
                      , h = n.storefrontRootDomain || f || window.location.hostname
                      , g = a.data.consentManagement.cookies.trackingConsentCookie
                      , v = a.data.consentManagement.cookies.landingPageCookie
                      , y = a.data.consentManagement.cookies.origReferrerCookie
                      , m = null !== (s = null === (p = a.data.consentManagement) || void 0 === p ? void 0 : p.customerAccountUrl) && void 0 !== s ? s : "";
                    return r.writeCookie(i.CONSENT_COOKIE_NAME, E, l, g),
                    v && y && (r.writeCookie(u, E, _, v),
                    r.writeCookie(d, E, _, y)),
                    h !== E && (r.writeCookie(i.CONSENT_COOKIE_NAME, h, l, g),
                    v && y && (r.writeCookie(u, h, _, v),
                    r.writeCookie(d, h, _, y))),
                    o.dispatchEvents(e),
                    c.appendConsentToCustomerAccountLinks(m),
                    void 0 !== t && t(null, a),
                    a
                }
                )).catch((e => {
                    const n = "Error while setting storefront API consent: " + e.message;
                    if (void 0 === t)
                        throw {
                            error: n
                        };
                    t({
                        error: n
                    })
                }
                ))
            }
        },
        7249: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.ConsentDisplayKeys = {
                MARKETING: "marketing",
                ANALYTICS: "analytics",
                PREFERENCES: "preferences",
                SALE_OF_DATA: "sale_of_data",
                EMAIL: "email"
            },
            t.ConsentKeys = {
                MARKETING: "m",
                ANALYTICS: "a",
                PREFERENCES: "p",
                SALE_OF_DATA: "s"
            },
            t.ConsentValues = {
                NO_VALUE: "",
                ACCEPTED: "1",
                DECLINED: "0"
            },
            t.CookieVersionV2 = "2.1",
            t.CookieVersionV3 = "3",
            t.DataProcessingPurpose = {
                PREFERENCES: "p",
                ANALYTICS: "a",
                MARKETING: "m",
                SALE_OF_DATA: "t"
            },
            t.DisplayConsentValues = {
                ACCEPTED: "yes",
                DECLINED: "no",
                NO_INTERACTION: "no_interaction",
                NO_VALUE: ""
            },
            t.StorefrontApiConsentMetadata = {
                HEADLESS_STOREFRONT: "headlessStorefront",
                ROOT_DOMAIN: "rootDomain",
                CHECKOUT_ROOT_DOMAIN: "checkoutRootDomain",
                STOREFRONT_ROOT_DOMAIN: "storefrontRootDomain",
                STOREFRONT_ACCESS_TOKEN: "storefrontAccessToken",
                IS_EXTENSION_TOKEN: "isExtensionToken",
                METAFIELDS: "metafields"
            },
            t.TrackingEvents = {
                TRACKING_ACCEPTED: "trackingConsentAccepted",
                TRACKING_DECLINED: "trackingConsentDeclined",
                MARKETING_ACCEPTED: "firstPartyMarketingConsentAccepted",
                SALE_OF_DATA_ACCEPTED: "thirdPartyMarketingConsentAccepted",
                ANALYTICS_ACCEPTED: "analyticsConsentAccepted",
                PREFERENCES_ACCEPTED: "preferencesConsentAccepted",
                MARKETING_DECLINED: "firstPartyMarketingConsentDeclined",
                SALE_OF_DATA_DECLINED: "thirdPartyMarketingConsentDeclined",
                ANALYTICS_DECLINED: "analyticsConsentDeclined",
                PREFERENCES_DECLINED: "preferencesConsentDeclined",
                CONSENT_COLLECTED: "visitorConsentCollected",
                CONSENT_TRACKING_API_LOADED: "consentTrackingApiLoaded"
            }
        },
        2189: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.objectToGraphQL = function e(t, n) {
                if (null === t)
                    return "null";
                if (Array.isArray(t))
                    return `[${t.map((t => e(t, !0))).join(",")}]`;
                if ("object" == typeof t) {
                    let o = [];
                    for (const n in t)
                        t.hasOwnProperty(n) && void 0 !== t[n] && o.push(`${n}:${e(t[n], !0)}`);
                    const r = o.join(",");
                    return n ? `{${r}}` : r
                }
                return "string" == typeof t ? `"${t}"` : `${t}`
            }
        },
        7973: function(e, t) {
            "use strict";
            function n() {
                try {
                    return !1
                } catch (e) {
                    if (e instanceof ReferenceError)
                        return !0;
                    throw e
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class o {
            }
            o.warn = e => {
                n() || console.warn(e)
            }
            ,
            o.error = e => {
                n() || console.error(e)
            }
            ,
            o.info = e => {
                n() || console.info(e)
            }
            ,
            o.debug = e => {
                n() || console.debug(e)
            }
            ,
            o.trace = e => {
                n() || console.trace(e)
            }
            ;
            const r = o;
            t.isTestEnv = n,
            t.logger = r
        },
        669: function(e, t, n) {
            e.exports = n(1875)
        },
        9414: function(e, t, n) {
            "use strict";
            var o, r = this && this.__extends || (o = function(e, t) {
                return o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                ,
                o(e, t)
            }
            ,
            function(e, t) {
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.EcommerceIntegration = t.PSEUDO_PAGE_EVENTS = t.TEST_PRODUCT_ADDED_TO_CART_SERVER_CHANGELOG = t.TEST_WPM_FORM_PREVENT_DEFAULT = t.STOREFRONT_API_ADDED_PRODUCT = t.CHECKOUT_ONE_PAGE_VIEW = t.CHECKOUT_PAYMENT_STEP_STARTED = t.CHECKOUT_SHIPPING_INFO_SUBMITTED = t.CHECKOUT_SHIPPING_STEP_STARTED = t.CHECKOUT_ADDRESS_INFO_SUBMITTED = t.CHECKOUT_CONTACT_INFO_SUBMITTED = t.CHECKOUT_CONTACT_STEP_STARTED = t.ANALYTICS_ADDED_PAYMENT = t.ANALYTICS_PERFORMED_SEARCH = t.ANALYTICS_STARTED_ORDER_ONCE_PER_CHECKOUT = t.ANALYTICS_STARTED_ORDER = t.ANALYTICS_COMPLETED_ORDER = t.ANALYTICS_ADDED_PRODUCT_NEXT = t.ANALYTICS_ADDED_PRODUCT = t.ANALYTICS_VIEWED_PRODUCT_CATEGORY = t.ANALYTICS_VIEWED_PRODUCT = t.ANALYTICS_PAGE_VIEW = t.ANALYTICS_GENERIC_EVENT = t.analyticsEvents = void 0;
            var i = n(6573)
              , a = n(9974)
              , s = n(357)
              , c = n(8416)
              , u = n(1482);
            t.analyticsEvents = {
                viewedProduct: /^[ _]?viewed[ _]?product[ _]?$/i,
                viewedProductCategory: /^[ _]?viewed[ _]?product[ _]?category[ _]?$/i,
                viewedProductVariant: /^[ _]?viewed[ _]?product[ _]?variant[ _]?$/i,
                addedProduct: /^[ _]?added[ _]?product[ _]?$/i,
                addedProductNext: /^[ _]?added[ _]?product[ _]?next[ _]?$/i,
                addedProductPermalinkTest: /^[ _]?added[ _]?product[ _]?permalink[ _]?test[ _]?$/i,
                completedOrder: /^[ _]?completed[ _]?order[ _]?$/i,
                startedOrder: /^[ _]?started[ _]?order[ _]?$/i,
                startedOrderOncePerCheckout: /^[ _]?started[ _]?order[ _]?once[ _]?per[ _]?checkout[ _]?$/i,
                performedSearch: /^[ _]?performed[ _]?search[ _]?$/i,
                addedPayment: /^[ _]?added[ _]?payment[ _]?$/i,
                checkoutContactStepStarted: /^[ _]?checkout[ _]?[ _]?contact[ _]?step[ _]?started[ _]?$/i,
                checkoutContactInfoSubmitted: /^[ _]?checkout[ _]?[ _]?contact[ _]?info[ _]?submitted[ _]?$/i,
                checkoutAddressInfoSubmitted: /^[ _]?checkout[ _]?[ _]?address[ _]?info[ _]?submitted[ _]?$/i,
                checkoutShippingStepStarted: /^[ _]?checkout[ _]?[ _]?shipping[ _]?step[ _]?started[ _]?$/i,
                checkoutShippingInfoSubmitted: /^[ _]?checkout[ _]?[ _]?shipping[ _]?info[ _]?submitted[ _]?$/i,
                checkoutPaymentStepStarted: /^[ _]?checkout[ _]?[ _]?payment[ _]?step[ _]?started[ _]?$/i,
                checkoutOnePageView: /^[ _]?checkout[ _]?[ _]?one[ _]?page[ _]?view[ _]?$/i,
                storefrontApiAddedProduct: /^[ _]?storefront[ _]?[ _]?api[ _]?added[ _]?product[ _]?$/i,
                testWpmFormPreventDefault: /^test[ _]?wpm[ _]?form[ _]?prevent[ _]?default$/i,
                testProductAddedToCartServerChangelog: /^test[ _]?product[ _]?added[ _]?to[ _]?cart[ _]?server[ _]?changelog$/i
            },
            t.ANALYTICS_GENERIC_EVENT = "genericEvent",
            t.ANALYTICS_PAGE_VIEW = "pageView",
            t.ANALYTICS_VIEWED_PRODUCT = "viewedProduct",
            t.ANALYTICS_VIEWED_PRODUCT_CATEGORY = "viewedProductCategory",
            t.ANALYTICS_ADDED_PRODUCT = "addedProduct",
            t.ANALYTICS_ADDED_PRODUCT_NEXT = "addedProductNext",
            t.ANALYTICS_COMPLETED_ORDER = "completedOrder",
            t.ANALYTICS_STARTED_ORDER = "startedOrder",
            t.ANALYTICS_STARTED_ORDER_ONCE_PER_CHECKOUT = "startedOrderOncePerCheckout",
            t.ANALYTICS_PERFORMED_SEARCH = "performedSearch",
            t.ANALYTICS_ADDED_PAYMENT = "addedPayment",
            t.CHECKOUT_CONTACT_STEP_STARTED = "checkoutContactStepStarted",
            t.CHECKOUT_CONTACT_INFO_SUBMITTED = "checkoutContactInfoSubmitted",
            t.CHECKOUT_ADDRESS_INFO_SUBMITTED = "checkoutAddressInfoSubmitted",
            t.CHECKOUT_SHIPPING_STEP_STARTED = "checkoutShippingStepStarted",
            t.CHECKOUT_SHIPPING_INFO_SUBMITTED = "checkoutShippingInfoSubmitted",
            t.CHECKOUT_PAYMENT_STEP_STARTED = "checkoutPaymentStepStarted",
            t.CHECKOUT_ONE_PAGE_VIEW = "checkoutOnePageView",
            t.STOREFRONT_API_ADDED_PRODUCT = "storefrontApiAddedProduct",
            t.TEST_WPM_FORM_PREVENT_DEFAULT = "testWpmFormPreventDefault",
            t.TEST_PRODUCT_ADDED_TO_CART_SERVER_CHANGELOG = "testProductAddedToCartServerChangelog",
            t.PSEUDO_PAGE_EVENTS = [t.CHECKOUT_CONTACT_STEP_STARTED, t.CHECKOUT_SHIPPING_STEP_STARTED, t.CHECKOUT_PAYMENT_STEP_STARTED, t.CHECKOUT_ONE_PAGE_VIEW];
            var d = function(e) {
                function n(t, n, o) {
                    var r = e.call(this, t, n, o) || this;
                    return r.wrapTrack(),
                    r.setPixelStub(),
                    r
                }
                return r(n, e),
                n.prototype.wrapTrack = function() {
                    var e = this.track;
                    this.track = function(n) {
                        var o = n.event
                          , r = !1;
                        for (var i in t.analyticsEvents) {
                            var a = t.analyticsEvents[i];
                            if (this[i] && a.test(o)) {
                                this[i].apply(this, [n]),
                                r = !0;
                                break
                            }
                        }
                        r || e.apply(this, Array.prototype.slice.call(arguments))
                    }
                }
                ,
                n.prototype.addMonorailBatchEvent = function(e) {
                    if (s.default.appName && s.default.appName in u.appNameToEcommerceEventSchemaId) {
                        var t = this.getEcommercePixelIds();
                        i.addBatchEvent({
                            schemaId: e.schemaId ? e.schemaId : u.appNameToEcommerceEventSchemaId[s.default.appName],
                            payload: a.objectAssignFilterUndefined({
                                shop_id: s.default.shopId,
                                partner_name: this.getEcommerceMetricsTag(),
                                event_name: e.eventName,
                                unique_token: s.default.uniqToken,
                                visit_token: s.default.visitToken,
                                integration_id: this.getIntegrationId()
                            }, {
                                pixel_id: t && t.length > 0 ? t[0] : void 0,
                                event_properties: e.eventProperties,
                                checkout_token: s.default.checkoutToken,
                                event_id: e.eventId
                            })
                        })
                    }
                }
                ,
                n
            }(c.Integration);
            t.EcommerceIntegration = d
        },
        8416: function(e, t) {
            "use strict";
            var n = this && this.__assign || function() {
                return n = Object.assign || function(e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                        for (var r in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }
                ,
                n.apply(this, arguments)
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Integration = void 0;
            var o = function() {
                function e(e, t, o) {
                    this.state = null,
                    this.deferedEvents = new Set,
                    this.options = {},
                    this.options = n(n({}, e), t),
                    this.ready = o
                }
                return e.prototype.initializeOrAwaitConsent = function() {
                    null === this.state && (this.hasConsent() ? this.initialize(this.options) : this.awaitConsent())
                }
                ,
                e.prototype.awaitConsent = function() {
                    this.state = "awaiting-consent",
                    this.ready()
                }
                ,
                e.prototype.initialize = function(e) {
                    this.state = "initialized",
                    this.ready()
                }
                ,
                e.prototype.onConsentCollected = function(e) {
                    var t = this;
                    this.hasConsent(e) && ("awaiting-consent" === this.state && this.initialize(),
                    "initialized" === this.state && this.deferedEvents.size > 0 && this.deferedEvents.forEach((function(e, n, o) {
                        var r = e[0]
                          , i = e[1];
                        o.delete(n),
                        t.callEvent(r, i)
                    }
                    )))
                }
                ,
                e.prototype.emitEventOrAwaitConsent = function(e, t) {
                    this.hasConsent() ? this.callEvent(e, t) : this.deferedEvents.add([e, t])
                }
                ,
                e.prototype.callEvent = function(e, t) {
                    switch (e) {
                    case "page":
                        this.page(t);
                        break;
                    case "track":
                        this.track(t)
                    }
                }
                ,
                e.prototype.checkoutOnePageView = function(e) {
                    if (e.properties.hasOwnProperty("page")) {
                        var t = e.properties;
                        this.page(t.page)
                    }
                }
                ,
                e.flatten = function(e) {
                    var t = n({}, e);
                    return t.properties = {},
                    n(n({}, t), e.properties)
                }
                ,
                e.isEqual = function(e, t) {
                    for (var n in e)
                        if (e[n] !== t[n])
                            return !1;
                    for (var n in t)
                        if (t[n] !== e[n])
                            return !1;
                    return !0
                }
                ,
                e
            }();
            t.Integration = o
        },
        1482: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.extractSchemaIdFromEventName = t.buyWithPrimePresenceSchemaId = t.trekkieAssetContextSchemaId = t.customStorefrontAnalyticsSchemaId = t.storefrontAnalyticsSchemaIdValidation = t.legacyStorefrontAnalyticsSchemaId = t.storefrontAnalyticsSchemaId = t.appNameToEcommerceEventSchemaId = t.appNameToPageViewSchemaId = void 0,
            t.appNameToPageViewSchemaId = {
                admin: "trekkie_admin_page_view/1.0",
                appstore: "trekkie_appstore_page_view/1.2",
                blog: "trekkie_blog_page_view/1.2",
                brochure: "trekkie_brochure_page_view/1.3",
                checkout: "trekkie_checkout_page_view/1.2",
                "collabs-merchants": "trekkie_collabs_merchants_page_view/1.0",
                "compass-web": "trekkie_compass_web_page_view/1.2",
                creators: "trekkie_creators_page_view/2.0",
                delivery_app: "trekkie_delivery_app_page_view/1.0",
                docs: "trekkie_docs_page_view/1.2",
                development: "edge_test/1.0",
                exchange: "trekkie_exchange_page_view/1.2",
                experts: "trekkie_experts_page_view/1.0",
                handshake: "trekkie_handshake_page_view/1.0",
                fakestore: "trekkie_fakestore_page_view/1.0",
                identity: "trekkie_identity_page_view/1.2",
                linkpop: "trekkie_linkpop_page_view/2.0",
                "marketing-misc": "trekkie_marketing_misc_page_view/1.2",
                "oberlo-home": "trekkie_oberlo_home_page_view/1.3",
                opinions: "trekkie_opinions_page_view/1.2",
                partners: "trekkie_partners_page_view/1.2",
                "shopify-ping-web": "trekkie_shopify_ping_web_page_view/1.0",
                portal: "trekkie_portal_page_view/1.0",
                storefront: "trekkie_storefront_page_view/1.2",
                testing: "edge_test/1.0",
                themestore: "trekkie_themestore_page_view/1.2",
                "services-db": "trekkie_services_db_page_view/1.0"
            },
            t.appNameToEcommerceEventSchemaId = {
                storefront: "trekkie_storefront_ecommerce_event_emit/4.0",
                checkout: "trekkie_checkout_ecommerce_event_emit/4.0",
                test: "edge_test_ecommerce_event_emit/1.0"
            },
            t.storefrontAnalyticsSchemaId = "storefront_customer_tracking/5.0",
            t.legacyStorefrontAnalyticsSchemaId = "storefront_customer_tracking/4.21",
            t.storefrontAnalyticsSchemaIdValidation = "storefront_customer_tracking_validation/1.0",
            t.customStorefrontAnalyticsSchemaId = "custom_storefront_customer_tracking/1.1",
            t.trekkieAssetContextSchemaId = "trekkie_asset_context/1.1",
            t.buyWithPrimePresenceSchemaId = "storefront_buy_with_prime_presence/1.0",
            t.extractSchemaIdFromEventName = function(e) {
                var t = e.toLowerCase();
                if (0 === t.lastIndexOf("monorail://") && t.length > 11)
                    return t.substr(11)
            }
        },
        9965: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.ConsentValuesV2 = t.IntegrationTypes = t.ConsentPurposes = void 0;
            var o = n(669);
            Object.defineProperty(t, "ConsentPurposes", {
                enumerable: !0,
                get: function() {
                    return o.ConsentKeys
                }
            });
            var r, i = n(4842);
            Object.defineProperty(t, "IntegrationTypes", {
                enumerable: !0,
                get: function() {
                    return i.IntegrationTypes
                }
            }),
            (r = t.ConsentValuesV2 || (t.ConsentValuesV2 = {})).NO_VALUE = "",
            r.ACCEPTED = "1",
            r.DECLINED = "0"
        },
        4842: function(e, t) {
            "use strict";
            var n;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.IntegrationTypes = void 0,
            (n = t.IntegrationTypes || (t.IntegrationTypes = {})).ECOMMERCE = "EcommerceIntegration",
            n.INTEGRATION = "Integration"
        },
        2057: function(e, t, n) {
            "use strict";
            var o, r = this && this.__extends || (o = function(e, t) {
                return o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                ,
                o(e, t)
            }
            ,
            function(e, t) {
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            ), i = this && this.__assign || function() {
                return i = Object.assign || function(e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                        for (var r in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }
                ,
                i.apply(this, arguments)
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.FacebookPixel = void 0;
            var a = n(9414)
              , s = n(8533)
              , c = n(4779)
              , u = n(9974)
              , d = n(9965)
              , p = n(4779)
              , l = n(3082)
              , _ = function(e) {
                function t(n, o, r) {
                    var a = e.call(this, t.defaultOptions, i(i({}, o), {
                        agent: "shopify"
                    }), r) || this;
                    return a.campaignManager = new l.CampaignManager,
                    a
                }
                return r(t, e),
                t.prototype.initialize = function() {
                    this.setPixelStub(),
                    this.loadFacebookScript();
                    for (var t = this.options, n = 0, o = this.getFacebookPixelIds(t); n < o.length; n++) {
                        var r = o[n];
                        c.saleOfDataNotAllowed() && this.setLimitedDataUseMode(),
                        window.fbq("init", r),
                        "" !== t.agent && window.fbq("set", "agent", t.agent, r)
                    }
                    e.prototype.initialize.call(this)
                }
                ,
                t.prototype.name = function() {
                    return "Facebook Pixel"
                }
                ,
                t.prototype.type = function() {
                    return d.IntegrationTypes.ECOMMERCE
                }
                ,
                t.prototype.hasConsent = function(e) {
                    return p.marketingAllowed(e)
                }
                ,
                t.prototype.identify = function(e) {
                    throw new Error("identify is not supported")
                }
                ,
                t.prototype.page = function(e) {
                    this.emitEvent("PageView", e.eventId, a.ANALYTICS_PAGE_VIEW)
                }
                ,
                t.prototype.track = function(e) {
                    var t = {};
                    for (var n in e.properties)
                        "revenue" === n ? t.value = this.formatRevenue(e.properties.revenue) : t[n] = e.properties[n]
                }
                ,
                t.prototype.viewedProductCategory = function(e) {}
                ,
                t.prototype.viewedProductVariant = function(e) {}
                ,
                t.prototype.viewedProduct = function(e) {
                    var t = e.properties
                      , n = {
                        content_ids: this.getProductContentIds(t),
                        content_type: this.getProductContentType(t),
                        content_name: t.name || "",
                        content_category: t.category || "",
                        currency: this.getCurrency(t.currency),
                        value: this.formatRevenue(t.price)
                    };
                    this.emitEvent("ViewContent", e.eventId, a.ANALYTICS_VIEWED_PRODUCT, n)
                }
                ,
                t.prototype.addedProduct = function(e) {
                    var t = e.properties
                      , n = {
                        content_ids: this.getProductContentIds(t),
                        content_type: this.getProductContentType(t),
                        content_name: t.name || "",
                        content_category: t.category || "",
                        currency: this.getCurrency(t.currency),
                        value: this.formatRevenue(t.price),
                        num_items: this.getProductNumItems(t)
                    };
                    this.emitEvent("AddToCart", e.eventId, a.ANALYTICS_ADDED_PRODUCT, n)
                }
                ,
                t.prototype.addedPayment = function(e) {
                    var t = e.properties
                      , n = {
                        currency: this.getCurrency(t.currency),
                        value: this.formatRevenue(t.total)
                    };
                    this.emitEvent("AddPaymentInfo", e.eventId, a.ANALYTICS_ADDED_PAYMENT, n)
                }
                ,
                t.prototype.performedSearch = function(e) {
                    var t = {
                        search_string: e.properties.query || ""
                    };
                    this.emitEvent("Search", e.eventId, a.ANALYTICS_PERFORMED_SEARCH, t)
                }
                ,
                t.prototype.startedOrder = function(e) {
                    var t = e.properties
                      , n = {
                        content_ids: this.getOrderContentIds(t),
                        content_type: this.getOrderContentType(t),
                        currency: this.getCurrency(t.currency),
                        value: this.formatRevenue(t.revenue),
                        num_items: this.getOrderNumItems(t)
                    };
                    this.emitEvent("InitiateCheckout", e.eventId, a.ANALYTICS_STARTED_ORDER, n)
                }
                ,
                t.prototype.completedOrder = function(e) {
                    var t = e.properties
                      , n = {
                        content_ids: this.getOrderContentIds(t),
                        content_type: this.getOrderContentType(t),
                        currency: this.getCurrency(t.currency),
                        value: this.formatRevenue(t.revenue),
                        num_items: this.getOrderNumItems(t)
                    };
                    this.emitEvent("Purchase", e.eventId, a.ANALYTICS_COMPLETED_ORDER, n)
                }
                ,
                t.prototype.emitEvent = function(e, t, n, o) {
                    void 0 === o && (o = {}),
                    window.fbq("track", e, o, {
                        eventID: t
                    }),
                    this.addMonorailBatchEvent(u.objectAssignFilterUndefined({
                        eventName: n
                    }, {
                        eventId: t,
                        eventProperties: JSON.stringify(o)
                    }))
                }
                ,
                t.prototype.setLimitedDataUseMode = function() {
                    window.fbq("dataProcessingOptions", ["LDU"], 1, 1e3)
                }
                ,
                t.prototype.setPixelStub = function() {
                    window.fbq && "function" == typeof window.fbq || (window.fbq = function() {
                        window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments)
                    }
                    ,
                    window._fbq || (window._fbq = window.fbq),
                    window.fbq.push = window.fbq,
                    window.fbq.loaded = !0,
                    window.fbq.version = "2.0",
                    window.fbq.queue = [])
                }
                ,
                t.prototype.generateScriptTag = function() {
                    var e = s.virtualDocument().createElement("script");
                    return e.async = !0,
                    e.src = "https://connect.facebook.net/en_US/fbevents.js",
                    e
                }
                ,
                t.prototype.getFacebookPixelIds = function(e) {
                    for (var t = [], n = 0, o = e.pixelIds.concat([e.pixelId]); n < o.length; n++) {
                        var r = o[n];
                        null !== r && "" !== r && t.push(r)
                    }
                    return t
                }
                ,
                t.prototype.loadFacebookScript = function() {
                    var e = s.virtualDocument().getElementsByTagName("script")[0];
                    void 0 === e ? document.head.appendChild(this.generateScriptTag()) : e.parentNode.insertBefore(this.generateScriptTag(), e)
                }
                ,
                t.prototype.formatRevenue = function(e) {
                    return Number(e || 0).toFixed(2)
                }
                ,
                t.prototype.getCurrency = function(e) {
                    return e || "USD"
                }
                ,
                t.prototype.getProductContentIds = function(e) {
                    var t = e.productId || e.variantId || e.sku;
                    return t ? [t] : []
                }
                ,
                t.prototype.getProductContentType = function(e) {
                    return e.productId ? "product_group" : "product"
                }
                ,
                t.prototype.getProductNumItems = function(e) {
                    return e.quantity || this.getProductContentIds(e).length
                }
                ,
                t.prototype.getProductKey = function(e) {
                    return e.productId || e.variantId || e.sku
                }
                ,
                t.prototype.getOrderContentIds = function(e) {
                    for (var t = [], n = 0, o = e.products || []; n < o.length; n++) {
                        var r = o[n]
                          , i = this.getProductKey(r);
                        i && -1 === t.indexOf(i) && t.push(i)
                    }
                    return t
                }
                ,
                t.prototype.getOrderContentType = function(e) {
                    for (var t = 0, n = e.products || []; t < n.length; t++)
                        if (n[t].productId)
                            return "product_group";
                    return "product"
                }
                ,
                t.prototype.getOrderNumItems = function(e) {
                    for (var t = 0, n = 0, o = e.products || []; n < o.length; n++) {
                        var r = o[n];
                        this.getProductKey(r) && (t += r.quantity || 1)
                    }
                    return t
                }
                ,
                t.prototype.getEcommerceMetricsTag = function() {
                    return "facebook"
                }
                ,
                t.prototype.getIntegrationId = function() {
                    return "FacebookPixel"
                }
                ,
                t.prototype.getEcommercePixelIds = function() {
                    var e = this.options;
                    return this.getFacebookPixelIds(e)
                }
                ,
                t.defaultOptions = {
                    pixelId: "",
                    pixelIds: [],
                    agent: "shopify"
                },
                t
            }(a.EcommerceIntegration);
            t.FacebookPixel = _
        },
        2266: function(e, t, n) {
            "use strict";
            var o, r = this && this.__extends || (o = function(e, t) {
                return o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                ,
                o(e, t)
            }
            ,
            function(e, t) {
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            ), i = this && this.__assign || function() {
                return i = Object.assign || function(e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                        for (var r in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }
                ,
                i.apply(this, arguments)
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GoogleAnalytics = void 0;
            var a = n(9414)
              , s = n(5533)
              , c = n(8533)
              , u = n(9965)
              , d = n(4779)
              , p = n(8460)
              , l = function(e) {
                function t(n, o, r) {
                    var i = e.call(this, t.defaultOptions, o, r) || this;
                    return i.pageCalled = !1,
                    i.ecommerce = !1,
                    i.enhancedEcommerceLoaded = !1,
                    i
                }
                return r(t, e),
                t.prototype.initialize = function() {
                    this.pageCalled = !1,
                    this.setPixelStub(),
                    this.loadGAScript();
                    var n = this.options;
                    "localhost" === s.hostname() && (n.domain = "none"),
                    n.enhancedEcommerce && this.enhancedEcommerce(),
                    p.shouldSetGoogleConsentMode() && window.gtag("consent", "default", p.generateGoogleConsentModeObject()),
                    window.ga("create", n.trackingId, {
                        cookieDomain: n.domain || t.defaultOptions.domain,
                        siteSpeedSampleRate: n.siteSpeedSampleRate,
                        sampleRate: n.sampleRate,
                        allowLinker: !0
                    }),
                    (window.gaDevIds = window.gaDevIds || []).push("dNzQ1OW"),
                    n.doubleClick && window.ga("require", "displayfeatures"),
                    n.enhancedLinkAttribution && window.ga("require", "linkid"),
                    n.anonymizeIp && window.ga("set", "anonymizeIp", !0),
                    e.prototype.initialize.call(this)
                }
                ,
                t.prototype.name = function() {
                    return "Google Analytics"
                }
                ,
                t.prototype.type = function() {
                    return u.IntegrationTypes.ECOMMERCE
                }
                ,
                t.prototype.onConsentCollected = function(t) {
                    p.shouldSetGoogleConsentMode() && window.gtag("consent", "update", p.generateGoogleConsentModeObject()),
                    d.analyticsProcessingAllowed() ? delete window["ga-disable-" + this.options.trackingId] : window["ga-disable-" + this.options.trackingId] = !0,
                    e.prototype.onConsentCollected.call(this, t)
                }
                ,
                t.prototype.hasConsent = function(e) {
                    return d.analyticsProcessingAllowed(e)
                }
                ,
                t.prototype.identify = function(e) {
                    throw new Error("identify is not supported")
                }
                ,
                t.prototype.pseudoPageFromTrack = function(e) {
                    if (e.properties.hasOwnProperty("page")) {
                        var t = e.properties.page;
                        this.pageCalled && (t.search = ""),
                        this.page(t)
                    }
                }
                ,
                t.prototype.checkoutContactStepStarted = function(e) {
                    this.pseudoPageFromTrack(e)
                }
                ,
                t.prototype.checkoutShippingStepStarted = function(e) {
                    this.pseudoPageFromTrack(e)
                }
                ,
                t.prototype.checkoutPaymentStepStarted = function(e) {
                    this.pseudoPageFromTrack(e)
                }
                ,
                t.prototype.checkoutOnePageView = function(e) {}
                ,
                t.prototype.page = function(e) {
                    this.overrideDefaultPageProperties(e);
                    var t = this.options
                      , n = this.path(e)
                      , o = e.name || e.title
                      , r = {
                        page: n,
                        title: o
                    };
                    window.ga("set", r);
                    var i = {
                        page: n,
                        title: o,
                        location: e.url
                    };
                    if (this.pageCalled && delete i.location,
                    window.ga("send", "pageview", i),
                    this.addMonorailBatchEvent({
                        eventName: a.ANALYTICS_PAGE_VIEW,
                        eventProperties: JSON.stringify(i)
                    }),
                    e.name && t.trackNamedPages) {
                        var s = this.convertPageToTrack(e);
                        s.properties.nonInteraction = !0,
                        this.trackInternal(s)
                    }
                    this.pageCalled = !0
                }
                ,
                t.prototype.track = function(e) {}
                ,
                t.prototype.trackInternal = function(e) {
                    var t = this.options
                      , n = e.properties
                      , o = {
                        eventAction: e.event,
                        eventCategory: n.category || "All",
                        eventLabel: n.label,
                        eventValue: this.formatValue(n.value || n.revenue),
                        nonInteraction: Boolean(n.hasOwnProperty("nonInteraction") ? n.nonInteraction : t.nonInteraction)
                    };
                    window.ga("send", "event", o),
                    this.addMonorailBatchEvent({
                        eventName: a.ANALYTICS_GENERIC_EVENT,
                        eventProperties: JSON.stringify(o)
                    })
                }
                ,
                t.prototype.completedOrder = function(e) {
                    var t = e.properties
                      , n = t.total || t.revenue || 0
                      , o = this.getTransactionId(t)
                      , r = t.products || [];
                    if (o) {
                        this.ecommerce || (window.ga("require", "ecommerce"),
                        this.ecommerce = !0);
                        var i = {
                            shipping: t.shipping,
                            revenue: n,
                            tax: t.tax,
                            id: o,
                            currency: this.getCurrency(t.currency)
                        };
                        window.ga("ecommerce:addTransaction", i);
                        for (var s = [], c = 0, u = r; c < u.length; c++) {
                            var d = u[c]
                              , p = this.createProductTrack(t, d)
                              , l = {
                                category: p.category,
                                quantity: this.getProductQuantity(p),
                                price: p.price,
                                name: p.name,
                                sku: p.sku || p.variantId,
                                id: o,
                                currency: this.getCurrency(p.currency)
                            };
                            window.ga("ecommerce:addItem", l),
                            s.push(l)
                        }
                        window.ga("ecommerce:send"),
                        this.addMonorailBatchEvent({
                            eventName: a.ANALYTICS_COMPLETED_ORDER,
                            eventProperties: JSON.stringify({
                                orderInfo: i,
                                items: s
                            })
                        })
                    }
                }
                ,
                t.prototype.viewedProductVariant = function(e) {}
                ,
                t.prototype.viewedProductEnhanced = function(e) {
                    var t = e.properties;
                    this.loadEnhancedEcommerce(e);
                    var n = this.enhancedEcommerceTrackProduct(t);
                    window.ga("ec:setAction", "detail");
                    var o = this.pushEnhancedEcommerce(e);
                    this.addMonorailBatchEvent({
                        eventName: a.ANALYTICS_VIEWED_PRODUCT,
                        eventProperties: JSON.stringify({
                            item: n,
                            event: o
                        })
                    })
                }
                ,
                t.prototype.addedProductEnhanced = function(e) {
                    var t = e.properties;
                    this.loadEnhancedEcommerce(e);
                    var n = this.enhancedEcommerceTrackProduct(t);
                    window.ga("ec:setAction", "add");
                    var o = this.pushEnhancedEcommerce(e);
                    this.addMonorailBatchEvent({
                        eventName: a.ANALYTICS_ADDED_PRODUCT,
                        eventProperties: JSON.stringify({
                            item: n,
                            event: o
                        })
                    })
                }
                ,
                t.prototype.startedOrderEnhanced = function(e) {
                    var t = e.properties
                      , n = t.products || [];
                    this.loadEnhancedEcommerce(e);
                    for (var o = [], r = 0, i = n; r < i.length; r++) {
                        var s = i[r]
                          , c = this.createProductTrack(t, s)
                          , u = this.enhancedEcommerceTrackProduct(c);
                        o.push(u)
                    }
                    var d = t.step || 1;
                    window.ga("ec:setAction", "checkout", {
                        step: d
                    });
                    var p = this.pushEnhancedEcommerce(e);
                    this.addMonorailBatchEvent({
                        eventName: a.ANALYTICS_STARTED_ORDER,
                        eventProperties: JSON.stringify({
                            items: o,
                            checkoutStep: d,
                            event: p
                        })
                    })
                }
                ,
                t.prototype.completedOrderEnhanced = function(e) {
                    var t = e.properties
                      , n = t.total || t.revenue || 0
                      , o = this.getTransactionId(t)
                      , r = t.products || [];
                    if (o) {
                        this.loadEnhancedEcommerce(e);
                        for (var i = [], s = 0, c = r; s < c.length; s++) {
                            var u = c[s]
                              , d = this.createProductTrack(t, u)
                              , p = this.enhancedEcommerceTrackProduct(d);
                            i.push(p)
                        }
                        var l = {
                            id: o,
                            revenue: n,
                            tax: t.tax,
                            shipping: t.shipping,
                            coupon: t.coupon
                        };
                        window.ga("ec:setAction", "purchase", l);
                        var _ = this.pushEnhancedEcommerce(e);
                        this.addMonorailBatchEvent({
                            eventName: a.ANALYTICS_COMPLETED_ORDER,
                            eventProperties: JSON.stringify({
                                orderInfo: l,
                                items: i,
                                event: _
                            })
                        })
                    }
                }
                ,
                t.prototype.setPixelStub = function() {
                    (!window.ga || window.ga && "function" != typeof window.ga) && (window.ga = function() {
                        (window.ga.q = window.ga.q || []).push(arguments)
                    }
                    ),
                    (!window.gtag || window.gtag && "function" != typeof window.gtag) && (window.dataLayer = window.dataLayer || [],
                    window.gtag = function() {
                        window.dataLayer.push(arguments)
                    }
                    )
                }
                ,
                t.prototype.loadGAScript = function() {
                    window.GoogleAnalyticsObject = "ga",
                    window.ga.l = (new Date).getTime();
                    var e = c.virtualDocument().createElement("script");
                    e.async = !0,
                    e.src = "https://www.google-analytics.com/analytics.js";
                    var t = c.virtualDocument().getElementsByTagName("script")[0];
                    void 0 === t ? document.head.appendChild(e) : t.parentNode.insertBefore(e, t)
                }
                ,
                t.prototype.enhancedEcommerce = function() {
                    this.viewedProduct = this.viewedProductEnhanced,
                    this.addedProduct = this.addedProductEnhanced,
                    this.startedOrder = this.startedOrderEnhanced,
                    this.completedOrder = this.completedOrderEnhanced
                }
                ,
                t.prototype.path = function(e) {
                    var t = e.path;
                    return this.options.includeSearch && e.search && (t += e.search),
                    t
                }
                ,
                t.prototype.formatValue = function(e) {
                    return !e || e < 0 ? 0 : Math.round(e)
                }
                ,
                t.prototype.getProductQuantity = function(e) {
                    return e.quantity || 1
                }
                ,
                t.prototype.getCurrency = function(e) {
                    return e || "USD"
                }
                ,
                t.prototype.createProductTrack = function(e, t) {
                    var n = i({}, t);
                    return n.currency = t.currency || this.getCurrency(e.currency),
                    n
                }
                ,
                t.prototype.loadEnhancedEcommerce = function(e) {
                    this.enhancedEcommerceLoaded || (window.ga("require", "ec"),
                    this.enhancedEcommerceLoaded = !0);
                    var t = e.properties;
                    window.ga("set", "&cu", this.getCurrency(t.currency))
                }
                ,
                t.prototype.enhancedEcommerceTrackProduct = function(e) {
                    var t = {
                        id: e.sku || e.variantId,
                        name: e.name,
                        category: e.category,
                        quantity: this.getProductQuantity(e),
                        price: e.price,
                        brand: e.brand,
                        variant: e.variant,
                        currency: this.getCurrency(e.currency)
                    };
                    return e.coupon && (t.coupon = e.coupon),
                    window.ga("ec:addProduct", t),
                    t
                }
                ,
                t.prototype.pushEnhancedEcommerce = function(e) {
                    var t = e.properties
                      , n = {
                        eventCategory: t.category || "EnhancedEcommerce",
                        eventAction: e.event || "Action not defined",
                        eventLabel: t.label,
                        nonInteraction: !0
                    };
                    return window.ga("send", "event", n),
                    n
                }
                ,
                t.prototype.convertPageToTrack = function(e) {
                    return {
                        event: e.name ? "Viewed " + e.name + " Page" : "Loaded a Page",
                        properties: e.properties,
                        eventId: e.eventId
                    }
                }
                ,
                t.prototype.overrideDefaultPageProperties = function(e) {
                    for (var t in e.properties)
                        "properties" !== t && "name" !== t && t in e && (e[t] = e.properties[t])
                }
                ,
                t.prototype.getEcommerceMetricsTag = function() {
                    return "google_analytics"
                }
                ,
                t.prototype.getIntegrationId = function() {
                    return "GoogleAnalytics"
                }
                ,
                t.prototype.getEcommercePixelIds = function() {
                    return [this.options.trackingId]
                }
                ,
                t.prototype.getTransactionId = function(e) {
                    return e.orderId || e.checkoutId
                }
                ,
                t.defaultOptions = {
                    anonymizeIp: !1,
                    domain: "auto",
                    doubleClick: !1,
                    enhancedEcommerce: !1,
                    enhancedLinkAttribution: !1,
                    includeSearch: !1,
                    nonInteraction: !1,
                    siteSpeedSampleRate: 1,
                    sampleRate: 100,
                    trackNamedPages: !0,
                    trackingId: ""
                },
                t
            }(a.EcommerceIntegration);
            t.GoogleAnalytics = l
        },
        3988: function(e, t, n) {
            "use strict";
            var o, r = this && this.__extends || (o = function(e, t) {
                return o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                ,
                o(e, t)
            }
            ,
            function(e, t) {
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            ), i = this && this.__assign || function() {
                return i = Object.assign || function(e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                        for (var r in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }
                ,
                i.apply(this, arguments)
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.S2S = t.SHOP_ANALYTICS_TOKEN_NAME = t.HEADLESS_API_CLIENT_ID = t.HYDROGEN_API_CLIENT_ID = t.TEST_DEFAULT_PREVENTED_ADDED_PRODUCT_EVENT_NAME = t.STOREFRONT_API_ADDED_PRODUCT_EVENT_NAME = t.CHECKOUT_SHIPPING_INFO_SUBMITTED_EVENT_NAME = t.CHECKOUT_ADDRESS_INFO_SUBMITTED_EVENT_NAME = t.CHECKOUT_CONTACT_INFO_SUBMITTED_EVENT_NAME = t.COLLECTION_PAGE_RENDERED_EVENT_NAME = t.CHECKOUT_STARTED_ONCE_PER_CHECKOUT_EVENT_NAME = t.CHECKOUT_COMPLETED_EVENT_NAME = t.CHECKOUT_STARTED_EVENT_NAME = t.SEARCH_SUBMITTED_EVENT_NAME = t.PAYMENT_INFO_SUBMITTED_EVENT_NAME = t.TEST_PRODUCT_ADDED_TO_CART_SERVER_CHANGELOG_EVENT_NAME = t.TEST_PRODUCT_ADDED_TO_CART_PERMALINK_EVENT_NAME = t.PRODUCT_ADDED_TO_CART_NEXT_EVENT_NAME = t.PRODUCT_ADDED_TO_CART_LEGACY_EVENT_NAME = t.PRODUCT_ADDED_TO_CART_EVENT_NAME = t.PRODUCT_PAGE_RENDERED_EVENT_NAME = t.PAGE_RENDERED_EVENT_NAME = void 0;
            var a = n(9414)
              , s = n(4252)
              , c = n(4779)
              , u = n(5533)
              , d = n(6573)
              , p = n(1482)
              , l = n(9974)
              , _ = n(9965)
              , f = n(357)
              , E = n(3420)
              , h = n(4779)
              , g = n(3811);
            t.PAGE_RENDERED_EVENT_NAME = "page_rendered",
            t.PRODUCT_PAGE_RENDERED_EVENT_NAME = "product_page_rendered",
            t.PRODUCT_ADDED_TO_CART_EVENT_NAME = "product_added_to_cart",
            t.PRODUCT_ADDED_TO_CART_LEGACY_EVENT_NAME = "product_added_to_cart_legacy",
            t.PRODUCT_ADDED_TO_CART_NEXT_EVENT_NAME = "product_added_to_cart_next",
            t.TEST_PRODUCT_ADDED_TO_CART_PERMALINK_EVENT_NAME = "test_product_added_to_cart_permalink",
            t.TEST_PRODUCT_ADDED_TO_CART_SERVER_CHANGELOG_EVENT_NAME = "test_product_added_to_cart_server_changelog",
            t.PAYMENT_INFO_SUBMITTED_EVENT_NAME = "payment_info_submitted",
            t.SEARCH_SUBMITTED_EVENT_NAME = "search_submitted",
            t.CHECKOUT_STARTED_EVENT_NAME = "checkout_started",
            t.CHECKOUT_COMPLETED_EVENT_NAME = "checkout_completed",
            t.CHECKOUT_STARTED_ONCE_PER_CHECKOUT_EVENT_NAME = "checkout_started_once_per_checkout",
            t.COLLECTION_PAGE_RENDERED_EVENT_NAME = "collection_page_rendered",
            t.CHECKOUT_CONTACT_INFO_SUBMITTED_EVENT_NAME = "checkout_contact_info_submitted",
            t.CHECKOUT_ADDRESS_INFO_SUBMITTED_EVENT_NAME = "checkout_address_info_submitted",
            t.CHECKOUT_SHIPPING_INFO_SUBMITTED_EVENT_NAME = "checkout_shipping_info_submitted",
            t.STOREFRONT_API_ADDED_PRODUCT_EVENT_NAME = "test_storefront_api_added_product",
            t.TEST_DEFAULT_PREVENTED_ADDED_PRODUCT_EVENT_NAME = "test_wpm_form_prevent_default",
            t.HYDROGEN_API_CLIENT_ID = 6167201,
            t.HEADLESS_API_CLIENT_ID = 12875497473,
            t.SHOP_ANALYTICS_TOKEN_NAME = "shop_analytics";
            var v = function(e) {
                function n(t, o, r) {
                    var a = e.call(this, n.defaultOptions, i({}, o), r) || this;
                    return a.pageID = f.default.microSessionId,
                    a
                }
                return r(n, e),
                n.prototype.name = function() {
                    return "S2S"
                }
                ,
                n.prototype.type = function() {
                    return _.IntegrationTypes.ECOMMERCE
                }
                ,
                n.prototype.hasConsent = function(e) {
                    return h.analyticsProcessingAllowed(e) || h.marketingAllowed(e)
                }
                ,
                n.prototype.identify = function(e) {
                    throw new Error("identify is not supported")
                }
                ,
                n.prototype.page = function(e) {
                    var n = {
                        event_id: e.eventId,
                        referrer: e.referrer,
                        canonical_url: l.canonical()
                    };
                    this.produceToMonorail({
                        eventName: t.PAGE_RENDERED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: n
                    })
                }
                ,
                n.prototype.track = function(e) {}
                ,
                n.prototype.viewedProduct = function(e) {
                    var n = i(i({}, e.properties), {
                        quantity: 1
                    })
                      , o = {
                        event_id: e.eventId,
                        products: this.formatProductJSON([n]),
                        total_value: this.formatRevenue(n.price),
                        currency: this.getCurrency(n.currency)
                    };
                    this.produceToMonorail({
                        eventName: t.PRODUCT_PAGE_RENDERED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.addedProductNext = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        products: this.formatProductJSON([n]),
                        total_value: this.formatRevenue(n.price),
                        currency: this.getCurrency(n.currency),
                        cart_token: n.cartToken
                    };
                    this.produceToMonorail({
                        eventName: t.PRODUCT_ADDED_TO_CART_NEXT_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.addedProductPermalinkTest = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        products: this.formatProductJSON([n]),
                        total_value: this.formatRevenue(n.price),
                        currency: this.getCurrency(n.currency),
                        cart_token: n.cartToken
                    };
                    this.produceToMonorail({
                        eventName: t.TEST_PRODUCT_ADDED_TO_CART_PERMALINK_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.testProductAddedToCartServerChangelog = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        products: this.formatProductJSON([n]),
                        total_value: this.formatRevenue(n.price),
                        currency: this.getCurrency(n.currency),
                        cart_token: n.cartToken
                    };
                    this.produceToMonorail({
                        eventName: t.TEST_PRODUCT_ADDED_TO_CART_SERVER_CHANGELOG_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.testWpmFormPreventDefault = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        products: this.formatProductJSON([n]),
                        total_value: this.formatRevenue(n.price),
                        currency: this.getCurrency(n.currency),
                        cart_token: n.cartToken
                    };
                    this.produceToMonorail({
                        eventName: t.TEST_DEFAULT_PREVENTED_ADDED_PRODUCT_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.storefrontApiAddedProduct = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        products: this.formatProductJSON([n]),
                        total_value: this.formatRevenue(n.price),
                        currency: this.getCurrency(n.currency),
                        cart_token: n.cartToken
                    };
                    this.produceToMonorail({
                        eventName: t.STOREFRONT_API_ADDED_PRODUCT_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.addedProduct = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        products: this.formatProductJSON([n]),
                        total_value: this.formatRevenue(n.price),
                        currency: this.getCurrency(n.currency),
                        cart_token: n.cartToken
                    };
                    g.default.isEnabled(g.SERVER_EMITTED_ADD_TO_CART_NEW_REPORTIFY_MIGRATION) ? this.produceToMonorail({
                        eventName: t.PRODUCT_ADDED_TO_CART_LEGACY_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    }) : this.produceToMonorail({
                        eventName: t.PRODUCT_ADDED_TO_CART_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.addedPayment = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        total_value: this.formatRevenue(n.total),
                        currency: this.getCurrency(n.currency)
                    };
                    this.produceToMonorail({
                        eventName: t.PAYMENT_INFO_SUBMITTED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.checkoutContactInfoSubmitted = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        email: n.email,
                        phone: n.phone
                    };
                    this.produceToMonorail({
                        eventName: t.CHECKOUT_CONTACT_INFO_SUBMITTED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.checkoutAddressInfoSubmitted = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        billing_address_city: n.city,
                        billing_address_country: n.country,
                        phone: n.phone,
                        billing_address_region: n.province
                    };
                    this.produceToMonorail({
                        eventName: t.CHECKOUT_ADDRESS_INFO_SUBMITTED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.checkoutShippingInfoSubmitted = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        total_value: n.total,
                        currency: n.currency
                    };
                    this.produceToMonorail({
                        eventName: t.CHECKOUT_SHIPPING_INFO_SUBMITTED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.performedSearch = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        search_string: this.getSearchString(n.query)
                    };
                    this.produceToMonorail({
                        eventName: t.SEARCH_SUBMITTED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.startedOrder = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        products: this.formatProductJSON(n.products),
                        total_value: this.formatRevenue(n.total),
                        currency: this.getCurrency(n.currency)
                    };
                    this.produceToMonorail({
                        eventName: t.CHECKOUT_STARTED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.startedOrderOncePerCheckout = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        products: this.formatProductJSON(n.products),
                        total_value: this.formatRevenue(n.total),
                        currency: this.getCurrency(n.currency)
                    };
                    this.produceToMonorail({
                        eventName: t.CHECKOUT_STARTED_ONCE_PER_CHECKOUT_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o,
                        eventSchemaId: p.storefrontAnalyticsSchemaIdValidation
                    })
                }
                ,
                n.prototype.completedOrder = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        first_name: n.customerEventData.customer.firstName,
                        last_name: n.customerEventData.customer.lastName,
                        email: n.customerEventData.customer.emailAddress,
                        phone: n.customerEventData.customer.phoneNumber,
                        products: this.formatProductJSON(n.products),
                        total_value: this.formatRevenue(n.total),
                        currency: this.getCurrency(n.currency),
                        billing_address_city: n.customerEventData.address.city,
                        billing_address_region: n.customerEventData.address.province,
                        billing_address_country: n.customerEventData.address.country,
                        billing_address_zipcode: n.customerEventData.address.zip
                    };
                    n.orderId && (o.order_id = n.orderId.toString()),
                    this.produceToMonorail({
                        eventName: t.CHECKOUT_COMPLETED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    }),
                    e.emitConversionEvent && this.produceToMonorail({
                        eventName: t.CHECKOUT_COMPLETED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o,
                        source: this.getSource() + "-browser"
                    })
                }
                ,
                n.prototype.viewedProductCategory = function(e) {
                    var n = e.properties
                      , o = {
                        event_id: e.eventId,
                        collection_id: n.collectionId,
                        collection_name: n.collectionName,
                        currency: n.currency
                    };
                    this.produceToMonorail({
                        eventName: t.COLLECTION_PAGE_RENDERED_EVENT_NAME,
                        eventObject: e,
                        eventPayload: o
                    })
                }
                ,
                n.prototype.formatProductJSON = function(e) {
                    var t = this
                      , n = [];
                    return e.forEach((function(e) {
                        n.push(JSON.stringify({
                            variant_id: t.formatNumericID(e.variantId),
                            product_id: t.formatNumericID(e.productId),
                            product_gid: e.productGid,
                            name: e.name,
                            price: t.formatRevenue(e.price),
                            sku: e.sku,
                            brand: e.brand,
                            variant: e.variant,
                            category: e.category,
                            quantity: Number(e.quantity || 0)
                        }))
                    }
                    )),
                    n
                }
                ,
                n.prototype.produceToMonorail = function(e) {
                    var t, n = e.eventName, o = e.eventObject, r = e.eventPayload, i = e.eventSchemaId, a = e.source;
                    if (t = i || (this.isCustomStorefront(n) ? p.customStorefrontAnalyticsSchemaId : p.storefrontAnalyticsSchemaId),
                    this.isCustomStorefront(n)) {
                        var s = this.eventWithMetadata(n, this.payloadWithCustomStorefrontMetadata(r), o, a);
                        this.emitToCustomSchema(s, t)
                    } else {
                        var c = this.eventWithMetadata(n, r, o, a);
                        t === p.storefrontAnalyticsSchemaId ? this.emitToStoreFrontCustomerTracking(c) : this.emitToCustomSchema(c, t)
                    }
                }
                ,
                n.prototype.emitToCustomSchema = function(e, t) {
                    var n = {
                        schemaId: t,
                        payload: e
                    };
                    d.produce([n])
                }
                ,
                n.prototype.emitToStoreFrontCustomerTracking = function(e) {
                    var t = i(i({}, e), {
                        emitted_to_v5: !0
                    })
                      , n = {
                        schemaId: p.legacyStorefrontAnalyticsSchemaId,
                        payload: t
                    }
                      , o = ["ccpa_enforced", "gdpr_enforced", "gdpr_enforced_as_string", "is_persistent_cookie"]
                      , r = Object.entries(e).filter((function(e) {
                        var t = e[0];
                        return !o.includes(t)
                    }
                    )).reduce((function(e, t) {
                        var n, o = t[0], r = t[1];
                        return i(i({}, e), ((n = {})[o] = r,
                        n))
                    }
                    ), {})
                      , a = {
                        schemaId: p.storefrontAnalyticsSchemaId,
                        payload: r
                    };
                    d.produce([n, a])
                }
                ,
                n.prototype.eventWithMetadata = function(e, t, n, o) {
                    var r, a = n.s2sMetadata;
                    return i(i({
                        api_client_id: this.getApiClientId()
                    }, t), i(i(i(i(i({
                        event_name: e,
                        shop_id: f.default.shopId,
                        facebook_capi_enabled: this.isCapiEnabled(),
                        event_time: (new Date).getTime(),
                        event_source_url: u.href(),
                        unique_token: f.default.uniqToken,
                        page_id: this.pageID,
                        source: o || this.getSource(),
                        ccpa_enforced: c.saleOfDataNotAllowed(),
                        gdpr_enforced: c.notMarketingOrAnalyticsAllowed(),
                        gdpr_enforced_as_string: c.notMarketingOrAnalyticsAllowed().toString(),
                        navigation_type: null == a ? void 0 : a.navigationType,
                        navigation_api: null == a ? void 0 : a.navigationApi,
                        user_agent: null === (r = null === window || void 0 === window ? void 0 : window.navigator) || void 0 === r ? void 0 : r.userAgent,
                        is_persistent_cookie: s.isPersistentCookie(),
                        customer_id: this.getCustomerId(),
                        checkout_token: f.default.checkoutToken,
                        deprecated_visit_token: f.default.visitToken,
                        session_id: E.getSessionId(),
                        asset_version_id: "67031bb556ecae068d9d26b268af7634adc01a0c",
                        shop_analytics_token: this.getShopAnalyticsToken()
                    }, f.default.isMerchantRequest && {
                        is_merchant_request: f.default.isMerchantRequest
                    }), "addApiSource"in n && {
                        add_to_cart_api_source: n.addApiSource
                    }), "shopifyEmitted"in n && {
                        shopify_emitted: n.shopifyEmitted
                    }), {
                        analytics_allowed: h.analyticsProcessingAllowed(),
                        marketing_allowed: h.marketingAllowed(),
                        sale_of_data_allowed: h.saleOfDataAllowed(),
                        preferences_allowed: h.preferencesProcessingAllowed()
                    }), f.default.eventMetadataId && {
                        event_metadata_id: f.default.eventMetadataId
                    }))
                }
                ,
                n.prototype.payloadWithCustomStorefrontMetadata = function(e) {
                    var t, n = this.options;
                    return i(i({}, e), {
                        hydrogenSubchannelId: String(null !== (t = n.cartSubchannelId) && void 0 !== t ? t : ""),
                        api_client_id: n.cartApiClientId
                    })
                }
                ,
                n.prototype.isCapiEnabled = function() {
                    return this.options.facebookCapiEnabled
                }
                ,
                n.prototype.getSource = function() {
                    return this.options.source
                }
                ,
                n.prototype.getCustomerId = function() {
                    return this.options.customerId
                }
                ,
                n.prototype.getSearchString = function(e) {
                    return e || ""
                }
                ,
                n.prototype.formatRevenue = function(e) {
                    return Number(e || 0)
                }
                ,
                n.prototype.formatNumericID = function(e) {
                    return null == e || "" === e ? null : Number(e)
                }
                ,
                n.prototype.getCurrency = function(e) {
                    return e || "USD"
                }
                ,
                n.prototype.getIntegrationId = function() {
                    return "S2S"
                }
                ,
                n.prototype.getEcommerceMetricsTag = function() {
                    return "S2S"
                }
                ,
                n.prototype.getEcommercePixelIds = function() {
                    return []
                }
                ,
                n.prototype.getApiClientId = function() {
                    return this.options.apiClientId
                }
                ,
                n.prototype.setPixelStub = function() {}
                ,
                n.prototype.isCustomStorefront = function(e) {
                    var n = this.options
                      , o = [t.PAGE_RENDERED_EVENT_NAME, t.PAYMENT_INFO_SUBMITTED_EVENT_NAME, t.CHECKOUT_CONTACT_INFO_SUBMITTED_EVENT_NAME, t.CHECKOUT_ADDRESS_INFO_SUBMITTED_EVENT_NAME, t.CHECKOUT_SHIPPING_INFO_SUBMITTED_EVENT_NAME, t.CHECKOUT_STARTED_EVENT_NAME, t.CHECKOUT_STARTED_ONCE_PER_CHECKOUT_EVENT_NAME, t.CHECKOUT_COMPLETED_EVENT_NAME]
                      , r = [t.HYDROGEN_API_CLIENT_ID, t.HEADLESS_API_CLIENT_ID];
                    return o.includes(e) && r.includes(n.cartApiClientId)
                }
                ,
                n.prototype.getShopAnalyticsToken = function() {
                    return s.read(t.SHOP_ANALYTICS_TOKEN_NAME)
                }
                ,
                n.defaultOptions = {
                    facebookCapiEnabled: !1,
                    agent: "shopify",
                    source: "trekkie-unknown"
                },
                n
            }(a.EcommerceIntegration);
            t.S2S = v
        },
        3082: function(e, t, n) {
            "use strict";
            var o, r = this && this.__extends || (o = function(e, t) {
                return o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                ,
                o(e, t)
            }
            ,
            function(e, t) {
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.CampaignManager = t.TimestampManager = t.SessionAttribution = t.orderCompletionEventKey = t.sessionAttributionTimestampKey = t.sessionAttributionParamsKey = void 0;
            var i = n(4252)
              , a = n(8416)
              , s = n(5533)
              , c = n(9965)
              , u = n(9414)
              , d = n(4779);
            t.sessionAttributionParamsKey = "_shopify_sa_p",
            t.sessionAttributionTimestampKey = "_shopify_sa_t",
            t.orderCompletionEventKey = "Completed Order";
            var p = function(e) {
                function n(t, n, o) {
                    return e.call(this, t, n, o) || this
                }
                return r(n, e),
                n.prototype.initialize = function() {
                    this.timestampManager = new l,
                    this.campaignManager = new _,
                    e.prototype.initialize.call(this)
                }
                ,
                n.prototype.name = function() {
                    return "Session Attribution"
                }
                ,
                n.prototype.type = function() {
                    return c.IntegrationTypes.INTEGRATION
                }
                ,
                n.prototype.hasConsent = function(e) {
                    return d.analyticsProcessingAllowed(e)
                }
                ,
                n.prototype.identify = function(e) {}
                ,
                n.prototype.page = function(e) {
                    this.attributeSession()
                }
                ,
                n.prototype.track = function(e) {
                    if (u.analyticsEvents.checkoutOnePageView.test(e.event)) {
                        var n = e.properties;
                        this.page(n.page)
                    } else
                        e.event === t.orderCompletionEventKey && (i.clear(t.sessionAttributionTimestampKey),
                        i.clear(t.sessionAttributionParamsKey))
                }
                ,
                n.prototype.attributeSession = function() {
                    var e = new Date
                      , t = s.search()
                      , n = this.campaignManager.constructCanonicalUtmString(t);
                    this.timestampManager.extend(e.toJSON()),
                    this.campaignManager.extend(n)
                }
                ,
                n
            }(a.Integration);
            t.SessionAttribution = p;
            var l = function() {
                function e() {}
                return e.prototype.fetch = function() {
                    return i.read(t.sessionAttributionTimestampKey)
                }
                ,
                e.prototype.extend = function(e) {
                    i.cleanupMyShopifyDotComCookie(t.sessionAttributionTimestampKey),
                    i.write(t.sessionAttributionTimestampKey, e, !1)
                }
                ,
                e.prototype.isValid = function(e) {
                    return this.isWithin30MinuteCutOff(e) && this.isSameDayAs(e)
                }
                ,
                e.prototype.isWithin30MinuteCutOff = function(e) {
                    return this.testStoredTimestamp((function(e, t) {
                        return t.getTime() - e.getTime() <= 18e5
                    }
                    ), e)
                }
                ,
                e.prototype.isSameDayAs = function(e) {
                    return this.testStoredTimestamp((function(e, t) {
                        return e.getUTCDate() === t.getUTCDate()
                    }
                    ), e)
                }
                ,
                e.prototype.testStoredTimestamp = function(e, t) {
                    var n = this.fetch();
                    if (!n)
                        return !1;
                    try {
                        return e(new Date(n), t)
                    } catch (e) {
                        return !1
                    }
                }
                ,
                e
            }();
            t.TimestampManager = l;
            var _ = function() {
                function e() {}
                return e.prototype.fetch = function() {
                    return i.read(t.sessionAttributionParamsKey)
                }
                ,
                e.prototype.extend = function(e) {
                    "" === e && (e = this.fetch() || ""),
                    i.cleanupMyShopifyDotComCookie(t.sessionAttributionParamsKey),
                    i.write(t.sessionAttributionParamsKey, e, !1)
                }
                ,
                e.prototype.isValid = function(e) {
                    return "" === e || this.fetch() === e
                }
                ,
                e.prototype.constructCanonicalUtmString = function(t) {
                    if ("" === t || null == t || "?" === t)
                        return "";
                    t = "?" === t[0] ? t.slice(1) : t;
                    for (var n = {}, o = 0, r = t.split("&"); o < r.length; o++) {
                        var i = r[o].split("=");
                        if (!(i.length < 2)) {
                            var a = this.decodeReplacingPlus(i[0])
                              , s = this.decodeReplacingPlus(i[1]);
                            s && a && (n[a] = s)
                        }
                    }
                    return e.acceptedQueryStringParams.filter((function(e) {
                        return n[e]
                    }
                    )).map((function(e) {
                        return encodeURIComponent(e) + "=" + encodeURIComponent(n[e])
                    }
                    )).join("&")
                }
                ,
                e.prototype.decodeReplacingPlus = function(e) {
                    return decodeURIComponent(e.replace(/\+/g, " "))
                }
                ,
                e.acceptedQueryStringParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref", "gclid", "fbclid", "shpxid"],
                e
            }();
            t.CampaignManager = _
        },
        2319: function(e, t, n) {
            "use strict";
            var o, r = this && this.__extends || (o = function(e, t) {
                return o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                ,
                o(e, t)
            }
            ,
            function(e, t) {
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            ), i = this && this.__assign || function() {
                return i = Object.assign || function(e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                        for (var r in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }
                ,
                i.apply(this, arguments)
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Trekkie = void 0;
            var a = n(8416)
              , s = n(1482)
              , c = n(6573)
              , u = n(4252)
              , d = n(9965)
              , p = n(357)
              , l = n(9414)
              , _ = n(4779)
              , f = function(e) {
                function t(t, n, o) {
                    var r = e.call(this, {}, {}, o) || this;
                    return r.defaultAttributes = p.default.attributes,
                    r
                }
                return r(t, e),
                t.prototype.initialize = function() {
                    u.cleanupOverScopedCookies(),
                    e.prototype.initialize.call(this)
                }
                ,
                t.prototype.name = function() {
                    return "Trekkie"
                }
                ,
                t.prototype.type = function() {
                    return d.IntegrationTypes.INTEGRATION
                }
                ,
                t.prototype.hasConsent = function(e) {
                    return _.analyticsProcessingAllowed(e)
                }
                ,
                t.prototype.identify = function(e) {}
                ,
                t.prototype.page = function(e) {
                    var t = s.appNameToPageViewSchemaId[p.default.appName];
                    this.emit("page", e, t)
                }
                ,
                t.prototype.track = function(e) {
                    if (l.analyticsEvents.checkoutOnePageView.test(e.event)) {
                        var t = e.properties;
                        this.page(t.page)
                    } else {
                        var n = s.extractSchemaIdFromEventName(e.event);
                        this.emit("track", e, n)
                    }
                }
                ,
                t.prototype.emit = function(e, t, n) {
                    p.default.incrementMicroSessionCount(),
                    t = a.Integration.flatten(t);
                    var o = i(i({}, t), p.default.attributes);
                    o.eventType = e,
                    n && c.produce([{
                        schemaId: n,
                        payload: o
                    }])
                }
                ,
                t
            }(a.Integration);
            t.Trekkie = f
        },
        3811: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.SERVER_EMITTED_ADD_TO_CART_NEW_REPORTIFY_MIGRATION = t.TREKKIE_GOOGLE_CONSENT_MODE_WITH_CONSENT_SIGNALS = t.TREKKIE_COOKIE_DOMAIN_FIX = void 0;
            var n = new (function() {
                function e() {
                    this.betaFlagsProps = []
                }
                return e.prototype.initialize = function(e) {
                    void 0 === e && (e = []),
                    this.betaFlagsProps = e
                }
                ,
                e.prototype.resetState = function() {
                    this.betaFlagsProps = []
                }
                ,
                Object.defineProperty(e.prototype, "betaFlags", {
                    get: function() {
                        return this.betaFlagsProps
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                e.prototype.isEnabled = function(e) {
                    return !!this.betaFlagsProps && this.betaFlagsProps.includes(e)
                }
                ,
                e
            }());
            t.TREKKIE_COOKIE_DOMAIN_FIX = "65f19447",
            t.TREKKIE_GOOGLE_CONSENT_MODE_WITH_CONSENT_SIGNALS = "6ebf83d2",
            t.SERVER_EMITTED_ADD_TO_CART_NEW_REPORTIFY_MIGRATION = "bdb960ec",
            t.default = n
        },
        4252: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.resetCookieImpl = t.determineCookieDomain = t.cleanupOverScopedCookies = t.clear = t.write = t.isPersistentCookie = t.read = t.allowed = t.disable = t.enabled = t.cleanupMyShopifyDotComCookie = t.cookieImpl = t.parseDocumentCookie = void 0;
            var o, r, i = n(8533), a = n(9965), s = n(3082), c = n(4779), u = n(2729), d = n(5533), p = n(9974), l = n(3811), _ = "myshopify.com", f = [_, "spin.dev"], E = new Date(0);
            function h(e) {
                for (var t = {}, n = 0, o = e.split(/ *; */); n < o.length; n++) {
                    var r = o[n].split("=");
                    try {
                        t[decodeURIComponent(r[0])] = decodeURIComponent(r[1] || "")
                    } catch (e) {}
                }
                return t
            }
            function g(e) {
                if (void 0 === o && (!l.default.isEnabled(l.TREKKIE_COOKIE_DOMAIN_FIX) || T(e)))
                    if (function() {
                        for (var e = 0, t = f; e < t.length; e++)
                            if (m(t[e]))
                                return !0;
                        return !1
                    }())
                        o = d.hostname();
                    else {
                        for (var t = "", n = 0, r = d.hostname().split(".").reverse(); n < r.length; n++) {
                            var i = r[n];
                            t = "" === t ? "." + i : "." + i + t;
                            var a = p.generateShopifyDValue();
                            if (y(e, a, 0, t),
                            v(e, a))
                                return void (o = t)
                        }
                        o = ""
                    }
            }
            function v(e, n) {
                var o = t.cookieImpl.read(e);
                return !!o && o === n
            }
            function y(e, n, o, r, i) {
                void 0 === i && (i = "Lax");
                var a = {
                    domain: r,
                    path: "/",
                    maxage: o,
                    samesite: i
                };
                t.cookieImpl.write(e, n, a)
            }
            function m(e) {
                var t = d.hostname().split(".").reverse()
                  , n = e.split(".").reverse();
                return t[0] === n[0] && t[1] === n[1]
            }
            function C() {
                return m(_)
            }
            function T(e) {
                return t.cookieImpl.enabled() && t.cookieImpl.allowed(e)
            }
            t.parseDocumentCookie = h,
            t.cookieImpl = {
                parse: h,
                read: function(e) {
                    if (t.cookieImpl.enabled())
                        return t.cookieImpl.parse(i.virtualDocument().cookie())[e]
                },
                write: function(e, n, o) {
                    if (void 0 === o && (o = {}),
                    T(e)) {
                        var r = encodeURIComponent(e) + "=" + encodeURIComponent(n);
                        o.maxage && (o.maxage < 0 ? o.expires = E : o.expires = new Date((new Date).getTime() + o.maxage)),
                        o.path && (r += "; path=" + o.path),
                        o.domain && (r += "; domain=" + o.domain),
                        (o.maxage < 0 || o.expires) && (r += "; expires=" + o.expires.toUTCString()),
                        o.samesite ? r += "; SameSite=" + o.samesite : r += "; SameSite=Lax",
                        o.secure && (r += "; secure");
                        try {
                            i.virtualDocument().setCookie(r)
                        } catch (e) {
                            t.cookieImpl.disable()
                        }
                    }
                },
                enabled: function(e) {
                    if (void 0 === e && (e = !1),
                    !e && void 0 !== r)
                        return r;
                    try {
                        r = i.virtualDocument().cookieEnabled() && void 0 !== i.virtualDocument().cookie()
                    } catch (e) {
                        r = !1
                    }
                    return r
                },
                disable: function() {
                    r = !1
                },
                allowed: function(e) {
                    if ([u.shortTermKey, u.longTermKey].includes(e))
                        return c.haveConsentForMarketingOrAnalytics();
                    var t = function(e) {
                        var t;
                        return ((t = {})[s.sessionAttributionParamsKey] = a.ConsentPurposes.ANALYTICS,
                        t[s.sessionAttributionTimestampKey] = a.ConsentPurposes.ANALYTICS,
                        t)[e]
                    }(e);
                    return void 0 === t || c.haveConsentForPurpose(t)
                },
                isPersistentCookie: function() {
                    var e = t.cookieImpl.read("_shopify_m");
                    return void 0 === e || "persistent" === e
                }
            },
            t.cleanupMyShopifyDotComCookie = function(e) {
                if (C()) {
                    var t = e + "=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";
                    i.virtualDocument().setCookie(t)
                }
            }
            ,
            t.enabled = function() {
                return t.cookieImpl.enabled()
            }
            ,
            t.disable = function() {
                t.cookieImpl.disable()
            }
            ,
            t.allowed = function(e) {
                return t.cookieImpl.allowed(e)
            }
            ,
            t.read = function(e) {
                return t.cookieImpl.read(e)
            }
            ,
            t.isPersistentCookie = function() {
                return t.cookieImpl.isPersistentCookie()
            }
            ,
            t.write = function(e, t, n, r) {
                void 0 === r && (r = "Lax"),
                g(e),
                y(e, t, n ? 31104e6 : 18e5, o, r)
            }
            ,
            t.clear = function(e) {
                g(e),
                y(e, "", -1, o),
                y(e, "", -1, "")
            }
            ,
            t.cleanupOverScopedCookies = function() {
                if (C())
                    for (var e = 0, t = ["_shopify_s", "_shopify_sa_p", "_shopify_sa_t", "_shopify_y"]; e < t.length; e++) {
                        var n = t[e] + "=; domain=." + _ + "; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";
                        i.virtualDocument().setCookie(n)
                    }
            }
            ,
            t.determineCookieDomain = g,
            t.resetCookieImpl = function() {
                o = void 0,
                r = void 0
            }
        },
        4779: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.anyRelevantConsentSignals = t.shouldShowBanner = t.saleOfDataAllowed = t.preferencesProcessingAllowed = t.marketingAllowed = t.analyticsProcessingAllowed = t.haveConsentForMarketingOrAnalytics = t.haveConsentForPurpose = t.notMarketingOrAnalyticsAllowed = t.saleOfDataNotAllowed = t.TrackingEvents = void 0;
            var o = n(669)
              , r = n(9965);
            function i(e) {
                return e && e.detail ? e.detail.analyticsAllowed : o.analyticsProcessingAllowed()
            }
            function a(e) {
                return e && e.detail ? e.detail.marketingAllowed : o.marketingAllowed()
            }
            function s(e) {
                return e && e.detail ? e.detail.preferencesAllowed : o.preferencesProcessingAllowed()
            }
            function c(e) {
                return e && e.detail ? e.detail.saleOfDataAllowed : o.saleOfDataAllowed()
            }
            t.TrackingEvents = o.TrackingEvents,
            t.saleOfDataNotAllowed = function() {
                return !c()
            }
            ,
            t.notMarketingOrAnalyticsAllowed = function() {
                return !(a() && i())
            }
            ,
            t.haveConsentForPurpose = function(e) {
                switch (e) {
                case r.ConsentPurposes.ANALYTICS:
                    return i();
                case r.ConsentPurposes.MARKETING:
                    return a();
                case r.ConsentPurposes.SALE_OF_DATA:
                    return c();
                case r.ConsentPurposes.PREFERENCES:
                    return s();
                default:
                    return !0
                }
            }
            ,
            t.haveConsentForMarketingOrAnalytics = function(e) {
                return e ? Boolean(e.analyticsAllowed || e.marketingAllowed) : this.haveConsentForPurpose(r.ConsentPurposes.ANALYTICS) || this.haveConsentForPurpose(r.ConsentPurposes.MARKETING)
            }
            ,
            t.analyticsProcessingAllowed = i,
            t.marketingAllowed = a,
            t.preferencesProcessingAllowed = s,
            t.saleOfDataAllowed = c,
            t.shouldShowBanner = function() {
                return o.shouldShowBanner()
            }
            ,
            t.anyRelevantConsentSignals = function() {
                var e = o.currentVisitorConsent();
                return Boolean((null == e ? void 0 : e.marketing) || (null == e ? void 0 : e.analytics))
            }
        },
        357: function(e, t, n) {
            "use strict";
            var o = this && this.__assign || function() {
                return o = Object.assign || function(e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                        for (var r in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }
                ,
                o.apply(this, arguments)
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(2729)
              , i = n(4252)
              , a = n(1037)
              , s = new (function() {
                function e() {
                    this.defaultAttributes = {}
                }
                return e.prototype.initialize = function(e) {
                    var t = !1;
                    e.isServerSideCookieWritingEnabled && (t = !0),
                    this.uniqueIdManager = new r.UniqueIdManager(t),
                    this.defaultAttributes.appName = e.appName,
                    this.defaultAttributes.uniqToken = this.uniqueIdManager.longTerm(),
                    this.defaultAttributes.visitToken = this.uniqueIdManager.shortTerm(),
                    this.defaultAttributes.microSessionId = r.buildToken(),
                    this.defaultAttributes.microSessionCount = 0,
                    this.defaultAttributes.isPersistentCookie = i.isPersistentCookie(),
                    e.defaultAttributes && (this.defaultAttributes = o(o({}, e.defaultAttributes), this.defaultAttributes),
                    a.setMetricsOptions(e.defaultAttributes.shopId))
                }
                ,
                e.prototype.incrementMicroSessionCount = function() {
                    this.defaultAttributes.microSessionCount++
                }
                ,
                e.prototype.refreshVisitorTokens = function() {
                    this.defaultAttributes.uniqToken = this.uniqueIdManager.longTerm(),
                    this.defaultAttributes.visitToken = this.uniqueIdManager.shortTerm()
                }
                ,
                e.prototype.resetState = function() {
                    this.defaultAttributes = {}
                }
                ,
                Object.defineProperty(e.prototype, "attributes", {
                    get: function() {
                        return this.defaultAttributes
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "appName", {
                    get: function() {
                        return this.defaultAttributes.appName
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "checkoutToken", {
                    get: function() {
                        return this.defaultAttributes.checkoutToken
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "uniqToken", {
                    get: function() {
                        return this.defaultAttributes.uniqToken
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "visitToken", {
                    get: function() {
                        return this.defaultAttributes.visitToken
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "shopId", {
                    get: function() {
                        return this.defaultAttributes.shopId
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "microSessionId", {
                    get: function() {
                        return this.defaultAttributes.microSessionId
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "microSessionCount", {
                    get: function() {
                        return this.defaultAttributes.microSessionCount
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "isMerchantRequest", {
                    get: function() {
                        return Boolean(this.defaultAttributes.isMerchantRequest)
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "eventMetadataId", {
                    get: function() {
                        return this.defaultAttributes.eventMetadataId
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                e
            }());
            t.default = s
        },
        8006: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.setupEventIdService = void 0;
            var o = n(3552);
            t.setupEventIdService = function() {
                return o.setupEventIdService()
            }
        },
        8460: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.generateGoogleConsentModeObject = t.shouldSetGoogleConsentMode = void 0;
            var o = n(3811)
              , r = n(4779);
            t.shouldSetGoogleConsentMode = function() {
                return !o.default.isEnabled(o.TREKKIE_GOOGLE_CONSENT_MODE_WITH_CONSENT_SIGNALS) || r.shouldShowBanner() || r.anyRelevantConsentSignals()
            }
            ,
            t.generateGoogleConsentModeObject = function() {
                return {
                    ad_storage: r.marketingAllowed() ? "granted" : "denied",
                    ad_user_data: r.marketingAllowed() ? "granted" : "denied",
                    ad_personalization: r.marketingAllowed() ? "granted" : "denied",
                    analytics_storage: r.analyticsProcessingAllowed() ? "granted" : "denied"
                }
            }
        },
        5533: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.isShopifyDotCom = t.search = t.protocol = t.port = t.pathname = t.origin = t.setHref = t.href = t.hostname = t.host = t.hash = void 0;
            var o = n(2164);
            function r() {
                return o.virtualWindow().location().hostname
            }
            t.hash = function() {
                return o.virtualWindow().location().hash
            }
            ,
            t.host = function() {
                return o.virtualWindow().location().host
            }
            ,
            t.hostname = r,
            t.href = function() {
                return o.virtualWindow().location().href
            }
            ,
            t.setHref = function(e) {
                o.virtualWindow().location().href = e
            }
            ,
            t.origin = function() {
                var e = o.virtualWindow().location();
                return e.origin ? e.origin : e.protocol + "//" + e.hostname + (e.port ? ":" + e.port : "")
            }
            ,
            t.pathname = function() {
                return o.virtualWindow().location().pathname
            }
            ,
            t.port = function() {
                return o.virtualWindow().location().port
            }
            ,
            t.protocol = function() {
                return o.virtualWindow().location().protocol
            }
            ,
            t.search = function() {
                return o.virtualWindow().location().search
            }
            ,
            t.isShopifyDotCom = function(e) {
                return null !== (e = e || r()).match(/(^|\.)shopify\.com$/)
            }
        },
        1037: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.sendToBugsnag = t.sendBugsnagXhr = t.shouldSendToBugsnag = t.reportError = t.logMetricToMonorail = t.setMetricsOptions = t.setGlobalSerializedAppConfig = t.errorsSchemaId = t.metricsSchemaId = void 0;
            var o, r, i = n(6573), a = n(5533), s = n(9974);
            t.metricsSchemaId = "trekkie_metrics/2.0",
            t.errorsSchemaId = "trekkie_errors/2.0",
            t.setGlobalSerializedAppConfig = function(e) {
                o = e
            }
            ,
            t.setMetricsOptions = function(e) {
                r = e
            }
            ,
            t.logMetricToMonorail = function(e, n) {
                var o = {
                    metric_name: e
                };
                r && (o.shop_id = r),
                n && (o.metadata = n),
                i.produce([{
                    schemaId: t.metricsSchemaId,
                    payload: o
                }])
            }
            ,
            t.reportError = function(e, n, c) {
                var u = {
                    name: n.name,
                    line: n.lineNumber || n.line,
                    script: n.fileName || n.sourceURL || n.script,
                    stack: n.stackTrace || n.stack || n.description,
                    message: n.message,
                    url: a.href(),
                    context: void 0 !== e ? e : null,
                    appConfig: o || null,
                    notes: c
                };
                if (this.sendToBugsnag(u),
                !s.isUnstableBrowserVersion()) {
                    var d = {
                        error_name: "reportError_" + e
                    };
                    r && (d.shop_id = r),
                    i.produce([{
                        schemaId: t.errorsSchemaId,
                        payload: d
                    }])
                }
            }
            ,
            t.shouldSendToBugsnag = function() {
                return 100 * Math.random() < 2.5
            }
            ,
            t.sendBugsnagXhr = function(e, t, n, o, r, i, a, s) {
                try {
                    var c = new XMLHttpRequest;
                    c.open("POST", "https://notify.bugsnag.com/", !0),
                    c.setRequestHeader("Content-Type", "application/json"),
                    c.setRequestHeader("Bugsnag-Api-Key", "acd98d4f5c3b14bef3d8703f0ae1d8e8"),
                    c.setRequestHeader("Bugsnag-Payload-Version", "5"),
                    c.send(JSON.stringify({
                        payloadVersion: 5,
                        notifier: {
                            name: "Trekkie",
                            version: e,
                            url: "-"
                        },
                        events: [{
                            exceptions: [{
                                errorClass: t,
                                stacktrace: [n],
                                type: "browserjs"
                            }],
                            context: o,
                            app: {
                                releaseStage: "production",
                                version: e,
                                id: "trekkie"
                            },
                            metaData: {
                                app: {
                                    s2sSource: r
                                },
                                request: {
                                    shopId: i,
                                    shopUrl: window.location.href
                                },
                                device: {
                                    userAgent: window.navigator.userAgent
                                },
                                "Additional Notes": {
                                    appConfig: a,
                                    notes: s
                                }
                            },
                            unhandled: !1
                        }]
                    }))
                } catch (e) {}
            }
            ,
            t.sendToBugsnag = function(e) {
                var t;
                if (this.shouldSendToBugsnag()) {
                    var n = "67031bb556ecae068d9d26b268af7634adc01a0c"
                      , o = null
                      , r = null
                      , i = null;
                    if (e.appConfig)
                        try {
                            var a = JSON.parse(e.appConfig);
                            a && (o = a.Trekkie.appName,
                            r = null === (t = a.S2S) || void 0 === t ? void 0 : t.source,
                            i = a.Trekkie.defaultAttributes.shopId)
                        } catch (e) {}
                    var s = e.context ? e.context : r
                      , c = {
                        file: o ? "checkout" === o ? "trekkie.storefront." + n + ".min.js" : "trekkie." + o + "." + n + ".min.js" : "trekkie." + n + ".min.js",
                        lineNumber: "1",
                        columnNumber: "1",
                        method: e.context
                    }
                      , u = e.context;
                    if (e.stack) {
                        u = e.stack.split("\n")[0];
                        var d = e.stack.match(/([0-9]+):([0-9]+)/);
                        if (d && d.length > 2 && (c.lineNumber = d[1],
                        c.columnNumber = d[2],
                        parseInt(c.lineNumber, 10) > 1e5))
                            return
                    }
                    this.sendBugsnagXhr(n, u, c, s, r, i, e.appConfig, e.notes)
                }
            }
        },
        6573: function(e, t) {
            "use strict";
            var n = this && this.__spreadArrays || function() {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                    e += arguments[t].length;
                var o = Array(e)
                  , r = 0;
                for (t = 0; t < n; t++)
                    for (var i = arguments[t], a = 0, s = i.length; a < s; a++,
                    r++)
                        o[r] = i[a];
                return o
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.isSendBeaconSupported = t.produce = t.flushBatchEvents = t.getBatchEvents = t.addBatchEvent = t.setMonorailRegion = t.batchEndpoints = void 0,
            t.batchEndpoints = {
                global: "https://monorail-edge.shopifysvc.com/unstable/produce_batch",
                staging: "https://monorail-edge-staging.shopifycloud.com/unstable/produce_batch",
                canada: "https://monorail-edge-ca.shopifycloud.com/unstable/produce_batch"
            };
            var o = t.batchEndpoints.global
              , r = new Array;
            function i(e, t) {
                if (a())
                    try {
                        if (window.navigator.sendBeacon.bind(window.navigator)(e, t))
                            return !0
                    } catch (e) {}
                var n = new XMLHttpRequest;
                try {
                    n.open("POST", e, !0),
                    n.setRequestHeader("Content-Type", "text/plain"),
                    n.send(t)
                } catch (e) {
                    console.log(e)
                }
                return !1
            }
            function a() {
                return window && window.navigator && "function" == typeof window.navigator.sendBeacon && !(-1 !== window.navigator.userAgent.lastIndexOf("iPhone; CPU iPhone OS 12_") || -1 !== window.navigator.userAgent.lastIndexOf("iPad; CPU OS 12_"))
            }
            t.setMonorailRegion = function(e) {
                var n = window.location.origin;
                "shop_domain" === e && n ? o = n + "/.well-known/shopify/monorail/unstable/produce_batch" : e in t.batchEndpoints && (o = t.batchEndpoints[e])
            }
            ,
            t.addBatchEvent = function(e) {
                var t = (new Date).getTime()
                  , n = {
                    schema_id: e.schemaId,
                    payload: e.payload,
                    metadata: {
                        event_created_at_ms: t
                    }
                };
                r.push(n)
            }
            ,
            t.getBatchEvents = function() {
                return r
            }
            ,
            t.flushBatchEvents = function() {
                var e = n(r);
                r.length = 0,
                function(e) {
                    if (0 !== e.length) {
                        var t = {
                            event_sent_at_ms: (new Date).getTime()
                        }
                          , n = {};
                        n.metadata = t,
                        n.events = e,
                        i(o, JSON.stringify(n))
                    }
                }(e)
            }
            ,
            t.produce = function(e) {
                if (0 !== e.length) {
                    var t = (new Date).getTime()
                      , n = {
                        event_sent_at_ms: t
                    }
                      , r = {};
                    r.metadata = n,
                    r.events = [];
                    for (var a = 0, s = e; a < s.length; a++) {
                        var c = s[a];
                        r.events.push({
                            schema_id: c.schemaId,
                            payload: c.payload,
                            metadata: {
                                event_created_at_ms: t
                            }
                        })
                    }
                    return i(o, JSON.stringify(r))
                }
            }
            ,
            t.isSendBeaconSupported = a
        },
        8628: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.getNavigationTypeLegacy = t.getNavigationTypeExperimental = void 0;
            var o = n(1037);
            t.getNavigationTypeExperimental = function() {
                try {
                    var e = (null === performance || void 0 === performance ? void 0 : performance.getEntriesByType) && (null === performance || void 0 === performance ? void 0 : performance.getEntriesByType("navigation"));
                    if (e && e[0]) {
                        var t = performance.getEntriesByType("navigation")[0].type;
                        return t && t.toString()
                    }
                } catch (e) {
                    o.reportError("PerformanceNavigationTiming_Error", e)
                }
            }
            ,
            t.getNavigationTypeLegacy = function() {
                var e, t;
                try {
                    if (PerformanceNavigation && null !== (null === (e = null === performance || void 0 === performance ? void 0 : performance.navigation) || void 0 === e ? void 0 : e.type) && void 0 !== (null === (t = null === performance || void 0 === performance ? void 0 : performance.navigation) || void 0 === t ? void 0 : t.type)) {
                        var n = performance.navigation.type;
                        switch (n) {
                        case PerformanceNavigation.TYPE_NAVIGATE:
                            return "navigate";
                        case PerformanceNavigation.TYPE_RELOAD:
                            return "reload";
                        case PerformanceNavigation.TYPE_BACK_FORWARD:
                            return "back_forward";
                        default:
                            return "unknown: " + n
                        }
                    }
                } catch (e) {
                    o.reportError("Performance.Navigation_Error", e)
                }
            }
        },
        3420: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.getSessionId = void 0;
            var o, r = n(2729);
            t.getSessionId = function() {
                return o || (o = function() {
                    var e, t, n;
                    try {
                        n = (null === (e = window.Shopify) || void 0 === e ? void 0 : e.evids) ? null === (t = window.Shopify) || void 0 === t ? void 0 : t.evids("session_started", {
                            analyticsFramework: "trekkie"
                        }) : r.buildToken()
                    } catch (e) {
                        n = r.buildToken()
                    }
                    return n
                }()),
                o
            }
        },
        2729: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.hexTime = t.buildToken = t.UniqueIdManager = t.longTermKey = t.shortTermKey = void 0;
            var o = n(2164)
              , r = n(3811)
              , i = n(4252)
              , a = n(1037);
            t.shortTermKey = "_shopify_s",
            t.longTermKey = "_shopify_y";
            var s = "xxxx-4xxx-xxxx-xxxxxxxxxxxx"
              , c = function() {
                function e(e) {
                    this.isCookieSetServerSideEventFired = !1,
                    this.isServerSideCookieWritingEnabled = e
                }
                return e.prototype.fetchOrSet = function(e, t, n) {
                    if (!i.enabled())
                        return "00000000-0000-0000-4000-000000000000";
                    var o = i.read(t)
                      , r = !n;
                    o || (o = u(),
                    r = !0,
                    n && !this.isCookieSetServerSideEventFired && (a.logMetricToMonorail("serverSideCookieNotSet_" + t),
                    this.isCookieSetServerSideEventFired = !0)),
                    r && i.write(t, o, e);
                    var s = i.read(t);
                    return void 0 === s ? "00000000-0000-0000-5000-000000000000" : s
                }
                ,
                e.prototype.shortTerm = function() {
                    var e, n, o, i;
                    return r.default.isEnabled(r.TREKKIE_COOKIE_DOMAIN_FIX) ? null !== (n = null === (e = window.ShopPay) || void 0 === e ? void 0 : e.trackingVisit) && void 0 !== n ? n : this.fetchOrSet(!1, t.shortTermKey, this.isServerSideCookieWritingEnabled) : null !== (i = null === (o = window.ShopPay) || void 0 === o ? void 0 : o.trackingVisit) && void 0 !== i ? i : this.fetchOrSet(!1, t.shortTermKey, !1)
                }
                ,
                e.prototype.longTerm = function() {
                    var e, n;
                    return null !== (n = null === (e = window.ShopPay) || void 0 === e ? void 0 : e.trackingUnique) && void 0 !== n ? n : this.fetchOrSet(!0, t.longTermKey, this.isServerSideCookieWritingEnabled)
                }
                ,
                e.prototype.resetIsCookieSetServerSideEventFired = function() {
                    this.isCookieSetServerSideEventFired = !1
                }
                ,
                e
            }();
            function u() {
                var e = "";
                try {
                    var t = o.virtualWindow().crypto()
                      , n = new Uint16Array(31);
                    t.getRandomValues(n);
                    var r = 0;
                    e = s.replace(/[x]/g, (function(e) {
                        for (var t = [], o = 1; o < arguments.length; o++)
                            t[o - 1] = arguments[o];
                        var i = n[r] % 16;
                        return r++,
                        ("x" === e ? i : 3 & i | 8).toString(16)
                    }
                    )).toUpperCase()
                } catch (t) {
                    e = s.replace(/[x]/g, (function(e) {
                        for (var t = [], n = 1; n < arguments.length; n++)
                            t[n - 1] = arguments[n];
                        var o = 16 * Math.random() | 0;
                        return ("x" === e ? o : 3 & o | 8).toString(16)
                    }
                    )).toUpperCase()
                }
                return d() + "-" + e
            }
            function d() {
                var e, t = 0;
                e = (new Date).getTime() >>> 0;
                try {
                    t = performance.now() >>> 0
                } catch (e) {
                    t = 0
                }
                return Math.abs(e + t).toString(16).toLowerCase().padStart(8, "0")
            }
            t.UniqueIdManager = c,
            t.buildToken = u,
            t.hexTime = d
        },
        9974: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.isPseudoPageEvent = t.canonical = t.generateShopifyDValue = t.isUnstableBrowserVersion = t.UNSTABLE_BROWSER_VERSION_SET = t.objectAssignFilterUndefined = void 0;
            var o = n(2164)
              , r = n(9414)
              , i = n(8533)
              , a = /^https?:\/\//;
            t.objectAssignFilterUndefined = function(e, t) {
                for (var n in t)
                    void 0 !== t[n] && (e[n] = t[n]);
                return e
            }
            ,
            t.UNSTABLE_BROWSER_VERSION_SET = new Set(["Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"]),
            t.isUnstableBrowserVersion = function() {
                return t.UNSTABLE_BROWSER_VERSION_SET.has(o.virtualWindow().userAgent())
            }
            ,
            t.generateShopifyDValue = function() {
                return (new Date).toJSON()
            }
            ,
            t.canonical = function() {
                for (var e = i.virtualDocument().getElementsByTagName("link"), t = 0; t < e.length; t++) {
                    var n = e[t];
                    if ("canonical" === n.getAttribute("rel")) {
                        var o = n.getAttribute("href");
                        if (!a.test(o))
                            continue;
                        if (o.replace(a, "").length <= 5)
                            continue;
                        return o
                    }
                }
                return ""
            }
            ,
            t.isPseudoPageEvent = function(e) {
                for (var t = 0, n = r.PSEUDO_PAGE_EVENTS; t < n.length; t++) {
                    var o = n[t]
                      , i = r.analyticsEvents[o];
                    if (i && i.test(e))
                        return !0
                }
                return !1
            }
        },
        8511: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.WebPixelEventNameMap = void 0,
            t.WebPixelEventNameMap = {
                "Page View": "page_viewed",
                "Performed Search": "search_submitted",
                "Viewed Product": "product_viewed",
                "Started Order": "checkout_started",
                "Viewed Product Category": "collection_viewed",
                "Viewed Product Variant": "product_variant_viewed",
                "Added Product": "product_added_to_cart",
                "Added Payment": "payment_info_submitted",
                "Completed Order": "checkout_completed",
                "Checkout Contact Step Started": "checkout_contact_step_started",
                "Checkout Contact Info Submitted": "checkout_contact_info_submitted",
                "Checkout Address Info Submitted": "checkout_address_info_submitted",
                "Checkout Shipping Step Started": "checkout_shipping_step_started",
                "Checkout Shipping Info Submitted": "checkout_shipping_info_submitted",
                "Checkout Payment Step Started": "checkout_payment_step_started"
            }
        },
        1074: function(e, t, n) {
            "use strict";
            var o = this && this.__assign || function() {
                return o = Object.assign || function(e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                        for (var r in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }
                ,
                o.apply(this, arguments)
            }
            ;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.replayAnalyticsQueue = t.Tricorder = void 0;
            var r = n(8533)
              , i = n(5533)
              , a = n(6573)
              , s = n(1037)
              , c = n(8006)
              , u = n(4779)
              , d = n(2729)
              , p = n(1482)
              , l = n(8628)
              , _ = n(3988)
              , f = n(9974)
              , E = n(1037)
              , h = n(357)
              , g = n(8511)
              , v = n(3811)
              , y = function() {
                function e(e, t, n) {
                    var o, r;
                    this.integrations = [],
                    this.allIntegrationsHaveLoaded = !1,
                    this.handleConsentCollectedBinded = this.handleConsentCollected.bind(this),
                    this.config = t,
                    this.navigationInfo = this.getNavigationType(),
                    this.configureMonorailRegion(this.config.Trekkie),
                    c.setupEventIdService(),
                    h.default.initialize(t.Trekkie),
                    v.default.initialize(t.Trekkie.enabledBetaFlags),
                    s.logMetricToMonorail("navigation-" + (null === (o = this.navigationInfo) || void 0 === o ? void 0 : o.navigationApi) + "-" + (null === (r = this.navigationInfo) || void 0 === r ? void 0 : r.navigationType)),
                    this.logAssetContext(t),
                    this.addBuyWithPrimePresenceListener(t),
                    this.initialize(e, t, n)
                }
                return e.prototype.configureMonorailRegion = function(e) {
                    var t = "global";
                    (null == e ? void 0 : e.monorailRegion) && (t = null == e ? void 0 : e.monorailRegion),
                    (null == e ? void 0 : e.development) && (t = "staging"),
                    a.setMonorailRegion(t)
                }
                ,
                e.prototype.logAssetContext = function(e) {
                    var t, n, o, r, i;
                    a.addBatchEvent({
                        schemaId: p.trekkieAssetContextSchemaId,
                        payload: {
                            build_id: "67031bb556ecae068d9d26b268af7634adc01a0c",
                            page_url: window.location.href,
                            app_name: null === (t = e.Trekkie) || void 0 === t ? void 0 : t.appName,
                            shop_id: null === (o = null === (n = e.Trekkie) || void 0 === n ? void 0 : n.defaultAttributes) || void 0 === o ? void 0 : o.shopId,
                            monorail_region: (null === (r = e.Trekkie) || void 0 === r ? void 0 : r.monorailRegion) || "not_set",
                            source: null === (i = e.S2S) || void 0 === i ? void 0 : i.source
                        }
                    })
                }
                ,
                e.prototype.addBuyWithPrimePresenceListener = function(e) {
                    var t, n, r = null === (n = null === (t = e.Trekkie) || void 0 === t ? void 0 : t.defaultAttributes) || void 0 === n ? void 0 : n.shopId;
                    r && window.addEventListener("message", (function(e) {
                        var t, n, i, s, c, u;
                        try {
                            if ("https://order.buywithprime.amazon.com/" === e.origin) {
                                var d = null === (n = null === (t = window.ShopifyAnalytics) || void 0 === t ? void 0 : t.meta) || void 0 === n ? void 0 : n.product
                                  , l = (null === (i = null == d ? void 0 : d.variants) || void 0 === i ? void 0 : i.length) > 0 ? null === (s = null == d ? void 0 : d.variants[0]) || void 0 === s ? void 0 : s.id : void 0
                                  , _ = (null === (u = null === (c = window.ShopifyAnalytics) || void 0 === c ? void 0 : c.meta) || void 0 === u ? void 0 : u.selectedVariantId) || l
                                  , f = {
                                    schemaId: p.buyWithPrimePresenceSchemaId,
                                    payload: o(o(o({
                                        shop_id: r
                                    }, e.data && {
                                        event_message: e.data
                                    }), d && {
                                        product_id: d.id
                                    }), _ && {
                                        product_variant_id: Number(_)
                                    })
                                };
                                a.produce([f])
                            }
                        } catch (e) {
                            E.reportError("buyWithPrimeError", e)
                        }
                    }
                    ))
                }
                ,
                e.prototype.getNavigationType = function() {
                    try {
                        var e = "PerformanceNavigationTiming"
                          , t = l.getNavigationTypeExperimental();
                        return t || (t = l.getNavigationTypeLegacy(),
                        e = "performance.navigation"),
                        t ? {
                            navigationType: t,
                            navigationApi: e
                        } : {
                            navigationType: "unknown",
                            navigationApi: "unknown"
                        }
                    } catch (e) {
                        s.reportError("navigation_api_error", e)
                    }
                    return {
                        navigationType: "error",
                        navigationApi: "error"
                    }
                }
                ,
                e.prototype.initialize = function(e, t, n) {
                    this.loadIntegrations(e, t, n)
                }
                ,
                e.prototype.getS2SEventId = function(e, t, n) {
                    var o, r, i, a;
                    void 0 === e && (e = void 0),
                    void 0 === t && (t = {});
                    var s = {
                        navigationApi: this.navigationInfo.navigationApi,
                        navigationType: this.navigationInfo.navigationType
                    }
                      , c = e === _.TEST_DEFAULT_PREVENTED_ADDED_PRODUCT_EVENT_NAME || "Added Product Next" === e ? "Added Product" : e
                      , u = g.WebPixelEventNameMap[c];
                    try {
                        if ("product_added_to_cart" === u && (null === (o = window.Shopify) || void 0 === o ? void 0 : o.evids)) {
                            var p = function(e) {
                                if (e.productId && e.variantId)
                                    return e.productId.toString() + "-" + e.variantId.toString()
                            }(t)
                              , l = null !== (r = m[e]) && void 0 !== r ? r : m.default;
                            a = window.Shopify.evids(u, {
                                analyticsFramework: l,
                                cacheKey: p
                            })
                        } else
                            a = "checkout_completed" === u && n ? n : (null === (i = window.Shopify) || void 0 === i ? void 0 : i.evids) && u ? window.Shopify.evids(u, {
                                analyticsFramework: "trekkie"
                            }) : d.buildToken()
                    } catch (e) {
                        a = d.buildToken()
                    }
                    return {
                        s2sMetadata: s,
                        eventId: "string" == typeof a && a.length > 0 ? a : d.buildToken()
                    }
                }
                ,
                e.prototype.loadIntegrations = function(e, t, n) {
                    var o = this
                      , r = this.waitFor(e.length, (function() {
                        try {
                            n()
                        } catch (e) {
                            s.reportError("readyCallback", e)
                        }
                        o.allIntegrationsHaveLoaded = !0,
                        o.flushMonorailEventsIfLoaded()
                    }
                    ));
                    e.forEach((function(e) {
                        var n = e[0]
                          , i = e[1];
                        try {
                            if (t[n] && "object" == typeof t[n]) {
                                var a = new i({},t[n],r);
                                a.initializeOrAwaitConsent(),
                                o.integrations.push(a),
                                "Trekkie" === a.name() && (o.trekkie = a)
                            } else
                                r()
                        } catch (e) {
                            r(),
                            s.reportError("loadIntegration", e)
                        }
                    }
                    )),
                    this.addConsentCollectedListener()
                }
                ,
                e.prototype.handleConsentCollected = function(e) {
                    h.default.refreshVisitorTokens(),
                    this.integrations.forEach((function(t) {
                        t.onConsentCollected(e)
                    }
                    )),
                    a.flushBatchEvents()
                }
                ,
                e.prototype.addConsentCollectedListener = function() {
                    document.addEventListener(u.TrackingEvents.CONSENT_COLLECTED, this.handleConsentCollectedBinded)
                }
                ,
                e.prototype.removeConsentCollectedListener = function() {
                    document.removeEventListener(u.TrackingEvents.CONSENT_COLLECTED, this.handleConsentCollectedBinded)
                }
                ,
                e.prototype.identify = function(e, t, n) {
                    void 0 === e && (e = ""),
                    void 0 === t && (t = {});
                    var o = this.getS2SEventId();
                    e instanceof Object && (t = e,
                    e = "");
                    for (var r = 0, i = this.integrations; r < i.length; r++) {
                        var a = i[r];
                        try {
                            var c = {
                                id: e,
                                properties: t,
                                eventId: o.eventId,
                                s2sMetadata: o.s2sMetadata
                            };
                            a.identify(c)
                        } catch (e) {
                            s.reportError("identify", e)
                        }
                    }
                    this.flushMonorailEventsIfLoaded()
                }
                ,
                e.prototype.page = function(e, t, n) {
                    void 0 === e && (e = ""),
                    void 0 === t && (t = {});
                    var o = this.getS2SEventId("Page View");
                    e instanceof Object && (t = e,
                    e = "");
                    for (var r = this.generatePageObject(e, t, o.eventId, o.s2sMetadata), i = 0, a = this.integrations; i < a.length; i++) {
                        var c = a[i];
                        try {
                            c.emitEventOrAwaitConsent("page", r)
                        } catch (e) {
                            s.reportError("page", e)
                        }
                    }
                    return this.flushMonorailEventsIfLoaded(),
                    o.eventId
                }
                ,
                e.prototype.track = function(e, t, n, o, r) {
                    void 0 === e && (e = ""),
                    void 0 === t && (t = {});
                    var i = "Checkout One Page View" === e ? "Page View" : e
                      , a = this.getS2SEventId(i, t, n);
                    e instanceof Object && (t = e,
                    e = "");
                    for (var c = {
                        event: e,
                        properties: this.constructTrackArgs(e, t, a),
                        eventId: a.eventId,
                        s2sMetadata: a.s2sMetadata,
                        emitConversionEvent: o,
                        addApiSource: null == r ? void 0 : r.addApiSource,
                        shopifyEmitted: null == r ? void 0 : r.shopifyEmitted
                    }, u = 0, d = this.integrations; u < d.length; u++) {
                        var p = d[u];
                        try {
                            p.emitEventOrAwaitConsent("track", c)
                        } catch (e) {
                            s.reportError("track", e)
                        }
                    }
                    return this.flushMonorailEventsIfLoaded(),
                    a.eventId
                }
                ,
                e.prototype.flushMonorailEventsIfLoaded = function() {
                    this.allIntegrationsHaveLoaded && a.flushBatchEvents()
                }
                ,
                e.prototype.ready = function(e) {
                    try {
                        e()
                    } catch (e) {
                        s.reportError("ready", e)
                    }
                }
                ,
                e.prototype.waitFor = function(e, t) {
                    return 0 === e ? (setTimeout(t, 0),
                    function() {}
                    ) : function() {
                        0 == --e && setTimeout(t, 0)
                    }
                }
                ,
                e.prototype.generatePageObject = function(e, t, n, o) {
                    var a = i.href()
                      , s = a.indexOf("?");
                    s = (a = -1 === s ? "" : a.slice(s)).indexOf("#"),
                    a = "?" === (a = -1 === s ? a : a.slice(0, s)) ? "" : a;
                    var c = "shopifyEmitted"in t ? Boolean(t.shopifyEmitted) : void 0;
                    return {
                        name: e,
                        referrer: r.virtualDocument().referrer(),
                        path: i.pathname(),
                        search: a,
                        title: r.virtualDocument().title(),
                        url: this.url(),
                        properties: t,
                        eventId: n,
                        s2sMetadata: o,
                        shopifyEmitted: c
                    }
                }
                ,
                e.prototype.url = function() {
                    var e = f.canonical();
                    if (e)
                        return e.indexOf("?") > 0 ? e : e + i.search();
                    var t = i.href()
                      , n = t.indexOf("#");
                    return -1 === n ? t : t.slice(0, n)
                }
                ,
                e.prototype.constructTrackArgs = function(e, t, n) {
                    if (void 0 === t && (t = {}),
                    f.isPseudoPageEvent(e)) {
                        var r = t
                          , i = r.name
                          , a = r.path;
                        if (i && a) {
                            var s = this.generatePageObject(i, {
                                path: a
                            }, n.eventId, n.s2sMetadata);
                            return o(o({}, t), {
                                page: s
                            })
                        }
                    }
                    return t
                }
                ,
                e.prototype.destroy = function() {
                    this.removeConsentCollectedListener()
                }
                ,
                e
            }();
            t.Tricorder = y,
            t.replayAnalyticsQueue = function(e, t) {
                for (var n = 0, o = t; n < o.length; n++)
                    e[s = (a = o[n])[0]] === e.ready && e[s].apply(e, a.slice(1));
                for (var r = 0, i = t; r < i.length; r++) {
                    var a, s;
                    e[s = (a = i[r])[0]] && e[s] !== e.ready && e[s].apply(e, a.slice(1))
                }
            }
            ;
            var m = {
                test_wpm_form_prevent_default: "wpm-form-prevent-default",
                "Added Product Next": "trekkie-next",
                default: "trekkie"
            }
        },
        8533: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.virtualDocument = void 0;
            var n = new (function() {
                function e() {}
                return e.prototype.cookieEnabled = function() {
                    return window.navigator.cookieEnabled
                }
                ,
                e.prototype.cookie = function() {
                    return document.cookie
                }
                ,
                e.prototype.setCookie = function(e) {
                    document.cookie = e
                }
                ,
                e.prototype.body = function() {
                    return document.body
                }
                ,
                e.prototype.referrer = function() {
                    return document.referrer
                }
                ,
                e.prototype.title = function() {
                    return document.title
                }
                ,
                e.prototype.createElement = function(e) {
                    return document.createElement(e)
                }
                ,
                e.prototype.dispatchEvent = function(e) {
                    return document.dispatchEvent(e)
                }
                ,
                e.prototype.querySelector = function(e) {
                    return document.querySelector(e)
                }
                ,
                e.prototype.querySelectorAll = function(e) {
                    return document.querySelectorAll(e)
                }
                ,
                e.prototype.documentElement = function() {
                    return document.documentElement
                }
                ,
                e.prototype.getElementsByTagName = function(e) {
                    return document.getElementsByTagName(e)
                }
                ,
                e.prototype.createCustomEvent = function(e, t) {
                    try {
                        return new CustomEvent(e,t)
                    } catch (o) {
                        var n = document.createEvent("CustomEvent");
                        return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
                        n
                    }
                }
                ,
                e
            }());
            t.virtualDocument = function() {
                return n
            }
        },
        2164: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.virtualWindow = void 0;
            var n = new (function() {
                function e(e) {
                    this.nativeWindow = e
                }
                return e.prototype.location = function() {
                    return this.nativeWindow.location
                }
                ,
                e.prototype.userAgent = function() {
                    return this.nativeWindow.navigator.userAgent
                }
                ,
                e.prototype.crypto = function() {
                    return this.nativeWindow.crypto || this.nativeWindow.msCrypto
                }
                ,
                e.prototype.top = function() {
                    return this.nativeWindow.top ? new e(this.nativeWindow.top) : void 0
                }
                ,
                e.prototype.parent = function() {
                    return this.nativeWindow.parent ? new e(this.nativeWindow.parent) : void 0
                }
                ,
                e.prototype.postMessage = function(e, t, n) {
                    this.nativeWindow.postMessage(e, t, n)
                }
                ,
                e.prototype.addEventListener = function(e, t, n) {
                    this.nativeWindow.addEventListener(e, t, n)
                }
                ,
                e.prototype.onload = function() {
                    throw new Error("Do not use window.onload due to compatibility reasons. Use addEventListener instead of window.onload")
                }
                ,
                e
            }())(window);
            t.virtualWindow = function() {
                return n
            }
        },
        3552: function(e, t, n) {
            "use strict";
            n.r(t),
            n.d(t, {
                setupEventIdService: function() {
                    return _
                }
            });
            const o = "sh"
              , r = "shu"
              , i = ["page_viewed", "collection_viewed", "product_viewed", "product_variant_viewed", "search_submitted", "product_added_to_cart", "product_added_to_cart_next", "checkout_started", "checkout_completed", "payment_info_submitted", "checkout_contact_step_started", "checkout_contact_info_submitted", "checkout_address_info_submitted", "checkout_shipping_step_started", "checkout_shipping_info_submitted", "checkout_payment_step_started", "session_started", "test_wpm_form_prevent_default"]
              , a = "wpm"
              , s = "trekkie"
              , c = "wpm-form-prevent-default"
              , u = "trekkie-next";
            let d, p;
            function l(e) {
                return `${e || o}-${function() {
                    const e = "xxxx-4xxx-xxxx-xxxxxxxxxxxx";
                    let t = "";
                    try {
                        const n = window.crypto
                          , o = new Uint16Array(31);
                        n.getRandomValues(o);
                        let r = 0;
                        t = e.replace(/[x]/g, (e => {
                            const t = o[r];
                            if ("number" != typeof t)
                                throw new Error(`Event ID service: Invalid random number at index "${r}".`);
                            const n = t % 16;
                            return r++,
                            ("x" === e ? n : 3 & n | 8).toString(16)
                        }
                        )).toUpperCase()
                    } catch (n) {
                        t = e.replace(/[x]/g, (e => {
                            const t = 16 * Math.random() | 0;
                            return ("x" === e ? t : 3 & t | 8).toString(16)
                        }
                        )).toUpperCase()
                    }
                    return `${function() {
                        let e = 0
                          , t = 0;
                        e = (new Date).getTime() >>> 0;
                        try {
                            t = performance.now() >>> 0
                        } catch (e) {
                            t = 0
                        }
                        return Math.abs(e + t).toString(16).toLowerCase().padStart(8, "0")
                    }()}-${t}`
                }()}`
            }
            function _() {
                window.Shopify = window.Shopify || {},
                window.Shopify.evids || (d = {},
                p = {
                    [a]: {},
                    [s]: {},
                    [c]: {},
                    [u]: {}
                },
                window.Shopify.evids = (...e) => function(e, t) {
                    if (!function(e) {
                        return i.includes(e)
                    }(e) || (null == t ? void 0 : t.analyticsFramework) !== s && (null == t ? void 0 : t.analyticsFramework) !== a && (null == t ? void 0 : t.analyticsFramework) !== c && (null == t ? void 0 : t.analyticsFramework) !== u)
                        return l(r);
                    const n = "string" == typeof (o = t.cacheKey) && o ? o : "default";
                    var o;
                    const _ = function(e, t, n) {
                        var o;
                        const r = p[t]
                          , i = null !== (o = r[e]) && void 0 !== o ? o : r[e] = {}
                          , a = i[n];
                        return i[n] = "number" == typeof a ? a + 1 : 0
                    }(e, t.analyticsFramework, n);
                    return function(e, t, n) {
                        var o, r;
                        const i = null !== (o = d[e]) && void 0 !== o ? o : d[e] = {}
                          , a = null !== (r = i[n]) && void 0 !== r ? r : [];
                        let s = a[t];
                        return s || (s = l(),
                        a.push(s)),
                        i[n] = a,
                        s
                    }(e, _, n)
                }(...e))
            }
        }
    }
      , t = {};
    function n(o) {
        var r = t[o];
        if (void 0 !== r)
            return r.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n),
        i.exports
    }
    n.d = function(e, t) {
        for (var o in t)
            n.o(t, o) && !n.o(e, o) && Object.defineProperty(e, o, {
                enumerable: !0,
                get: t[o]
            })
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    function() {
        "use strict";
        var e = n(1074)
          , t = n(1037)
          , o = n(357)
          , r = "trekkie"
          , i = []
          , a = n(2319);
        i.push(["Trekkie", a.Trekkie]);
        var s = n(2057);
        i.push(["Facebook Pixel", s.FacebookPixel]);
        var c = n(2266);
        i.push(["Google Analytics", c.GoogleAnalytics]);
        var u = n(3082);
        i.push(["Session Attribution", u.SessionAttribution]);
        var d = n(3988);
        i.push(["S2S", d.S2S]);
        try {
            var p = window[r].config;
            if (p) {
                t.setGlobalSerializedAppConfig(JSON.stringify(p));
                var l = window[r]
                  , _ = window.trekkie = new e.Tricorder(i,p,(function() {
                    window[r] = _,
                    window._visit = {
                        tag: function() {},
                        multitrackToken: function() {
                            o.default.uniqToken
                        }
                    },
                    _.user = function() {
                        return {
                            traits: function() {
                                return {
                                    uniqToken: o.default.uniqToken
                                }
                            }
                        }
                    }
                    ,
                    e.replayAnalyticsQueue(_, l)
                }
                ))
            }
        } catch (e) {
            t.reportError("index_storefront", e)
        }
    }()
}();
