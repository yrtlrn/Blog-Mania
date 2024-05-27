import { toast } from "react-toastify";

export const toastMsg = (type: string, message: string) => {
  switch (type) {
    case "error":
      toast(message, { type: "error" });
      break;
    case "success":
      toast(message, { type: "success" });
      break;
    case "info":
      toast(message, { type: "info" });
      break;
  }
};
