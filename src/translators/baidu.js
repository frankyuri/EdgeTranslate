import axios from "axios";

/**
 * Supported languages.
 */
const LANGUAGES = [
    ["ach", "ach"],
    ["af", "afr"],
    ["aka", "aka"],
    ["sq", "alb"],
    ["am", "amh"],
    ["ar", "ara"],
    ["arg", "arg"],
    ["hy", "arm"],
    ["asm", "asm"],
    ["ast", "ast"],
    ["auto", "auto"],
    ["aym", "aym"],
    ["az", "aze"],
    ["bal", "bal"],
    ["sun", "sun"],
    ["bak", "bak"],
    ["eu", "baq"],
    ["be", "bel"],
    ["bem", "bem"],
    ["bn", "ben"],
    ["ber", "ber"],
    ["bho", "bho"],
    ["bis", "bis"],
    ["bli", "bli"],
    ["nob", "nob"],
    ["bs", "bos"],
    ["bre", "bre"],
    ["bg", "bul"],
    ["bur", "bur"],
    ["yue", "yue"],
    ["ca", "cat"],
    ["ceb", "ceb"],
    ["chr", "chr"],
    ["ny", "nya"],
    ["chv", "chv"],
    ["wyw", "wyw"],
    ["cor", "cor"],
    ["co", "cos"],
    ["cre", "cre"],
    ["cri", "cri"],
    ["hr", "hrv"],
    ["cs", "cs"],
    ["da", "dan"],
    ["div", "div"],
    ["nl", "nl"],
    ["en", "en"],
    ["eo", "epo"],
    ["et", "est"],
    ["fao", "fao"],
    ["fil", "fil"],
    ["fi", "fin"],
    ["fr", "fra"],
    ["fri", "fri"],
    ["ful", "ful"],
    ["gla", "gla"],
    ["gl", "glg"],
    ["ka", "geo"],
    ["de", "de"],
    ["el", "el"],
    ["grn", "grn"],
    ["gu", "guj"],
    ["ht", "ht"],
    ["hak", "hak"],
    ["ha", "hau"],
    ["haw", "haw"],
    ["he", "heb"],
    ["hil", "hil"],
    ["hi", "hi"],
    ["hmn", "hmn"],
    ["hu", "hu"],
    ["hup", "hup"],
    ["is", "ice"],
    ["ido", "ido"],
    ["ig", "ibo"],
    ["id", "id"],
    ["ing", "ing"],
    ["ina", "ina"],
    ["iku", "iku"],
    ["ga", "gle"],
    ["it", "it"],
    ["ja", "jp"],
    ["jw", "jav"],
    ["kab", "kab"],
    ["kal", "kal"],
    ["kn", "kan"],
    ["kau", "kau"],
    ["kas", "kas"],
    ["kah", "kah"],
    ["kk", "kaz"],
    ["km", "hkm"],
    ["kin", "kin"],
    ["tlh", "kli"],
    ["kon", "kon"],
    ["kok", "kok"],
    ["ko", "kor"],
    ["ku", "kur"],
    ["ky", "kir"],
    ["lo", "lao"],
    ["lag", "lag"],
    ["la", "lat"],
    ["lv", "lav"],
    ["lim", "lim"],
    ["lin", "lin"],
    ["lt", "lit"],
    ["loj", "loj"],
    ["lug", "lug"],
    ["lb", "ltz"],
    ["mk", "mac"],
    ["mai", "mai"],
    ["mg", "mg"],
    ["ms", "may"],
    ["ml", "mal"],
    ["mt", "mlt"],
    ["glv", "glv"],
    ["mi", "mao"],
    ["mr", "mar"],
    ["mah", "mah"],
    ["mau", "mau"],
    ["frm", "frm"],
    ["mot", "mot"],
    ["nqo", "nqo"],
    ["nea", "nea"],
    ["ne", "nep"],
    ["sme", "sme"],
    ["ped", "ped"],
    ["no", "nor"],
    ["nno", "nno"],
    ["oci", "oci"],
    ["oji", "oji"],
    ["eno", "eno"],
    ["or", "ori"],
    ["orm", "orm"],
    ["oss", "oss"],
    ["pam", "pam"],
    ["pap", "pap"],
    ["ps", "pus"],
    ["fa", "per"],
    ["pl", "pl"],
    ["pt", "pt"],
    ["ma", "pan"],
    ["que", "que"],
    ["ro", "rom"],
    ["roh", "roh"],
    ["ro", "ro"],
    ["ru", "ru"],
    ["ruy", "ruy"],
    ["sm", "sm"],
    ["san", "san"],
    ["srd", "srd"],
    ["sco", "sco"],
    ["src", "src"],
    ["sr", "srp"],
    ["sec", "sec"],
    ["sha", "sha"],
    ["sn", "sna"],
    ["sil", "sil"],
    ["sd", "snd"],
    ["si", "sin"],
    ["sk", "sk"],
    ["sl", "slo"],
    ["so", "som"],
    ["sol", "sol"],
    ["nbl", "nbl"],
    ["sot", "sot"],
    ["es", "spa"],
    ["sw", "swa"],
    ["sv", "swe"],
    ["syr", "syr"],
    ["tgl", "tgl"],
    ["tg", "tgk"],
    ["ta", "tam"],
    ["tat", "tat"],
    ["te", "tel"],
    ["tet", "tet"],
    ["th", "th"],
    ["tir", "tir"],
    ["zh-TW", "cht"],
    ["zh-CN", "zh"],
    ["tso", "tso"],
    ["tr", "tr"],
    ["tuk", "tuk"],
    ["twi", "twi"],
    ["uk", "ukr"],
    ["ups", "ups"],
    ["ur", "urd"],
    ["uz", "uzb"],
    ["ven", "ven"],
    ["vi", "vie"],
    ["wln", "wln"],
    ["cy", "wel"],
    ["fry", "fry"],
    ["wol", "wol"],
    ["xh", "xho"],
    ["yi", "yid"],
    ["yo", "yor"],
    ["zaz", "zaz"],
    ["zu", "zul"]
];

