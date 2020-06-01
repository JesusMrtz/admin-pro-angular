import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: [
  ]
})
export class BreadcumbsComponent implements OnInit {
  title;

  constructor(private router: Router, private titlePlatfom: Title, private meta: Meta) {
    this.getDataRoute().subscribe((title) => {
      this.title = title;
      this.titlePlatfom.setTitle(this.title);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: `Página de ${this.title}`
      };

      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data.title)
    );
  }

}
