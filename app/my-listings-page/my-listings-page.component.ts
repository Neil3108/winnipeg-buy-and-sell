import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-my-listings-page',
  templateUrl: './my-listings-page.component.html',
  styleUrls: ['./my-listings-page.component.css']
})
export class MyListingsPageComponent implements OnInit {

  listings: Listing[] = [];

  constructor(
    private listingService: ListingsService
  ) { }

  ngOnInit(): void {
    this.listingService.getListingForUser()
      .subscribe(listings => this.listings = listings)
  }

  onDeleteClicked(listingID: string) : void {
    this.listingService.deleteListing(listingID)
    .subscribe(() => {
      this.listings = this.listings.filter(
        listing => listing.id !== listingID
      )
    })
  }

}