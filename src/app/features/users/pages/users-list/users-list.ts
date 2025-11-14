import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './users-list.html',
	styleUrl: './users-list.scss',
})
export class UsersList implements OnInit, OnDestroy {

	users: User[] = [];
	filteredUsers: User[] = [];
	loading = true;
	error = false;

	searchTerm = '';

	private destroy$ = new Subject<void>();
	constructor(
		private usersservice: UsersService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.usersservice.fetchUsers()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (users) => {
					this.users = users;
					this.filteredUsers = users;
					this.loading = false;
				},
				error: () => {
					this.error = true;
					this.loading = false;
				}
			});
	}

	onSearch(term: string): void {
		this.searchTerm = term;

		this.filteredUsers = this.users.filter(u =>
			u.name.toLowerCase().includes(term.toLowerCase())
		);
	}

	onUserClick(id: number) {
		this.router.navigate(['/users', id]);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}