
// Let
let favoriteCityId = "rome";
console.log(favoriteCityId);
favoriteCityId = "paris";
console.log(favoriteCityId);

// Const
const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
console.log(citiesId);
//citiesId = [];
citiesId.push("tokyo");
console.log(citiesId);

// Création d'objet
function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city: city, temperature: temperature };
}
const weather = getWeather(favoriteCityId);
console.log(weather);

// Affectation destructurée
const { city: city } = weather;
console.log(city);
const { temperature: temperature } = weather;
console.log(temperature);

// Rest operator
let [parisId, nycId, ...otherCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(otherCitiesId.length);

// Classe
class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
    toString() {
        return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this._price}]`;
    }
    set price(price) {
        this._price = price;
    }
    get price() {
        return this._price;
    }

    static getDefaultTrip() {
        return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");
    }
}
let parisTrip = new Trip("paris", "Paris", "img/paris.jpg");
console.log(parisTrip);
console.log(parisTrip.name);
parisTrip.price = 100;
console.log(parisTrip.toString());
const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());

// Héritage
class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this._price = 0;
    }
    toString() {
        return "Free"+super.toString();
    }
}
const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
console.log(freeTrip.toString());

// Promise, Set, Map, Arrow Function
class TripService {
    constructor() {
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }
    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                for (let trip of this.trips) {
                    if (trip.name == tripName) {
                        resolve(trip);
                    }
                }
                reject(`No trip with name ${tripName}`);
            }, 2000)
        });
    }
}
class PriceService {
    constructor() {
        this.trips = new Map();
        this.trips.set('paris', { price: 100 });
        this.trips.set('rio-de-janeiro', { price: 800 });
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                if (this.trips.has(tripId)) {
                    resolve(this.trips.get(tripId).price)
                }
                else {
                    reject(`No trip with id ${tripId}`);
                }
            }, 2000)
        });
    }
}

let tripService = new TripService();
let priceService = new PriceService();

tripService.findByName("Paris").then(trip =>
    console.log(`Trip found : ${trip.toString()}`))
    .catch(error => console.log(error));

tripService.findByName("Toulouse").then(trip =>
    console.log(`Trip found : ${trip.toString()}`))
    .catch(error => console.log(error));

tripService.findByName("Rio de Janeiro").then(trip =>
    priceService.findPriceByTripId(trip.id).then(price =>
        console.log(`Price found : ${price}`))
    ).catch(error => console.log(error));

tripService.findByName("Nantes").then(trip =>
    priceService.findPriceByTripId(trip.id).then(price =>
        console.log(`Price found : ${price}`))
    ).catch(error => console.log(error));