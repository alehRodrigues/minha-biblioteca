export const rules = {
    required: (v: string) => !!v || "Campo obrigatório",
    nome: (v: string) =>
        (v && v.length >= 3 && v.length <= 20) ||
        "Mínimo de 3 caracteres e máximo de 20 caracteres",
    titulo: (v: string) =>
        (v && v.length >= 3 && v.length <= 50) ||
        "Mínimo de 3 caracteres e máximo de 50 caracteres",
    descricao: (v: string) =>
        (v && v.length >= 3 && v.length <= 100) ||
        "Mínimo de 3 caracteres e máximo de 100 caracteres",
    categoria: (v: string) =>
        (v && v.length >= 3 && v.length <= 20) ||
        "Mínimo de 3 caracteres e máximo de 20 caracteres",
    email: (v: string) => /.+@.+\..+/.test(v) || "E-mail inválido",
    senha: (v: string) =>
        /(?=.*\d)(?=.*[!@#$%^&*]).{6,}/.test(v) ||
        "A senha deve ter pelo menos 6 caracteres, um número e um caractere especial",
    confirmacaoSenha: (senha: string) => (v: string) =>
        v === senha || "A confirmação de senha deve ser igual à senha",
};
