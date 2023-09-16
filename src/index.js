import * as DataBusiness from "./data-business";
import "./styles.css";

const main = () => {
    DataBusiness.apiExtraction(DataBusiness.CHARACTER_ENDPOINT_URL)
    .then(DataBusiness.getCharacterPages)
    .catch((reject) => console.error("Error while extracting character pages (main) => " + reject))
    .then(DataBusiness.buildCharacterList)
    .catch((reject) => console.error("Error while building character list (main) => " + reject));
};

window.onload = main;
