import { Component, VERSION } from '@angular/core';
import { TeamService } from './team.service';
import { SearchCriteria } from './SearchCriteria';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  results = [];
  leagues = [];
  showCriteria = true;
  searchForm: FormGroup;

  constructor(private teamService: TeamService, private fb: FormBuilder) {}

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((teams) => {
      this.results = teams;
    });
    this.teamService.getLeagues().subscribe((leagues) => {
      this.leagues = leagues;
      this.leagues.unshift({ id: -1, name: 'Any' });
    });
    this.initializeForm();
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      teamName: '',
    });
  }
  onSearch(): void {
    let criteria = new SearchCriteria();
    let teamName = this.searchForm.value.teamName.trim();

    criteria.name = teamName === '' ? null : teamName;

    this.teamService.searchTeams(criteria).subscribe((teams) => {
      this.results = teams;
    });
  }

  toggleSearchCriteria() {
    this.showCriteria = !this.showCriteria;
  }
}
