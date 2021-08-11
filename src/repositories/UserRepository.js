import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findById = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
export const createLocal = async (nickname, email, password) => {
    try {
        return await prisma.user.create({
            data: {
                nickname,
                email,
                password,
                provider: "local",
                createdAt: now,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createSocial = async (data) => {
    try {
        return await prisma.user.create({
            data: {
                nickname: data.nickname,
                email: data.email,
                provider: data.provider,
                createdAt: now,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
export const findByIdWithData = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nickname: true,
                email: true,
                provider: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByIdWithProfile = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nickname: true,
                email: true,
                provider: true,
                followers: true,
                followings: true,
                profile: {
                    select: {
                        id: true,
                        department: true,
                        introduce: true,
                        welltalent: {
                            select: {
                                contents: true,
                            },
                        },
                        interesttalent: {
                            select: {
                                contents: true,
                            },
                        },
                        profileImage: {
                            select: {
                                src: true,
                            },
                        },
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByNickname = async (nickname) => {
    try {
        return await prisma.user.findUnique({
            where: { nickname },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateNickname = async (data) => {
    try {
        return await prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                nickname: data.nickname,
                updatedAt: now,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updatePassword = async (id, password) => {
    try {
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
                updatedAt: now,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