/**
 * Baidu translator interface.
 */
class BaiduTranslator {
    constructor() {
        this.MAX_RETRY = 3; // Max retry times after failure.
        this.HOST = "https://fanyi.baidu.com/"; // Baidu translation url
        this.token = ""; // one of request parameters
        this.gtk = ""; // used to calculate value of "sign"
        this.sign = ""; // one of request parameters
        this.languages = {};
        /**
         * Request headers
         */
        this.HEADERS = {
            accept: "*/*",
            "accept-language":
                "en,zh;q=0.9,en-GB;q=0.8,en-CA;q=0.7,en-AU;q=0.6,en-ZA;q=0.5,en-NZ;q=0.4,en-IN;q=0.3,zh-CN;q=0.2",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        };

        /**
         * Language to translator language code.
         */
        this.LAN_TO_CODE = new Map(LANGUAGES);

        /**
         * Translator language code to language.
         */
        this.CODE_TO_LAN = new Map(LANGUAGES.map(([lan, code]) => [code, lan]));
    }

    /**
     * Get latest token and gtk for urls.
     *
     * @returns {Promise} then(this=>callback()) used to run callback. catch(error) used to catch error
     */
    getTokenGtk() {
        let oneRequest = function() {
            return axios({
                method: "get",
                baseURL: this.HOST,
                timeout: 5000
            }).then(response => {
                this.token = response.data.match(/token: '(.*?)',/)[1];
                this.gtk = response.data.match(/window.gtk = '(.*?)'/)[1];
                return Promise.resolve();
            });
        }.bind(this);
        // request two times to ensure the token is the latest value
        // otherwise the request would return "997" error
        return oneRequest().then(() => {
            return oneRequest();
        });
    }

    /**
     * Parse the translate result.
     *
     * @param {Object} result translate result
     * @returns {Object} Parsed result
     */
    parseResult(result) {
        let parsed = {};
        parsed.originalText = result.trans_result.data[0].src;
        parsed.mainMeaning = result.trans_result.data[0].dst;

        if (result.trans_result.phonetic)
            parsed.tPronunciation = result.trans_result.phonetic
                .map(e => e.trg_str)
                .reduce((t1, t2) => t1 + " " + t2); // get the result by splicing the array

        // japanese target pronunciation
        if (result.trans_result.jp_pinyin) {
            parsed.tPronunciation = result.trans_result.jp_pinyin[0].dst;
        }

        // dictionary is not in the result
        if (result.dict_result) {
            if (result.dict_result.simple_means) {
                parsed.sPronunciation = result.dict_result.simple_means.symbols[0].ph_en;

                parsed.detailedMeanings = [];
                for (let part of result.dict_result.simple_means.symbols[0].parts) {
                    let meaning = {};
                    meaning.pos = part.part; // part of speech
                    meaning.meaning = part.means.reduce(
                        (meaning1, meaning2) => meaning1 + "\n" + meaning2
                    );
                    parsed.detailedMeanings.push(meaning);
                }
            }

            if (result.dict_result.edict) {
                parsed.definitions = [];
                // iterate pos
                for (let item of result.dict_result.edict.item) {
                    // iterate meaning of each pos
                    for (let tr of item.tr_group) {
                        let meaning = {};
                        meaning.pos = item.pos;
                        meaning.meaning = tr.tr[0];
                        meaning.example = tr.example[0];
                        meaning.synonyms = tr.similar_word;
                        parsed.definitions.push(meaning);
                    }
                }
            }

            if (result.dict_result.content) {
                parsed.sPronunciation = result.dict_result.voice[0].en_phonic;
                if (!parsed.detailedMeanings) parsed.detailedMeanings = [];
                for (let item of result.dict_result.content[0].mean) {
                    let meaning = {};
                    meaning.pos = item.pre;
                    meaning.meaning = Object.keys(item.cont)[0];
                    parsed.detailedMeanings.push(meaning);
                }
            }
        }

        if (result.liju_result.double) {
            parsed.examples = [];
            let examples = result.liju_result.double;
            examples = JSON.parse(examples);
            for (let sentence of examples) {
                let example = {};
                // source language examples
                example.source = sentence[0]
                    .map(a => {
                        if (a.length > 4) return a[0] + " ";
                        return a[0];
                    })
                    .reduce((a1, a2) => a1 + a2);
                // target language examples
                example.target = sentence[1].map(a => a[0]).reduce((a1, a2) => a1 + a2);
                parsed.examples.push(example);
            }
        }
        return parsed;
    }

