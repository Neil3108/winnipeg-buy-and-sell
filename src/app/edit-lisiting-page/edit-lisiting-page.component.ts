import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-edit-lisiting-page',
  templateUrl: './edit-lisiting-page.component.html',
  styleUrls: ['./edit-lisiting-page.component.css']
})
export class EditLisitingPageComponent implements OnInit {

  listing: Listing;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listingsService: ListingsService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Gets ID
    this.listingsService.getListingById(id)
      .subscribe(listing => {
        this.listing = listing;
      })
    console.log(this.listing)
    console.log(this.listingsService.getListingById(id))

  }
  onSubmit({ name, description, price}): void{
    this.listingsService.editListing(this.route.snapshot.paramMap.get('id'), name, description, price)
      .subscribe(() =>{
        this.router.navigateByUrl('/my-listings')
      })
  }
}