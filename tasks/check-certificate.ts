import * as tls from "tls";

export function getCertificateExpiry(host: string): Promise<Date> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        port: 443,
        host: host,
        servername: host, // this is required in case the server has enabled SNI
      },
      () => {
        const certificate = socket.getPeerCertificate();

        if (socket.authorized === false) {
          reject(
            new Error(
              `TLS connection to ${host} failed: ${socket.authorizationError}`
            )
          );
        } else if (!certificate.valid_to) {
          reject(
            new Error(
              `Unable to get SSL-certificate expiration date for hostname ${host}`
            )
          );
        } else {
          resolve(new Date(certificate.valid_to));
        }

        socket.end();
      }
    );

    socket.on("error", (err) => {
      reject(err);
    });
  });
}
