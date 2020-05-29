# Hike Hire

*Our goal is to connect you with the trails and local trail guides in your desired location.

 
*Hike Hire is a interactive app that allows a non-native hikers to figure out there next hike; as well, as to procure a hiking guide for a multitude of different trails in any given area.  This app will allow you to create a profile/ log in, to be a guide and mark trails that you service in order for your services to be procured. 

 
*A fun interaction with this app is being able to type in a city and state, ex (Richmond, VA) and bring up all the local trails and all guides within a large radius of any given city and state 

*This is a web application intergrating multiple server-side APIs and many to many table interactions. This allows guides to input and populate pins for trails that they are willing to take potinical clients on and allow hikers to view this on a interactive map.


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
Bulma (CSS libary for styling)

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
WHEN input field is entered
THEN a map populates with hiking pins 
WHEN trail are clicked on 
THEN it displays info on the trail, as well as if a trail guide adivable  
WHEN the guide button is clicked
THEN I am presented with a form to sign up to be a trail guide
WHEN guide profile is creathe 
THEN the guide is able to add a profile picture and trails that he will guide

```
### Future Development APP Expansion

This app is optimized for global trail maps. With additional knowlage of how to incorpate  how to connect many to many tables so a user could create a (hiker account), Then the hiker can plan future hikes and have sugested guides to populate as recomaditions for the trails they have slected. 



### Upcoming Functionality/ Inter-Connectivity**

As this app is a planning tool, it would be beneficial to have options for connecting with personal guides and calendars on user's devices, as well as the ability to text or email locations to friends' devices all from within the app. 

**Previews**
<iframe src="https://drive.google.com/file/d/1Me9bYWa_Q0WJyCTORq8Nj3yXgu1oR40Z/preview" width="640" height="480"></iframe>



## Creators

- [Andrew Zinski](https://github.com/AZGchip "Visit Andrew's GitHub")
- [Daniel Abell](https://github.com/dmabell693 "Visit Daniel's GitHub")
- [Emilia Josefina Hartline](https://github.com/emijoha "Visit Emilia's GitHub")
- [Krishna Gundavaram](https://github.com/deepakgundavaram "Visit Krishna GitHub")
- [Paul Mikel Houser](https://github.com/paul-houser3333 "Visit Mike's GitHub")

