import { ModelBase } from "./base.model";
import * as encrypt from "../utils/encrypt";

export class PessoaModel extends ModelBase {
    NomeCompleto!: string;
    Email!: string;
    Telefone!: string;
    ResponsavelId!: number | null;
    Senha!: string;
    PerfilId!: number;

    constructor(Pessoa: Pessoa) {
        super(Pessoa.Id ?? null);
        this.nomeCompleto = Pessoa.NomeCompleto;
        this.email = Pessoa.Email;
        this.telefone = Pessoa.Telefone ?? "N/A";
        this.responsavelId = Pessoa.ResponsavelId ?? null;
        this.senha = Pessoa.Senha;
        this.perfilId = Pessoa.PerfilId;
    }

    validarSenha(senha: string): boolean {
        return encrypt.compareSync(senha, this.Senha);
    }

    validarPerfil(): boolean {
        return this.PerfilId === 1 || this.PerfilId === 2;
    }

    getId(): number {
        return this.Id ?? 0;
    }

    private set nomeCompleto(nomeCompleto: string) {
        this.NomeCompleto = nomeCompleto.trim().toLocaleUpperCase();
    }

    private set email(email: string) {
        this.Email = email.trim().toLocaleLowerCase();
    }

    private set telefone(telefone: string) {
        this.Telefone = telefone?.trim();
    }

    private set responsavelId(responsavelId: number | null) {
        this.ResponsavelId = responsavelId;
    }

    private set senha(senha: string) {
        if (senha.length > 8) this.Senha = senha;
        else if (senha === "") this.Senha = "N/A";
        else this.Senha = encrypt.encryptSync(senha);
    }

    private set perfilId(perfilId: number) {
        this.PerfilId = perfilId;
    }
}

export type Pessoa = {
    Id?: number | null;
    NomeCompleto: string;
    Email: string;
    Telefone?: string;
    ResponsavelId?: number | null;
    Senha: string;
    PerfilId: number;
};
