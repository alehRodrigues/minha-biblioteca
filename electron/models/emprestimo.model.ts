import { ModelBase } from "./base.model";

export class EmprestimoModel extends ModelBase {
    Id: number | null;
    LivroId: number;
    Livro: string;
    PessoaId: number;
    Pessoa: string;
    DataInicio: string;
    DataFim: string;

    constructor(
        id: number | null,
        livroId: number,
        pessoaId: number,
        dataInicio: string,
        dataFim: string
    ) {
        super(id);
        this.Id = id;
        this.LivroId = livroId;
        this.PessoaId = pessoaId;
        this.DataInicio = dataInicio;
        this.DataFim = dataFim;

        this.Pessoa = "";
        this.Livro = "";
    }

    set dataInicio(dataInicio: string) {
        this.DataInicio = dataInicio.trim();
    }

    set dataFim(dataFim: string) {
        this.DataFim = dataFim.trim();
    }
}
