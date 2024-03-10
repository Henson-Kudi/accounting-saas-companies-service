import { Request, Response, Router } from "express";
import { CompaniesController, UsersController } from "../controllers";

const router = Router();

router
    .route("/company-owners")
    .post(UsersController.registerCompanyOwner)
    .get(UsersController.getRegisteredCompanyOwners);

router
    .route("/")
    .get(CompaniesController.getCompanies)
    .post(CompaniesController.createCompany);
router.route("/:id").get(CompaniesController.getCompany);

export default router;
