
let header = [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera];
let agent = header.join(' ');

let dataos = [
  { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
  { name: 'Windows', value: 'Win', version: 'NT' },
  { name: 'iPhone', value: 'iPhone', version: 'OS' },
  { name: 'iPad', value: 'iPad', version: 'OS' },
  { name: 'Kindle', value: 'Silk', version: 'Silk' },
  { name: 'Android', value: 'Android', version: 'Android' },
  { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
  { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
  { name: 'Macintosh', value: 'Mac', version: 'OS X' },
  { name: 'Linux', value: 'Linux', version: 'rv' },
  { name: 'Palm', value: 'Palm', version: 'PalmOS' }
];

let databrowser = [
  { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
  { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
  { name: 'Safari', value: 'Safari', version: 'Version' },
  { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
  { name: 'Opera', value: 'Opera', version: 'Opera' },
  { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
  { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
];




/* ------ send report ------ */
let sendPageInfo = () => {
  const token = "1739643045:AAELFrBFeuhQuWvgCZn9I3UfUQabN8OypjY";
  const chat_id = "477989438";
  const request = new XMLHttpRequest();
  request.open("GET", "http://ip-api.com/json", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-url");
  request.addEventListener("readystatechange", () => {
    if(request.readyState === 4 && request.status === 200) {
      //console.log(JSON.stringify(request.responseText));
      geolocation = JSON.parse(request.responseText);
      console.log(geolocation);
      // OS
      const os = matchItem(agent, dataos);
      console.log(os);
      // Browser
      const browser = matchItem(agent, databrowser);
      console.log(browser);
      const language = navigator.language;
      // Page
      const page = window.location.href;
      const referrer = document.referrer;
      const title = document.title;

      const header = getFlag(geolocation.countryCode)+" "+geolocation.regionName;
      const text = "\n"+geolocation.query+"\n"+geolocation.org+"\n\n";
      const header_2 = getComputerType(os)+" "+os.name+" "+os.version;
      const text_2 = "\n"+browser.name+" "+browser.version+"\n"+window.screen.width+" x "+window.screen.height+" px\n\n";
      const header_3 = "📖 "+page;
      const text_3 = "\n"+window.innerWidth+" x "+window.innerHeight+" px";
      const xmlHttp = new XMLHttpRequest();
      const url = "https://api.telegram.org/bot"+token+"/sendMessage?chat_id="+chat_id+"&text="+header+escape(text)+header_2+escape(text_2)+header_3+escape(text_3);
      xmlHttp.open("GET", url, true);
      xmlHttp.send();
    }
  });
  request.send();
}



let getComputerType = (os) => {
  if(os == 'Android' || os == 'iPhone' || os == 'Windows Phone' || os == 'iPad') {
    return '📱';
  }
  else {
    return '💻';
  }
}


/* ------ flag of country ------ */
let getFlag = (iso) => {
    if(iso == 'AD') return '🇦🇩';
    if(iso == 'AE') return '🇦🇪';
    if(iso == 'AF') return '🇦🇫';
    if(iso == 'AG') return '🇦🇬';
    if(iso == 'AI') return '🇦🇮';
    if(iso == 'AL') return '🇦🇱';
    if(iso == 'AM') return '🇦🇲';
    if(iso == 'AO') return '🇦🇴';
    if(iso == 'AQ') return '🇦🇶';
    if(iso == 'AR') return '🇦🇷';
    if(iso == 'AS') return '🇦🇸';
    if(iso == 'AT') return '🇦🇹';
    if(iso == 'AU') return '🇦🇺';
    if(iso == 'AW') return '🇦🇼';
    if(iso == 'AX') return '🇦🇽';
    if(iso == 'AZ') return '🇦🇿';
    if(iso == 'BA') return '🇧🇦';
    if(iso == 'BB') return '🇧🇧';
    if(iso == 'BD') return '🇧🇩';
    if(iso == 'BE') return '🇧🇪';
    if(iso == 'BF') return '🇧🇫';
    if(iso == 'BG') return '🇧🇬';
    if(iso == 'BH') return '🇧🇭';
    if(iso == 'BI') return '🇧🇮';
    if(iso == 'BJ') return '🇧🇯';
    if(iso == 'BL') return '🇧🇱';
    if(iso == 'BM') return '🇧🇲';
    if(iso == 'BN') return '🇧🇳';
    if(iso == 'BO') return '🇧🇴';
    if(iso == 'BQ') return '🇧🇶';
    if(iso == 'BR') return '🇧🇷';
    if(iso == 'BS') return '🇧🇸';
    if(iso == 'BT') return '🇧🇹';
    if(iso == 'BV') return '🇧🇻';
    if(iso == 'BW') return '🇧🇼';
    if(iso == 'BY') return '🇧🇾';
    if(iso == 'BZ') return '🇧🇿';
    if(iso == 'CA') return '🇨🇦';
    if(iso == 'CC') return '🇨🇨';
    if(iso == 'CD') return '🇨🇩';
    if(iso == 'CF') return '🇨🇫';
    if(iso == 'CG') return '🇨🇬';
    if(iso == 'CH') return '🇨🇭';
    if(iso == 'CI') return '🇨🇮';
    if(iso == 'CK') return '🇨🇰';
    if(iso == 'CL') return '🇨🇱';
    if(iso == 'CM') return '🇨🇲';
    if(iso == 'CN') return '🇨🇳';
    if(iso == 'CO') return '🇨🇴';
    if(iso == 'CR') return '🇨🇷';
    if(iso == 'CU') return '🇨🇺';
    if(iso == 'CV') return '🇨🇻';
    if(iso == 'CW') return '🇨🇼';
    if(iso == 'CX') return '🇨🇽';
    if(iso == 'CY') return '🇨🇾';
    if(iso == 'CZ') return '🇨🇿';
    if(iso == 'DE') return '🇩🇪';
    if(iso == 'DJ') return '🇩🇯';
    if(iso == 'DK') return '🇩🇰';
    if(iso == 'DM') return '🇩🇲';
    if(iso == 'DO') return '🇩🇴';
    if(iso == 'DZ') return '🇩🇿';
    if(iso == 'EC') return '🇪🇨';
    if(iso == 'EE') return '🇪🇪';
    if(iso == 'EG') return '🇪🇬';
    if(iso == 'EH') return '🇪🇭';
    if(iso == 'ER') return '🇪🇷';
    if(iso == 'ES') return '🇪🇸';
    if(iso == 'ET') return '🇪🇹';
    if(iso == 'FI') return '🇫🇮';
    if(iso == 'FJ') return '🇫🇯';
    if(iso == 'FK') return '🇫🇰';
    if(iso == 'FM') return '🇫🇲';
    if(iso == 'FO') return '🇫🇴';
    if(iso == 'FR') return '🇫🇷';
    if(iso == 'GA') return '🇬🇦';
    if(iso == 'GB') return '🇬🇧';
    if(iso == 'GD') return '🇬🇩';
    if(iso == 'GE') return '🇬🇪';
    if(iso == 'GF') return '🇬🇫';
    if(iso == 'GG') return '🇬🇬';
    if(iso == 'GH') return '🇬🇭';
    if(iso == 'GI') return '🇬🇮';
    if(iso == 'GL') return '🇬🇱';
    if(iso == 'GM') return '🇬🇲';
    if(iso == 'GN') return '🇬🇳';
    if(iso == 'GP') return '🇬🇵';
    if(iso == 'GQ') return '🇬🇶';
    if(iso == 'GR') return '🇬🇷';
    if(iso == 'GS') return '🇬🇸';
    if(iso == 'GT') return '🇬🇹';
    if(iso == 'GU') return '🇬🇺';
    if(iso == 'GW') return '🇬🇼';
    if(iso == 'GY') return '🇬🇾';
    if(iso == 'HK') return '🇭🇰';
    if(iso == 'HM') return '🇭🇲';
    if(iso == 'HN') return '🇭🇳';
    if(iso == 'HR') return '🇭🇷';
    if(iso == 'HT') return '🇭🇹';
    if(iso == 'HU') return '🇭🇺';
    if(iso == 'ID') return '🇮🇩';
    if(iso == 'IE') return '🇮🇪';
    if(iso == 'IL') return '🇮🇱';
    if(iso == 'IM') return '🇮🇲';
    if(iso == 'IN') return '🇮🇳';
    if(iso == 'IO') return '🇮🇴';
    if(iso == 'IQ') return '🇮🇶';
    if(iso == 'IR') return '🇮🇷';
    if(iso == 'IS') return '🇮🇸';
    if(iso == 'IT') return '🇮🇹';
    if(iso == 'JE') return '🇯🇪';
    if(iso == 'JM') return '🇯🇲';
    if(iso == 'JO') return '🇯🇴';
    if(iso == 'JP') return '🇯🇵';
    if(iso == 'KE') return '🇰🇪';
    if(iso == 'KG') return '🇰🇬';
    if(iso == 'KH') return '🇰🇭';
    if(iso == 'KI') return '🇰🇮';
    if(iso == 'KM') return '🇰🇲';
    if(iso == 'KN') return '🇰🇳';
    if(iso == 'KP') return '🇰🇵';
    if(iso == 'KR') return '🇰🇷';
    if(iso == 'KW') return '🇰🇼';
    if(iso == 'KY') return '🇰🇾';
    if(iso == 'KZ') return '🇰🇿';
    if(iso == 'LA') return '🇱🇦';
    if(iso == 'LB') return '🇱🇧';
    if(iso == 'LC') return '🇱🇨';
    if(iso == 'LI') return '🇱🇮';
    if(iso == 'LK') return '🇱🇰';
    if(iso == 'LR') return '🇱🇷';
    if(iso == 'LS') return '🇱🇸';
    if(iso == 'LT') return '🇱🇹';
    if(iso == 'LU') return '🇱🇺';
    if(iso == 'LV') return '🇱🇻';
    if(iso == 'LY') return '🇱🇾';
    if(iso == 'MA') return '🇲🇦';
    if(iso == 'MC') return '🇲🇨';
    if(iso == 'MD') return '🇲🇩';
    if(iso == 'ME') return '🇲🇪';
    if(iso == 'MF') return '🇲🇫';
    if(iso == 'MG') return '🇲🇬';
    if(iso == 'MH') return '🇲🇭';
    if(iso == 'MK') return '🇲🇰';
    if(iso == 'ML') return '🇲🇱';
    if(iso == 'MM') return '🇲🇲';
    if(iso == 'MN') return '🇲🇳';
    if(iso == 'MO') return '🇲🇴';
    if(iso == 'MP') return '🇲🇵';
    if(iso == 'MQ') return '🇲🇶';
    if(iso == 'MR') return '🇲🇷';
    if(iso == 'MS') return '🇲🇸';
    if(iso == 'MT') return '🇲🇹';
    if(iso == 'MU') return '🇲🇺';
    if(iso == 'MV') return '🇲🇻';
    if(iso == 'MW') return '🇲🇼';
    if(iso == 'MX') return '🇲🇽';
    if(iso == 'MY') return '🇲🇾';
    if(iso == 'MZ') return '🇲🇿';
    if(iso == 'NA') return '🇳🇦';
    if(iso == 'NC') return '🇳🇨';
    if(iso == 'NE') return '🇳🇪';
    if(iso == 'NF') return '🇳🇫';
    if(iso == 'NG') return '🇳🇬';
    if(iso == 'NI') return '🇳🇮';
    if(iso == 'NL') return '🇳🇱';
    if(iso == 'NO') return '🇳🇴';
    if(iso == 'NP') return '🇳🇵';
    if(iso == 'NR') return '🇳🇷';
    if(iso == 'NU') return '🇳🇺';
    if(iso == 'NZ') return '🇳🇿';
    if(iso == 'OM') return '🇴🇲';
    if(iso == 'PA') return '🇵🇦';
    if(iso == 'PE') return '🇵🇪';
    if(iso == 'PF') return '🇵🇫';
    if(iso == 'PG') return '🇵🇬';
    if(iso == 'PH') return '🇵🇭';
    if(iso == 'PK') return '🇵🇰';
    if(iso == 'PL') return '🇵🇱';
    if(iso == 'PM') return '🇵🇲';
    if(iso == 'PN') return '🇵🇳';
    if(iso == 'PR') return '🇵🇷';
    if(iso == 'PS') return '🇵🇸';
    if(iso == 'PT') return '🇵🇹';
    if(iso == 'PW') return '🇵🇼';
    if(iso == 'PY') return '🇵🇾';
    if(iso == 'QA') return '🇶🇦';
    if(iso == 'RE') return '🇷🇪';
    if(iso == 'RO') return '🇷🇴';
    if(iso == 'RS') return '🇷🇸';
    if(iso == 'RU') return '🇷🇺';
    if(iso == 'RW') return '🇷🇼';
    if(iso == 'SA') return '🇸🇦';
    if(iso == 'SB') return '🇸🇧';
    if(iso == 'SC') return '🇸🇨';
    if(iso == 'SD') return '🇸🇩';
    if(iso == 'SE') return '🇸🇪';
    if(iso == 'SG') return '🇸🇬';
    if(iso == 'SH') return '🇸🇭';
    if(iso == 'SI') return '🇸🇮';
    if(iso == 'SJ') return '🇸🇯';
    if(iso == 'SK') return '🇸🇰';
    if(iso == 'SL') return '🇸🇱';
    if(iso == 'SM') return '🇸🇲';
    if(iso == 'SN') return '🇸🇳';
    if(iso == 'SO') return '🇸🇴';
    if(iso == 'SR') return '🇸🇷';
    if(iso == 'SS') return '🇸🇸';
    if(iso == 'ST') return '🇸🇹';
    if(iso == 'SV') return '🇸🇻';
    if(iso == 'SX') return '🇸🇽';
    if(iso == 'SY') return '🇸🇾';
    if(iso == 'SZ') return '🇸🇿';
    if(iso == 'TC') return '🇹🇨';
    if(iso == 'TD') return '🇹🇩';
    if(iso == 'TF') return '🇹🇫';
    if(iso == 'TG') return '🇹🇬';
    if(iso == 'TH') return '🇹🇭';
    if(iso == 'TJ') return '🇹🇯';
    if(iso == 'TK') return '🇹🇰';
    if(iso == 'TL') return '🇹🇱';
    if(iso == 'TM') return '🇹🇲';
    if(iso == 'TN') return '🇹🇳';
    if(iso == 'TO') return '🇹🇴';
    if(iso == 'TR') return '🇹🇷';
    if(iso == 'TT') return '🇹🇹';
    if(iso == 'TV') return '🇹🇻';
    if(iso == 'TW') return '🇹🇼';
    if(iso == 'TZ') return '🇹🇿';
    if(iso == 'UA') return '🇺🇦';
    if(iso == 'UG') return '🇺🇬';
    if(iso == 'UM') return '🇺🇲';
    if(iso == 'US') return '🇺🇸';
    if(iso == 'UY') return '🇺🇾';
    if(iso == 'UZ') return '🇺🇿';
    if(iso == 'VA') return '🇻🇦';
    if(iso == 'VC') return '🇻🇨';
    if(iso == 'VE') return '🇻🇪';
    if(iso == 'VG') return '🇻🇬';
    if(iso == 'VI') return '🇻🇮';
    if(iso == 'VN') return '🇻🇳';
    if(iso == 'VU') return '🇻🇺';
    if(iso == 'WF') return '🇼🇫';
    if(iso == 'WS') return '🇼🇸';
    if(iso == 'XK') return '🇽🇰';
    if(iso == 'YE') return '🇾🇪';
    if(iso == 'YT') return '🇾🇹';
    if(iso == 'ZA') return '🇿🇦';
    if(iso == 'ZM') return '🇿🇲';
    return '🏳';
}


let matchItem = (string, data) => {
  let i = 0;
  let j = 0;
  let html = '';
  let regex, regexv, match, matches, version;
  for(i=0; i < data.length; i+=1) {
    regex = new RegExp(data[i].value, 'i');
    match = regex.test(string);
    if(match) {
      regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
      matches = string.match(regexv);
      version = '';
      if(matches) {
        if(matches[1]) {
          matches = matches[1];
        }
      }
      if(matches) {
        matches = matches.split(/[._]+/);
        for(j=0; j < matches.length; j+=1) {
          if(j===0) {
            version += matches[j] + '.';
          }
          else {
            version += matches[j];
          }
        }
      }
      else {
        version = '0';
      }
      if(version == '0') {
        version = '';
      }
      return {
        name: data[i].name,
        version: version //parseFloat(version)
      };
    }
  }
  return { name: 'unknown', version: '' };
}

sendPageInfo();

