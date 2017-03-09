import {inject}         from 'aurelia-framework';
import {HttpClient}     from 'aurelia-fetch-client';
 
@inject(HttpClient)
export class Api {

	constructor(http) {
        http.configure(config => {
            config
                .withBaseUrl('http://localhost/api/');
        });

        this.http = http;
		//this.createUser();
    }

	//create new User
	createUser() {
		var userdata = {
			'name': 'Stefan',
			'json': JSON.stringify({test: '1'}),
			'email': 's.romeis@gmail.com'
		}
		this.http.fetch('user', {
				method: 'post',
				body: JSON.stringify(userdata)
			})
			.then(data => {
				console.log('Create User Response', data);
			})
	}

	//create new User
	getUser() {
		var userdata = {
			'name': 'Stefan',
			'json': JSON.stringify({test: '1'}),
			'email': 's.romeis@gmail.com'
		}
		this.http.fetch('user', {
				method: 'post',
				body: JSON.stringify(userdata)
			})
			.then(data => {
				console.log('Create User Response', data);
			})
	}

	//update User
	updateUser(UserID, json) {
		var userdata = {
			'name': 'Stefan',
			'json': JSON.stringify({test: '1'}),
			'email': 's.romeis@gmail.com'
		}
		this.http.fetch('user', {
				method: 'post',
				body: JSON.stringify(userdata)
			})
			.then(data => {
				console.log('Create User Response', data);
			})
	}

	
	updateUser(UserID, json) {
		var result = $.ajax({
			type : 'PUT',
			url : 'api/user/' + UserID,
			data: JSON.stringify(json)
		}).responseText;

		return result;
	}

	//get User
	getUser(UserID) {
		var result = $.ajax({
			type : 'GET',
			url : 'http://localhost/mme/mme2_uebung_4/api/user/124',
			success: function(data){
				console.log(data);
				return null;
			},
			error: function(data) {
				console.log(data);
			}
		}).responseText;

		return result;
	}
	

	//get all Users
	getAll(emailAddress) {
		var result = $.ajax({
			type : 'GET',
			async : false, 
			url : 'api/user?email=' + emailAddress
		}).responseText;

		return result;
	}

	//detele User
	deleteUser(UserID) {
		var result = $.ajax({
			type : 'DELETE',
			async : false,
			url : 'api/user/' + UserID
		}).responseText;
		return result;
	}
}
