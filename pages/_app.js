import ThemeProvider from "providers/ThemeProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/dracula.css";
import "react-toggle/style.css";
import "styles/index.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";
const { library, config } = require("@fortawesome/fontawesome-svg-core");
import {
  faSun,
  faMoon,
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;
library.add(
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp,
  faSun,
  faMoon
);

const app = ({ Component, pageProps }) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);
export default app;
