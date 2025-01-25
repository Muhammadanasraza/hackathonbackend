import mongoose from 'mongoose';

const BeneficiarySchema = new mongoose.Schema(
  {
    cnic: { type: String, required: true, unique: true },      // CNIC is a unique identifier for the beneficiary
    name: { type: String, required: true },                    // Name of the beneficiary
    phone: { type: String, required: true },                   // Phone number of the beneficiary
    address: { type: String, required: true },                 // Address of the beneficiary
    purpose: { type: String, required: true },                 // Purpose for the visit (e.g., Finance, Medical, etc.)
    itemRequested: { type: String, required: false },          // The item requested (e.g., Laptop, Financial Aid)
    itemStatus: { 
      type: String, 
      enum: ['Pending', 'Accepted', 'Rejected'], 
      default: 'Pending'                                     // The status of the item request
    }, 
  },
  { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

export const BeneficiaryModal = mongoose.models.Beneficiary || mongoose.model('Beneficiary', BeneficiarySchema);
