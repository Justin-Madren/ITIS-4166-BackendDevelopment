import { 
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserAccount,
    getUserPostsService,
    updateUserRoleService
} from "../services/userService.js";

export async function getAllUsersHandler(req, res){
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function getMeHandler(req, res) {
    const user = await getUserProfile(req.user.id);
    res.status(200).json(user);
}

export async function updateMeHandler(req, res) {
    const { email, password } = req.body;
    const updatedUser = await updateUserProfile(req.user.id, email, password);
    res.status(200).json(updatedUser);
}

export async function deleteMeHandler(req, res) {
    await deleteUserAccount(req.user.id);
    res.status(204).send();
}

export async function getMyPostsHandler(req, res) {
    const posts = await getUserPostsService(req.user.id);
    res.status(200).json(posts);
}

export async function updateUserRoleHandler(req, res) {
    const { id } = req.params;
    const { role } = req.body;
    const userId = parseInt(id);
    
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const updatedUser = await updateUserRoleService(userId, role);
    res.status(200).json(updatedUser);
}