import { ModelBase } from "./base.model";

export class PerfilModel extends ModelBase {
    Descricao: string;
    Id: number;

    constructor(id: number, descricao: string) {
        super(id);
        this.Id = id;
        this.Descricao = descricao;
    }
}
