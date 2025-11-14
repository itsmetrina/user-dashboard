import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { User } from '../user';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	private usersSubject = new BehaviorSubject<User[]>([]);
	users$ = this.usersSubject.asObservable();

	constructor(private http: HttpClient) { }

	fetchUsers(): Observable<User[]> {
		console.log('Fetching user.')
		return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
			.pipe(
				tap(users => this.usersSubject.next(users)),
				catchError(() => throwError(() => 'Failed to fetch users'))
			);
	}

	getUser(id: number) {
		console.log(`Calling User by ${id}`);
		return this.users$.pipe(
			take(1),
			switchMap(users => {
				const cached = users.find(u => u.id === id);
				if (cached) return of(cached);

				return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
					.pipe(
						tap(user => {
							this.usersSubject.next([...users, user]);
						}),
						catchError(() => of(undefined))
					);
			})
		);
	}
}