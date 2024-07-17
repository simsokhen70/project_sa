import { debounce } from "@mui/material";
import toast from "react-hot-toast";

export const showToast = debounce((message) => {
    toast.error(message);
  }, 1000);
  
export  const showToastSuccess = debounce((message) => {
    toast.success(message);
  }, 1000);
