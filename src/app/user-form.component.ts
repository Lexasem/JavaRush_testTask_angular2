import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from './user';
import {UserService} from './user.service';

@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
	model = new User("userName", 30, false);
	//submited = false;
	
	formVisible = false; //used for show/hide
	@Input() newUser: boolean;
	@Input() title: string;
	@Output() onSubmited = new EventEmitter<boolean>();
	constructor(
		private userService: UserService
	){}		
		
	onSubmit(){
		let res = null;
		if(this.newUser){
			res = this.userService.newUser(this.model);
		}else{
			res = this.userService.editUser(this.model);	
		}
		
		res.then(() => {
			this.clearForm();
			this.formVisible = false;
			this.onSubmited.emit(true);
		});
		
		//this.submited = true;
	}
	clearForm(){
		this.model = new User("userName", 30, false);
	}
	
	onCancel(){
		this.clearForm();
		this.formVisible = false;
	}
	
}