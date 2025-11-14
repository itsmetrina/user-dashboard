import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-users-layout',
	standalone: true,
	imports: [RouterOutlet],
	template: `<router-outlet />`,
	styles: ``,
})
export class UsersLayout {}