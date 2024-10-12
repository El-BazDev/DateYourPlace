class Location {
  constructor(data) {
    this.country = data.country;
    this.state = data.state;
    this.county = data.county;
    this.city = data.city;
    this.postcode = data.postcode;
    this.suburb = data.suburb;
    this.formatted = data.formatted;
    this.timezone = data.timezone;
  }
}

module.exports = Location;