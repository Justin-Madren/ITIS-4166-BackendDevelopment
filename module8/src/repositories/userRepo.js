import prisma from '../config/db.js';

export async function createUser(data) {
    try {
        const newUser = await prisma.user.create({ data, omit: { password: true } });
        return newUser;
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Email already used');
            err.status = 409;
            throw err;
        }
        throw error;
    }
    
}

export async function findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
}


export async function findAllUsers(){
    return prisma.user.findMany({ omit: { password: true } });
}

export async function findUserById(id) {
    return prisma.user.findUnique({ 
        where: { id },
        omit: { password: true }
    });
}

export async function updateUser(id, data) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data,
            omit: { password: true }
        });
        return updatedUser;
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Email already used');
            err.status = 409;
            throw err;
        }
        if (error.code === 'P2025') {
            const err = new Error('User not found');
            err.status = 404;
            throw err;
        }
        throw error;
    }
}

export async function deleteUser(id) {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id }
        });
        return deletedUser;
    } catch (error) {
        if (error.code === 'P2025') {
            const err = new Error('User not found');
            err.status = 404;
            throw err;
        }
        throw error;
    }
}

export async function getUserPosts(userId) {
    return prisma.post.findMany({
        where: { authorId: userId }
    });
}

export async function updateUserRole(userId, role) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role },
            omit: { password: true }
        });
        return updatedUser;
    } catch (error) {
        if (error.code === 'P2025') {
            const err = new Error('User not found');
            err.status = 404;
            throw err;
        }
        throw error;
    }
}