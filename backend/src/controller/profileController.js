const { Employee } = require('../model/employee');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const employee = await Employee.findById(userId)
            .populate('department', 'name description')
            .populate('manager', 'first_name last_name email')
            .select('-password');

        if (!employee) {
            return res.status(404).json({ success: false, message: 'User profile not found' });
        }

        const profileData = {
            id: employee._id,
            personal_info: {
                first_name: employee.first_name,
                middle_name: employee.middle_name,
                last_name: employee.last_name,
                full_name: `${employee.first_name} ${employee.middle_name ? employee.middle_name + ' ' : ''}${employee.last_name}`,
                email: employee.email,
                username: employee.username
            },
            account_info: {
                role: employee.role,
                department: employee.department ? {
                    id: employee.department._id,
                    name: employee.department.name,
                    description: employee.department.description
                } : null,
                manager: employee.manager ? {
                    id: employee.manager._id,
                    name: `${employee.manager.first_name} ${employee.manager.last_name}`,
                    email: employee.manager.email
                } : null
            }
        };

        res.status(200).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: profileData
        });

    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve profile. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getProfile
};
