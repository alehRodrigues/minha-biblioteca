import type { LivroRepository } from "./electron/database/livroRepository";
import type { PerfilRepository } from "./electron/database/perfilRepository";
import type { PessoaRepository } from "./electron/database/pessoaRepository";
import type { EmprestimoRepository } from "./electron/database/emprestimoRepository";
import type { IModelBase } from "./electron/models/base.model";

export interface IElectronDatabase {
    perfilRepository: PerfilRepository;
    pessoaRepository: PessoaRepository;
    livroRepository: LivroRepository;
    emprestimoRepository: EmprestimoRepository;
}

export interface IElectronDatabaseRepository<T extends IModelBase> {
    create: (entity: T) => void;
    getAll: () => T[];
    getById: (id: number) => T;
    update: (entity: T) => void;
    delete: (id: number) => void;
}

declare global {
    interface Window {
        database: IElectronDatabase;
    }
}
