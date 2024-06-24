export abstract class ModelBase {
    protected Id: number | null = null;

    constructor(id: number | null) {
        this.Id = id;
    }
}