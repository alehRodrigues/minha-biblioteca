import type { IElectronDatabaseRepository } from "~/interface";
import { ContextDatabase } from "./contextDatabase";
import type { LivroModel } from "../models/livro.model";

export class LivroRepository extends ContextDatabase<LivroModel> implements IElectronDatabaseRepository<LivroModel> {

    constructor() {
        super("Livro");
    }
}

