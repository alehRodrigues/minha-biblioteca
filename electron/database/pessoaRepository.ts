import type { IElectronDatabaseRepository } from "~/interface";
import { ContextDatabase } from "./contextDatabase";
import { type Pessoa, PessoaModel } from "../models/pessoa.model";

export class PessoaRepository
    extends ContextDatabase<PessoaModel>
    implements IElectronDatabaseRepository<PessoaModel> {
    constructor() {
        super("Pessoa");
    }

    administradorExists = () => {
        const count = this.db
            .prepare(`SELECT COUNT(*) FROM Pessoa WHERE perfilId = 1`)
            .get() as { "COUNT(*)": number };
        return (count["COUNT(*)"] as number) > 0;
    };

    login = (email: string, senha: string): Pessoa => {
        const pessoa = this.db
            .prepare(`SELECT * FROM Pessoa WHERE email = '${email}'`)
            .get() as Pessoa;
        const pessoaModel = new PessoaModel(pessoa);
        if (!pessoaModel) throw new Error("Email não encontrado");
        if (!pessoaModel.validarSenha(senha)) throw new Error("Senha inválida");
        if (!pessoaModel.validarPerfil()) throw new Error("Perfil inválido");
        return pessoa;
    };
}
