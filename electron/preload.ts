import { contextBridge } from "electron";
import { PerfilRepository } from "./database/perfilRepository";
import { PessoaRepository } from "./database/pessoaRepository";
import { LivroRepository } from "./database/livroRepository";
import { EmprestimoRepository } from "./database/emprestimoRepository";

contextBridge.exposeInMainWorld("database", {
    perfilRepository: new PerfilRepository(),
    pessoaRepository: new PessoaRepository(),
    livroRepository: new LivroRepository(),
    emprestimoRepository: new EmprestimoRepository(),
});
