import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { TRANSMISSION, VECHICLE_BRANDS, VECHICLE_CONDITIONS } from "app/shared/config/common.constants";
import { VechicleService } from "app/shared/services/vechicle.service";

export interface VechicleTO {
  id: string,
  brand: string,
  vechicleModel: string,
  transmission: string,
  vtype: string,
  condition: string,
  modelYear: string,
  mileAge: string,
  price: string,
  priceNegotiable: string,
  fuelTypes: string,
  contactName: string,
  contactPlace: string,
  contactPhone: string,
  description: string,
  imgUrl: string
};

@Component({
  selector: 'app-add-vechicle',
  templateUrl: './add-vechicle.component.html',
  styleUrls: ['./add-vechicle.component.css']
})
export class AddVechicleComponent implements OnInit {
  transmissions: Array<any> = [];
  brands: Array<any> = [];
  conditions: Array<any> = [];
  fuelType: Array<any> = [{ "text": "Petrol" }, { "text": "Diesel" }, { "text": "Hybrid" }, { "text": "Gas" }, { "text": "Other" }];
  isUnsaved: boolean = false;
  userForm: FormGroup;
  // fuelTypesArray:Array<any>= [];
  error: boolean = false;
  message: string = '';


  constructor(private formBuilder: FormBuilder, private vechicleService: VechicleService) {

    this.transmissions = TRANSMISSION;
    this.brands = VECHICLE_BRANDS;
    this.conditions = VECHICLE_CONDITIONS;

    this.userForm = formBuilder.group({
      'brand': ['', [Validators.required]],
      'vechicleModel': ['', [Validators.required]],
      'transmission': ['', [Validators.required]],
      'vtype': ['', [Validators.required]],
      'condition': ['', [Validators.required]],
      'modelYear': ['', []],
      'mileAge': ['', []],
      'price': ['', [Validators.required]],
      'priceNegotiable': ['', []],
      'fuelType[]': ['', [Validators.required]],
      'contactName': ['', [Validators.required]],
      'contactPlace': ['', [Validators.required]],
      'contactPhone': ['', [Validators.required]],
      'description': ['', []],
      'imgUrl': ['', []],
      'fuelTypes': formBuilder.array([
        [
          [false, false, false], []
        ]
      ])

    });


  }

  ngOnInit() {
  }
  handleForSubmit(form) {
    // console.log('Form Submitted ', form.value);
    console.log(this.userForm.value);


    console.log(this.userForm.value['imgUrl']);
    //  let vechicle :VechicleTO = null;
    let vechicle: VechicleTO = <VechicleTO>{};
    vechicle.brand = this.userForm.value['brand'];
    vechicle.vechicleModel = this.userForm.value['vechicleModel'];
    vechicle.transmission = this.userForm.value['transmission'];
    vechicle.vtype = this.userForm.value['vtype'];
    vechicle.condition = this.userForm.value['condition'];
    vechicle.modelYear = this.userForm.value['modelYear'];
    vechicle.mileAge = this.userForm.value['mileAge'];
    vechicle.priceNegotiable = this.userForm.value['priceNegotiable'];
    vechicle.price = this.userForm.value['price'];
    vechicle.contactName = this.userForm.value['contactName'];
    vechicle.contactPlace = this.userForm.value['contactPlace'];
    vechicle.contactPhone = this.userForm.value['contactPhone'];
    vechicle.description = this.userForm.value['description'];
    vechicle.imgUrl = this.userForm.value['imgUrl'];

    // let result = this.vechicleService.addVechicleForSale(vechicle);
    // console.log('Vechiclse add for sale ', result);
    this.error = false;
    this.vechicleService.addVechicleForSale(vechicle).subscribe((data) => {
      console.log(data);
      this.message = "Vechicle Added Successfuly to the sale!!!"
    }, (err) => {
      this.error = true;
    });

    // console.log(result['ZoneAwarePromise']['__zone_symbol__state']);
  }

  public checkUnsaved() {
    return this.isUnsaved;
  }

  public editVechicle(vechicleId) {
    console.log('Inside Edit Vechcle', vechicleId);
  }
}
