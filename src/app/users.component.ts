import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from './user';

import { Page } from './page';

import { UserService } from './user.service';


@Component({
	
	selector: 'usersTag',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
	
})
export class UsersComponent implements OnInit{
	arr = Array;
	
	
	
	showNewForm = false;
	searchStr: string;
	
	page = new Page();
	
	
	constructor(
		private userService: UserService
	){}
	
	ngOnInit(){
		
		//this.getUsers();
		this.getPage();
	}
	
	getPage(pnum?:number):void{
		
		if(pnum == null) pnum = this.page.curentPage;
		if(this.searchStr == null || this.searchStr == ''){
			this.userService.getPage(pnum).then(page => this.page = page);
		}else{
			this.userService.getPageSearch(pnum, this.searchStr).then(page => this.page = page);
		}
	}
	
	delUser(user:User):void{
		this.page.entities = this.page.entities.filter(usr => usr !== user);
		this.userService.deleteUser(user.id)
				.then(()=>this.getPage());
	}
	addTestData(): void{
		this.userService.addTestData()
		.then(() => this.getPage());
		
	}
	onSubmit(event: boolean){
		this.getPage();
	}
	
	onSearchEnter(){
		if(this.searchStr != null || this.searchStr != ""){
			this.getPage(1);
		}
	}
	onPageClick(pnum: number){
		
		if(pnum != this.page.curentPage) {
			this.getPage(pnum);
		}
	}
}