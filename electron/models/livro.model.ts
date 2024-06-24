import { ModelBase } from "./base.model";

export class LivroModel extends ModelBase {
    Id: number | null;
    Titulo: string;
    Descricao: string;
    Categoria: string;

    constructor(id: number | null, titulo: string, descricao: string, categoria: string) {
        super(id);
        this.Id = id;
        this.Titulo = titulo;
        this.Descricao = descricao;
        this.Categoria = categoria;
    }

    set titulo(titulo: string) {
        this.Titulo = titulo.trim().toLocaleUpperCase();
    }

    set descricao(descricao: string) {
        this.Descricao = descricao.trim();
    }

    set categoria(categoria: string) {
        this.Categoria = categoria.trim().toLocaleUpperCase();
    }
}