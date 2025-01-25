import express from "express";
import {
  registerBeneficiary,
  getBeneficiaryByCnic,
  updateBeneficiary,
  getBeneficiaryHistory,
  deleteBeneficiary,
} from "../Controllers/beneficiaries.controller.js";

const router = express.Router();

// 1. Register a new beneficiary
router.route("/").post(registerBeneficiary);

// 2. Fetch a beneficiary's details by CNIC
router.route("/:cnic").get(getBeneficiaryByCnic);

// 3. Update beneficiary details
router.route("/:id").put(updateBeneficiary);

// 4. Fetch interaction history of a beneficiary by CNIC
router.route("/history/:cnic").get(getBeneficiaryHistory);

// 5. Delete a beneficiary record
router.route("/:id").delete(deleteBeneficiary);

export default router;
