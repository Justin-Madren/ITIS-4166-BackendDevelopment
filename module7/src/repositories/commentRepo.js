import prisma from '../config/db.js';

export async function getAll({ postId, search, sortBy, order, offset, limit }) {
  const where = {};
  if (postId) where.postId = postId;
  if (search) where.content = { contains: search, mode: 'insensitive' };

  const orderBy = {};
  if (sortBy) orderBy[sortBy] = order?.toLowerCase() === 'desc' ? 'desc' : 'asc';

  const comments = await prisma.comment.findMany({
    where,
    orderBy: Object.keys(orderBy).length ? orderBy : { id: 'asc' },
    skip: offset ?? 0,
    take: limit ?? 100,
  });

  return comments;
}

export async function getById(id) {
  return prisma.comment.findUnique({ where: { id } });
}

export async function create(data) {
  return prisma.comment.create({
    data: {
      postId: data.postId,
      content: data.content,
    },
  });
}

export async function update(id, updatedData) {
  try {
    return await prisma.comment.update({
      where: { id },
      data: {
        content: updatedData.content,
      },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    await prisma.comment.delete({ where: { id } });
    return true;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
