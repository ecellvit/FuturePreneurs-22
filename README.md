# FuturePreneurs 8.0

Platform for FuturePreneurs 8.0, that hosted over **1800** participants for a multitude of different adventures. For over a month in production, with more than **600 commits** in toll, this virtual arena incorporates a legion of features including realtime `drag and drop` gameplay, and `synchronous, all-inclusive team formation`. From uniquely structured `RPG game rounds` to a melange of `quiz-based bouts`, it handled every activity in succession, for the journey of this event. Explore the whole project here!

Place your rounds below this.
## Dashboard

Here the user can either choose to create a team as shown below.
![demo6](https://user-images.githubusercontent.com/92802904/197411959-549c0bda-ea66-4f8b-ac8b-6863766ec0b4.gif)

Once a team is created by the user,he/she has the full control of the team(accept/decline user join requests, remove existing members, delete the team, invite users by sending them invite link)
![demo8](https://user-images.githubusercontent.com/92802904/197414220-bf0b803c-4678-4945-852d-fdfd946d3896.gif)

Here the user is joining a team through an invite link shared by the leader of the team.
![demo9](https://user-images.githubusercontent.com/92802904/197414237-2f9d5777-c59a-4486-8702-91bb5d0811fa.gif)

OR 
<br/>
The user can join an existing team by send a joining request to the respective team leader by searching the desired team.On approval by the team leader,the user will automatically join the team.The leader can also choose to decline the request.Each user can send only 4 requests at a given time,if they wish to send requests to different teams,they can easily delete their previously sent requests.
![demo7](https://user-images.githubusercontent.com/92802904/197413865-c227fc4b-1c95-4f6c-9248-f584eb88d3fe.gif)

## Round 0

## Round 1.1
### Selecting Area through RPG game

Here the user had to choose between five locations to place his resort into.

![round-one](/public/readme/one.png)


Beach
![beach](/public/readme/one1.gif)

Hospital
![hospital](/public/readme/one3.gif)

Tech Park
![tech](/public/readme/one2.gif)

Temple
![temple](/public/readme/temple0.png)

School
![school](/public/readme/school.png)

we display time on top
![time](/public/readme/time.gif)


These are the 5 locations:


## Round 1.2
In this round we let the player choose where exactly does he want to place his resort. The green squares are the available places and the brown ones are the ones where your competetor has already placed one!

![round](/public/readme/two2.gif)

![round](/public/readme/two3.gif)

![round](/public/readme/two1.gif)

After every round we redirect to instructions

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
