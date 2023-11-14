import { Context } from "hono";
import { Bindings } from "../types/worker";
import { db } from ".";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

type User = typeof users.$inferSelect;
type NewUser = typeof users.$inferInsert;

/**
 * Get a user by their email address.
 *
 * @param c Request context.
 *
 * @param email The email of the user.
 *
 * @returns Promise resolving the full `User` or `null`.
 */
export const getUserByEmail = async (
    c: Context<{ Bindings: Bindings }>,
    email: string
): Promise<User | null> => {
    const start = Date.now();

    const user = await db(c)
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
        .then((users) => users[0] || null);

    console.log(`get user: ${Date.now() - start}ms`);

    return user;
};

/**
 * Create a new `User`.
 *
 * @param c Request context.
 * @param user Details of the user to add to the database.
 *
 * @returns Promise resolving the freshly created `User`.
 */
export const createUser = async (
    c: Context<{ Bindings: Bindings }>,
    user: NewUser
): Promise<User> => {
    const start = Date.now();

    const newUser = await db(c)
        .insert(users)
        .values(user)
        .returning()
        .then((users) => users[0]);

    console.log(`create user: ${Date.now() - start}ms`);

    return newUser;
};
