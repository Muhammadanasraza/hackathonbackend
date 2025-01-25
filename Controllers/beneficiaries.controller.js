import { BeneficiaryModal } from '../Modals/beneficiariesModal.js';

// Register a new beneficiary
export const registerBeneficiary = async (req, res) => {
  try {
    const { cnic, name, phone, address, purpose, itemRequested } = req.body;
    const newBeneficiary = new BeneficiaryModal({ 
      cnic, 
      name, 
      phone, 
      address, 
      purpose, 
      itemRequested 
    });
    await newBeneficiary.save();
    res.status(201).json({ message: 'Beneficiary registered successfully', data: newBeneficiary });
  } catch (error) {
    res.status(500).json({ message: 'Error registering beneficiary', error: error.message });
  }
};

// Fetch a beneficiary's details by CNIC
export const getBeneficiaryByCnic = async (req, res) => {
  try {
    const { cnic } = req.params;
    const beneficiary = await BeneficiaryModal.findOne({ cnic });
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    res.status(200).json(beneficiary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching beneficiary', error: error.message });
  }
};

// Update beneficiary details, including item status
export const updateBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemRequested, itemStatus } = req.body; // Allow updating item status
    const updates = { itemRequested, itemStatus };
    
    const updatedBeneficiary = await BeneficiaryModal.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBeneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    res.status(200).json({ message: 'Beneficiary updated successfully', data: updatedBeneficiary });
  } catch (error) {
    res.status(500).json({ message: 'Error updating beneficiary', error: error.message });
  }
};

// Fetch interaction history of a beneficiary by CNIC
export const getBeneficiaryHistory = async (req, res) => {
  try {
    const { cnic } = req.params;
    const beneficiary = await BeneficiaryModal.findOne({ cnic });
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    res.status(200).json({ data: beneficiary });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
};

// Delete a beneficiary record
export const deleteBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBeneficiary = await BeneficiaryModal.findByIdAndDelete(id);
    if (!deletedBeneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    res.status(200).json({ message: 'Beneficiary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting beneficiary', error: error.message });
  }
};
