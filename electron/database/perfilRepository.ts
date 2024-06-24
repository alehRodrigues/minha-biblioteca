import type { IElectronDatabaseRepository } from "~/interface";
import type { PerfilModel } from "../models/perfil.model";
import { ContextDatabase } from "./contextDatabase";

export class PerfilRepository extends ContextDatabase<PerfilModel> implements IElectronDatabaseRepository<PerfilModel> {

    constructor() {
        super("Perfil");
    }
}

