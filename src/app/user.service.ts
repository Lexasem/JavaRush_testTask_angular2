import { User } from './user';
import { Page } from './page';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
	private adminsUrl = window.location.href.replace("/index.html", "/")+'api/users';
	private testDataUrl = window.location.href.replace("/index.html", "/")+'api/util/addtestdata';
	private headers = new Headers({'Content-Type': 'application/json; charset=UTF-8'});
	constructor(private http: Http){}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
	
	getUsers(): Promise<User[]>{
		return this.http.get(this.adminsUrl)
					.toPromise()
					.then(response => response.json().data as User[])
					.catch(this.handleError);
	}
	
	getPage(pnum:number): Promise<Page>{
		return this.http.get(`${this.adminsUrl}/page/${pnum}`)
					.toPromise()
					.then(response => response.json().data as Page)
					.catch(this.handleError);
	}
	
	getPageSearch(pnum:number, search: string): Promise<Page>{
		search = encodeURIComponent(search);
		
		return this.http.get(`${this.adminsUrl}/pagefind/${pnum}/${search}`)
					.toPromise()
					.then(response => response.json().data as Page)
					.catch(this.handleError);
	}

	find(search: string): Promise<User[]>{
	return this.http.get(`${this.adminsUrl}/find/${search}`)
					.toPromise()
					.then(response => response.json().data as User[])
					.catch(this.handleError);
	}
	
	
	
	deleteUser(id: number): Promise<void>{
		//console.log(`${this.adminsUrl}/delete/${id}`);
		return this.http.delete(`${this.adminsUrl}/delete/${id}`,{headers: this.headers} )
					.toPromise()
					.then(() => null)
					.catch(this.handleError);
	}
	addTestData(): Promise<void>{
		return this.http.get(this.testDataUrl)
				   .toPromise()
				   .then(()=>null)
				   .catch(this.handleError);
	}
	newUser(user: User):Promise<void>{
		return this.http.put(`${this.adminsUrl}/add`,JSON.stringify(user),{headers: this.headers})
		           .toPromise()
				   .then(() => null)
				   .catch(this.handleError);
	}
	editUser(user: User):Promise<void>{
		return this.http.post(`${this.adminsUrl}/update`,JSON.stringify(user),{headers: this.headers})
		           .toPromise()
				   .then(() => null)
				   .catch(this.handleError);
	}
}