import moment from "moment";

export function formatDate(timeStr, form) {
  if (!timeStr || timeStr.length === 0) {
    return "";
  }
  return moment(timeStr).local().format(form);
}

export function stringYYYYMMDDToMoment(stringVal) {
  return stringVal ? moment(stringVal, "YYYY-MM-DD") : moment();
}

export function momentToStringYYYYMMDD(momentVal) {
  return momentVal ? momentVal.format("YYYY-MM-DD") : "";
}

export function formatDMYMS(timeStr) {
  return formatDate(timeStr, "HH:mm DD.MM.YYYY");
}

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
