export interface BusinessHours {
	start: string;
	end: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  business_hours: BusinessHours;
}

export interface Food {
  id: number;
  name: string;
  restaurant: Restaurant;
  image: string[];
  price: number;
}

export interface OrderDetailItem {
  quantity: number;
  food: Food;
}

export interface GroupItem {
  restaurant: Restaurant;
  items: OrderDetailItem[];
}

export interface Config {
	isUserLoggedIn: boolean;
	lastName: string;
	orderCount: number
}
