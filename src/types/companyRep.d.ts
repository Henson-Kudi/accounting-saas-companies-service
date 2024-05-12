type CompanyRep = {
    name: string;
    email: string;
    phone: string;
    address?: string;
    position: string;
    [key: string]: any;
};
export default CompanyRep;