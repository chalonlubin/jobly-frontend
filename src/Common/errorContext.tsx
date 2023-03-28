import { createContext } from "react";

/** Set context for errors, initially null */
const errorContext = createContext<any>(null);

export default errorContext;
