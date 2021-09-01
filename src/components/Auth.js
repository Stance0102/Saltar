class Auth {
    constructor() {
        this.Authenticated = false;
    }

    login(cb) {
        this.Authenticated = true;
        console.log(this.Authenticated);
        cb();
    }

    logout(cb) {
        this.Authenticated = false;
        console.log(this.Authenticated);
        cb();
    }

    isAuthenticated() {
        return this.Authenticated;
    }
}

export default new Auth();
