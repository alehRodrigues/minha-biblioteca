import type { IElectronDatabaseRepository } from "~/interface";
import { ContextDatabase } from "./contextDatabase";
import type { EmprestimoModel } from "../models/emprestimo.model";
import { LivroRepository } from "./livroRepository";
import { PessoaRepository } from "./pessoaRepository";

export class EmprestimoRepository extends ContextDatabase<EmprestimoModel> implements IElectronDatabaseRepository<EmprestimoModel> {

    private livroRepository: LivroRepository;
    private pessoaRepository: PessoaRepository;

    constructor() {
        super("Emprestimo");
        this.livroRepository = new LivroRepository();
        this.pessoaRepository = new PessoaRepository();
    }

    create = (entity: EmprestimoModel): void => {
        this.db.prepare(`INSERT INTO Emprestimo (LivroId, PessoaId, DataInicio, DataFim) 
            VALUES (${entity.LivroId}, ${entity.PessoaId}, '${entity.DataInicio}', '${entity.DataFim}')`).run();
    }
}