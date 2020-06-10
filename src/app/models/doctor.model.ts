export class DoctorModel {
    public name: string;
    public hospital: any;
    public image: string;
    public _id: string;

    constructor(name: string, hospital: any, image?: string, id?: string) {
        this.name = name;
        this.hospital = hospital;
        this.image = image;
        this._id = id;
    }
}