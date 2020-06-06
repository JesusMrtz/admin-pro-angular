export class UserModel {
    public name: string;
    public email: string;
    public password: string;
    public image: string;
    public role: string;
    public google: boolean;
    public _id: string;

    constructor(name: string, email: string, password: string, image?: string, role?: string, google?: boolean, _id?: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image;
        this.role = role;
        this.google = google;
        this._id = _id;
    }
}
