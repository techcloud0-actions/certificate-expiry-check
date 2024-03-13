import * as core from "@actions/core";
import { DateUtils } from "./utils/dates";
import { getCertificateExpiry } from "./tasks/check-certificate";

try {
  /**
   * Host to be checked, e.g. example.com
   * @type {string}
   */
  const host = core.getInput("host");

  /**
   * Check SSL certificate
   */
  getCertificateExpiry(host)
    .then((date) => {
      core.setOutput("ssl-expiry-date", date.toString());
      core.setOutput("ssl-expiry-days-left", DateUtils.daysUntil(date));
    })
    .catch((error) => {
      if (error.code === "CERT_HAS_EXPIRED") {
        core.setOutput("ssl-expiry-date", "INVALID");
        core.setOutput("ssl-expiry-days-left", -1);
      }

      throw error;
    })
    .catch(core.error);
} catch (error) {
  core.setFailed(error.message);
}
