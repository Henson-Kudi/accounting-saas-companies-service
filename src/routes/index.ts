import { Router } from "express";
import {
    CompaniesController,
    SecretsController,
} from "../controllers";

const router = Router();

// New Company registration
router
    .route("/")
    .get(CompaniesController.getCompanies)
    .post(CompaniesController.createCompany);
router
    .route("/:id")
    .get(CompaniesController.getCompany)
    .put(CompaniesController.updateCompanyDetails);

// // New User Registration
// router.route("/register-owner").post(UsersController.registerCompanyOwner);

// // Get Registered Owners
// router.get('/conpany-owners', UsersController.getRegisteredCompanyOwners);
// // Update registered user information
// router.route("/company-owners/:id").get(UsersController.getRegisteredCompanyOwner).put(UsersController.updateCompanyOwner);

// Only Authenticated users
// router.use(AuthMiddleware.authenticate);

// router.use(AuthMiddleware.authorize); //Only authorized company owners

router
    .route("/secrets")
    .get(SecretsController.getSecrets)
    .post(SecretsController.createSecret);

router
    .route("/secrets/:id")
    .get(SecretsController.getSecret)
    .delete(SecretsController.deleteSecret);

export default router;
