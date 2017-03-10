export class User{
	public id: number;
	public createdDate: Date;
	
	constructor(	
		public name: string,
		public age: number,
		public isAdmin: boolean
	){}

	toString(): String {
		return "[" + this.id + "] "+ this.name +" - " + this.age;
	}
}