import createCompany from "./createCompany";
import * as findCompanies from "./findCompanies";

export default {
    createCompany,
    ...findCompanies,
};
