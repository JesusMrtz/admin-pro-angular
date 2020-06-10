export class HospitalModel {
    public name: string;
    public image: string;
    public _id: string;

    constructor(name: string, image?: string, id?: string) {
        this.name = name;
        this.image = image;
        this._id = id;
    }
}