    /**
     * Get supported languages of this API.
     *
     * @returns {Set<String>} supported languages
     */
    supportedLanguages() {
        return new Set(this.LAN_TO_CODE.keys());
    }

    /**
     * Detect language of given text.
     *
     * @param {String} text text to detect
     * @returns {Promise} then(result) used to return request result. catch(error) used to catch error
     */
    detect(text) {
        return axios({
            url: "langdetect",
            method: "post",
            baseURL: this.HOST,
            headers: this.HEADERS,
            data: new URLSearchParams({
                query: text
            }),
            timeout: 5000
        }).then(result => {
            if (result.data.msg === "success")
                return Promise.resolve(this.CODE_TO_LAN.get(result.data.lan));
            else return Promise.reject(result.data);
        });
    }

    /**
     * Translate given text.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     * @returns {Promise} then(result) used to return request result. catch(error) used to catch error
     */
    translate(text, from, to) {
        let reTryCount = 0;
        // send translation request one time
        // if the first request fails, resend requests no more than {this.MAX_RETRY} times
        let translateOneTime = function() {
            to = this.LAN_TO_CODE.get(to);
            from = this.LAN_TO_CODE.get(from);
            return axios({
                url: "/v2transapi?" + "from=" + from + "&to=" + to,
                method: "post",
                baseURL: this.HOST,
                headers: this.HEADERS,
                data: new URLSearchParams({
                    from: from,
                    to: to,
                    query: text,
                    transtype: "realtime",
                    simple_means_flag: 3,
                    sign: this.generateSign(text, this.gtk),
                    token: this.token,
                    domain: "common"
                }),
                timeout: 5000
            }).then(result => {
                let data = result.data;
                // token is out of date and try to resend request
                if (data.errno) {
                    if (reTryCount < this.MAX_RETRY) {
                        reTryCount++;
                        // get new token and gtk
                        return this.getTokenGtk().then(() => {
                            // resend translation request
                            return translateOneTime();
                        });
                    } else return Promise.reject(data);
                } else return Promise.resolve(this.parseResult(result.data));
            });
        }.bind(this);
        // if old token and gtk exist
        if (this.token && this.gtk) {
            return translateOneTime();
        } else {
            // get token and gtk when the translator is initiated
            return this.getTokenGtk().then(() => {
                return translateOneTime();
            });
        }
    }

    /* eslint-disable */
    tokenA(r, o) {
        for (var t = 0; t < o.length - 2; t += 3) {
            var a = o.charAt(t + 2);
            (a = a >= "a" ? a.charCodeAt(0) - 87 : Number(a)),
                (a = "+" === o.charAt(t + 1) ? r >>> a : r << a),
                (r = "+" === o.charAt(t) ? (r + a) & 4294967295 : r ^ a);
        }
        return r;
    }
    generateSign(query, gtk) {
        var C = null;
        var o = query.length;
        o > 30 &&
            (query =
                "" +
                query.substr(0, 10) +
                query.substr(Math.floor(o / 2) - 5, 10) +
                query.substring(query.length, query.length - 10));
        var t = void 0,
            t = null !== C ? C : (C = gtk || "") || "";
        for (
            var e = t.split("."),
                h = Number(e[0]) || 0,
                i = Number(e[1]) || 0,
                d = [],
                f = 0,
                g = 0;
            g < query.length;
            g++
        ) {
            var m = query.charCodeAt(g);
            128 > m
                ? (d[f++] = m)
                : (2048 > m
                      ? (d[f++] = (m >> 6) | 192)
                      : (55296 === (64512 & m) &&
                        g + 1 < query.length &&
                        56320 === (64512 & query.charCodeAt(g + 1))
                            ? ((m = 65536 + ((1023 & m) << 10) + (1023 & query.charCodeAt(++g))),
                              (d[f++] = (m >> 18) | 240),
                              (d[f++] = ((m >> 12) & 63) | 128))
                            : (d[f++] = (m >> 12) | 224),
                        (d[f++] = ((m >> 6) & 63) | 128)),
                  (d[f++] = (63 & m) | 128));
        }
        for (var S = h, u = "+-a^+6", l = "+-3^+b+-f", s = 0; s < d.length; s++)
            (S += d[s]), (S = this.tokenA(S, u));
        return (
            (S = this.tokenA(S, l)),
            (S ^= i),
            0 > S && (S = (2147483647 & S) + 2147483648),
            (S %= 1e6),
            S.toString() + "." + (S ^ h)
        );
    }
    /* eslint-enable */
}

/**
 * Create and export default Translator object.
 */
const TRANSLATOR = new BaiduTranslator();
export default TRANSLATOR;
