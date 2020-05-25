# Hike Hire

*Our goal is to connect you with the trails and local trail guides in your desired location.

*Hike Hire is a interactive app that allows a non-native hiker figure out there next hike;as well, as to procure a hiking guide for a multitude of different trails in any given area.  This app will allow you to create a profile/ log in, and select whether you are a hiking guide or a hiker, that is looking for different trails to take on.  If you are a hiking guide it allows you to create a profile in order for your services to be procured. 

A fun interaction with this app is being able to type in a city and state, ex (Richmond, VA) and bring up all the local trails within a large radius of Richmond. 

If you are a hiker you can mark the trail as being hiked and add it to you profile or request a guide for a new trail. Which then the app will render local guides and their contact methods. 

A web application intergrating multiple server-side APIs and data that takes a user's search input to populate pins for both trails guide on a  interactive map.

https://github.com/paul-houser3333/Trales-AlesV2
https://shrouded-anchorage-20263.herokuapp.com/    (deployed link)

## User Story

While looking to plan your next future outdoor adventures you are able to search new trail 
destianitions and find local guides to trek with you. 

```
AS An outdoors enthusiast
I WANT to find trails and local guides
FOR a location of my choosing
SO that I can conveniently plan an enjoyable Hike
```

## Dependencies 
Bcryptjs (encryption of passwords)
Cloudinary ( allows user to store profile picture)
Express ( Node.js web application framework)
Express Session ( stores data that you would want to access across requests)
Mysql ( Data base connection )
Passport ( allows for various authentication methods)
Passport-local (authenticate username and password locally)
Sequelize (object relational mapper provides easy access to databases)

### Libraries

- jQuery
- Leaflet
- Materialize

### APIs

- Nominatim for OpenStreetMap
- REI's Hiking Project Data API


## Functionality

```
GIVEN a map with a search input
WHEN I hover over the input field
THEN a tooltip message appears with example search 
WHEN I search for a city and state
THEN I am presented with pins for trails in that area
WHEN I click on a trail pin
THEN I am presented with the trail name and guides
WHEN I scroll or drag the map
THEN the map moves accordingly
WHEN I type a new city and state in the search field
THEN the new location is centered on the map
AND new trails and breweriers are populated
WHENEVER a search is submitted
THEN the search field is cleared
SO that I can easily search the next destination
```
### Future Development 

### API Improvements

### Upcoming Functionality

**Previews**
GIF

**Inter-Connectivity**

As this app is a planning tool, it would be beneficial to have options for connecting with personal guides and calendars on user's devices, as well as the ability to text or email locations to friends' devices all from within the app. 

As an app that supports physical activity, it would also be convenient to link it with users' health and fitness apps. Trail information (like length, difficulty, ascent/descent) can be sent to outside apps which can then use it to generate accurate exercise logs.

### Global Expansion

This app is optimized for searches within the United States of America. With additional API's and research, it can extend beyond the current national limits and render accurate trail and guide data for other countries and world regions.

## Creators

- [Andrew Zinski](https://github.com/AZGchip "Visit Andrew's GitHub")
- [Daniel Abell](https://github.com/dmabell693 "Visit Daniel's GitHub")
- [Emilia Josefina Hartline](https://github.com/emijoha "Visit Emilia's GitHub")
- [Krishna Gundavaram](https://github.com/deepakgundavaram "Visit Krishna GitHub")
- [Paul Mikel Houser](https://github.com/paul-houser3333 "Visit Mike's GitHub")

