import config from 'services/authConfig';

export class Login {

    constructor() {
        this.connected;
        this.loginModalOpen = false;
        this.email;
        this.password;
        this.api = config.providers.contrlOne.api;
    }

    signUp() {
        const self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: this.api + "/users",
                data: {
                    'email': this.email,
                    'password': this.password
                }
            }).done(function (res) {
                console.log('Success', res);
                self.loginModalOpen = false;
                localStorage.setItem('contrl.one.token', res.id_token);
                localStorage.setItem('user', self.email);
                console.log('signed up');
                self.connected = true;
                resolve(res);
            }).fail(function (err) {
                if (err.status == 401) {
                    self.login();
                }
                console.log('Error', err);
                reject(err);
            });
        })
    }

    login() {
        const self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: this.api + "/sessions/create",
                data: {
                    'email': this.email,
                    'password': this.password
                }
            }).done(function (res) {
                console.log('Logged in', res);
                self.loginModalOpen = false;
                localStorage.setItem('contrl.one.token', res.id_token);
                localStorage.setItem('user', self.email);
                self.connected = true;
                resolve(res);
            }).fail(function (err) {
                console.log('Error', err);
                reject(err);
            });
        })
    }

    logout() {
        localStorage.removeItem('contrl.one.token');
        localStorage.removeItem('user');
        this.connected = false;
        this.items = [];
    }
}