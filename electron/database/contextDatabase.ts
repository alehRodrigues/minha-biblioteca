import type { Database } from "better-sqlite3";
import type { IElectronDatabaseRepository } from "../../interface";
import type { ModelBase } from "../models/base.model";
import * as path from "path";

import DatabaseObj from "better-sqlite3";

export abstract class ContextDatabase<T extends ModelBase>
    implements IElectronDatabaseRepository<T> {
    protected db: Database;
    private tableName: string;

    constructor(tableName: string) {
        const pathDatabase =
            process.env.NODE_ENV === "development"
                ? "./data.db"
                : path.join(process.resourcesPath, "./data.db");

        this.db = new DatabaseObj(pathDatabase);
        this.db.pragma("journal_mode = WAL");
        this.tableName = tableName;
    }

    getAll = (): T[] => {
        try {
            return this.db.prepare(`SELECT * FROM ${this.tableName}`).all() as T[];
        } catch (error) {
            console.error(error);
            return [] as T[];
        }
    };

    create = (entity: T): void => {
        const fields = this.getFields(entity);
        const values = this.getValues(entity);
        this.db.prepare(`INSERT INTO ${this.tableName} (${fields}) VALUES (${values})`).run();
    };

    getById = (id: number): T => {
        return this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ${id}`).get() as T;
    };

    update = (entity: T): void => {
        const query = this.getQueryUpdate(entity);
        console.log(query);

        this.db
            .prepare(
                `UPDATE ${this.tableName} SET ${query} WHERE id = ${Object.values(entity)[0]}`
            )
            .run();
    };

    delete = (id: number): void => {
        this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ${id}`).run();
    };

    private getFields(entity: T) {
        const params = Object.keys(entity);
        // const paramsString = params.flatMap((param) => {
        //     return param.charAt(0).toUpperCase() + param.replace('_', '');
        // });
        return params.filter((item) => item !== "Id").join(", ");
    }

    private getQueryUpdate(entity: T) {
        const entries = Object.entries(entity);
        const query = entries.map(([key, value]) => {
            if (typeof value === "string") {
                return `${key} = '${value}'`;
            }
            return `${key} = ${value}`;
        });
        return query.join(", ");
    }

    private getValues(entity: T) {
        const values = Object.values(entity);
        const valuesString = values.slice(1).flatMap((value) => {
            if (typeof value === "string") {
                return `'${value}'`;
            }
            if (value === null) {
                return `NULL`;
            }
            return value;
        });
        return valuesString.join(",");
    }
}
