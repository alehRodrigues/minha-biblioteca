export type User = {
    name: string | null;
    email: string | null;
    perfilId: number | null;
};

export const useUser = () => {
    const user: Ref<User> = ref({
        name: null,
        email: null,
        perfilId: null,
    });
    return useState<User>("user", () => user);
};
