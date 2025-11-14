import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../user';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-user-details',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './user-details.html',
	styleUrl: './user-details.scss',
})
export class UserDetails implements OnInit, OnDestroy {
	id!: number;
	userDetails: User | null = null;
	loading = true;
	error = false;

	private destroy$ = new Subject<void>();

	constructor(
		private usersservice: UsersService,
		private activatedroute: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.activatedroute.paramMap
			.pipe(
				takeUntil(this.destroy$),
				switchMap(params => {
					this.id = Number(params.get('id'));
					this.loading = true;
					return this.usersservice.getUser(this.id);
				})
			)
			.subscribe({
				next: user => {
					this.loading = false;
					if (!user) {
						this.userDetails = null;
						this.error = true;
					}
					if (user) {
						this.userDetails = {
							id: user.id,
							name: user.name,
							username: user.username,
							email: user.email,
							address: {
								street: user.address.street,
								suite: user.address.suite,
								city: user.address.city,
								zipcode: user.address.zipcode,
								geo: {
									lat: user.address.geo.lat,
									lng: user.address.geo.lng
								}
							},
							phone: user.phone,
							website: user.website,
							company: {
								name: user.company.name,
								catchPhrase: user.company.catchPhrase,
								bs: user.company.bs
							}
						};
					}
				},
				error: () => {
					this.error = true;
					this.loading = false;
				}
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}