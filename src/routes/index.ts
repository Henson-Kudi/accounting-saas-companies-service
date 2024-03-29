import { Router } from "express";
import { CompaniesController, UsersController } from "../controllers";

const router = Router();

// New Company registration
router
    .route("/")
    .get(CompaniesController.getCompanies)
    .post(CompaniesController.createCompany);
router.route("/:id").get(CompaniesController.getCompany).put(CompaniesController.updateCompanyDetails);

// New User Registration
router.route("/register-owner").post(UsersController.registerCompanyOwner);

// Get Registered Owners
router.get('/conpany-owners', UsersController.getRegisteredCompanyOwners);
// Update registered user information
router.route("/company-owners/:id").get(UsersController.getRegisteredCompanyOwner).put(UsersController.updateCompanyOwner);

export default router;
