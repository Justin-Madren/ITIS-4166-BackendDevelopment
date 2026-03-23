import bcrypt from 'bcrypt';
import { 
    findAllUsers,
    findUserById, 
    updateUser, 
    deleteUser, 
    getUserPosts,
    updateUserRole
} from '../repositories/userRepo.js';

export async function getAllUsers(){
    return findAllUsers();
}

export async function getUserProfile(userId) {
    const user = await findUserById(userId);
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    return user;
}

export async function updateUserProfile(userId, email, password) {
    const data = {};
    
    if (email) {
        data.email = email;
    }
    
    if (password) {
        data.password = await bcrypt.hash(password, 10);
    }
    
    const updatedUser = await updateUser(userId, data);
    return updatedUser;
}

export async function deleteUserAccount(userId) {
    await deleteUser(userId);
}

export async function getUserPostsService(userId) {
    return getUserPosts(userId);
}

export async function updateUserRoleService(userId, role) {
    return updateUserRole(userId, role);
}