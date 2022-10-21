# Main Section

Place your rounds below this.

## Round 0

## Round 1.1

## Round 1.2

## Round 1.3-Placing Amenities Using Drag And Drop

In This Round The User Has To Place 10 Amenities From A Given Set of 30 Amenities.
Each Time A User Drags And Drops The Amenity A Request Is Made To The Backend.
The Backend On Initial Start Request Sends Us-Initial Balance,30 Amenities.
Each Amenities Price and isLeft Property is also recieved from the Backend.

### Placing An Amenity

GIF

As we place an amenity directed in the gif above a request to the backend is made.
In the backend the amenity is added to the user list and the updated balance is sent back.

GIF

In case of placing an amenity if the balance is not sufficient than an error popup will be showed.

### Removing An Amenity

GIF

As we remove an amenity directed in the gif above a request to the backend is made.
In the backend the amenity is remove from the user list and the updated balance is sent back.

GIF

If we remove the Amenity which was orignally at left side and place it at right side or vice versa than it will be automatically handled and placed to its orignal position.
This is a frontend implementation and makes use of isLeft property sent from backend for each amenity in the beginning.

### Swapping An Amenity

GIF

If we swap an amenity with a new amenity ,two requests to the backend are made.One for removing the existing amenity and another for adding the new amenity.The balance is calculated respectively and sent back.

GIF

If we swap two position of two pre-existing amenity than there positionis switched on the frontend.No call to the backend is made.

GIF

If we swap an amenity with a new amenity.
In this if the balance of the new amenity can be achieved after removing the old one than only it will be placed else an error popup will be showed.
