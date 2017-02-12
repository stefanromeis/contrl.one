import {inject}         from 'aurelia-framework';
import {HttpClient}     from 'aurelia-fetch-client';
 
@inject(HttpClient)
export class Api {
	constructor(http){
		this.http = http;
	}

	//create new User
	createUser(json) {
		var result = "default";
		
		result = $.ajax({
			type : 'POST',
			async : false,
			url : 'api/user',
			data: JSON.stringify(json),
		}).responseText;
		
		return result;
	}

	//update User
	updateUser(UserID, json) {
		var result = $.ajax({
			type : 'PUT',
			async : false,
			url : 'api/user/' + UserID,
			data: JSON.stringify(json)
		}).responseText;

		return result;
	}

	//get User
	getUser(UserID) {
		var result = $.ajax({
			type : 'GET',
			async : false, 
			url : 'api/user/' + UserID,
			success: function(data){ 
				return null;
			},
			error: function(data) {
				alert('ID '+UserID+' not found');
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
