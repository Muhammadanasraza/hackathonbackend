import {UserModal} from '../Modals/usersModal.js';

// Controller to create a new user
export const createUser = async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    // Check if role is valid
    if (!['Receptionist', 'Department Staff'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Choose either Receptionist or Department Staff.' });
    }

    // Create a new user
    const newUser = new UserModal({ name, email, role, password });
    await newUser.save();

    // Respond with the created user
    res.status(201).json({
      message: 'User created successfully.',
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Controller to update user details
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body;

  try {
    // Find the user by ID and update details
    const updatedUser = await UserModal.findByIdAndUpdate(id, { name, email, role, password }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'User updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Controller to delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID and delete
    const deletedUser = await UserModal.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'User deleted successfully.',
      user: deletedUser,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Controller to get user details
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID and return details
    const user = await UserModal.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error getting user info:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
