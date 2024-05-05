import {
  Request,
  Response,
  NextFunction,
  response,
} from "express";

type ResBodyType = {
  last_update_utc: string;
  headers: [{ name: string; value: string }];
};

const defaultHeaders = {
  "Cache-Control": "no-store, max-age=0",
  "Content-Security-Policy":
    "default-src 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; block-all-mixed-content",
  "Cross-Origin-Embedder-Policy": "require-corp",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy":
    "accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),gamepad=(),geolocation=(),gyroscope=(),layout-animations=(self),legacy-image-formats=(self),magnetometer=(),microphone=(),midi=(),oversized-images=(self),payment=(),picture-in-picture=(),publickey-credentials-get=(),speaker-selection=(),sync-xhr=(self),unoptimized-images=(self),unsized-media=(self),usb=(),screen-wake-lock=(),web-share=(),xr-spatial-tracking=()",
  "Referrer-Policy": "no-referrer",
  "Strict-Transport-Security":
    "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "deny",
  "X-Permitted-Cross-Domain-Policies": "none",
};

const getHeadersOWASP = async () => {
  const response = await fetch(
    "https://owasp.org/www-project-secure-headers/ci/headers_add.json",
    { method: "GET" }
  );

  const resBody = (await response.json()) as ResBodyType;

  if (resBody) {
    return resBody.headers;
  }
};

export const OWASPHeadersConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const getHeaders = await getHeadersOWASP();

  const newHeaders: { [k: string]: any } = {};

  if (getHeaders) {
    getHeaders.map(
      (header: { name: string; value: string }) => {
        if (header.name === "Clear-Site-Data") {
          return;
        } else {
          newHeaders[`${header.name}`] = header.value;
        }
      }
    );
  }

  res.set(newHeaders ? newHeaders : defaultHeaders);

  next();
};
