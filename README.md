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

Round 0 Or Qualifying Round is a round to split top teams. It is a quiz based round where team leader (if logged in) can answer the questions based on his team behalf.
![GIF](public/quiz/gif1.gif)
# Quiz Round Features

- [![Timer Enabled](https://img.shields.io/badge/Timer-Enabled-yellow.svg)]()
- [![Auto Submit](https://img.shields.io/badge/Auto-Submit-dark.svg)]()
- [![MultipleChoiceQuestions Enabled](https://img.shields.io/badge/MultipleChoiceQuestions-Enabled-dark.svg)]()
- [![SingleCorrectAnswer Enabled](https://img.shields.io/badge/SingleCorrectAnswer-Enabled-purple.svg)]()
- [![MultipleCorrectAnswer Enabled](https://img.shields.io/badge/MultipleCorrectAnswer-Enabled-dark.svg)]()
- [![DescriptiveQuestions Enabled](https://img.shields.io/badge/DescriptiveQuestions-Enabled-purple.svg)]()
- [![QuestionsWithImages Enabled](https://img.shields.io/badge/QuestionsWithImages-Enabled-dark.svg)]()
- [![CaseStudyQuestions Enabled](https://img.shields.io/badge/CaseStudyQuestions-Enabled-purple.svg)]()

- Questions will come from backend and answers will be send and stored in backend
  ![GIF](https://gifyu.com/image/S9Xwu)
- There will be no free navigation in the quiz, once one move to the next question, you cannot move back.

- If one is unable to solve all the questions in the given time period, answered questions will be auto saved and submitted.

## How to Use Our Quiz Portal 😊

When the quiz instructions page loads , a useeffect is triggered to check whether the user has logged in and whether he is a team leader or not, if the above conditions are fullfilled , then user is
allowed to attempt quiz if he has not previously submitted the quiz.

Questions from backend consists of multiple answer correct and single answer correct.Questions from backend may or maynot contain Images.
These type of **Multiple choice questions are recieved from backend in response via fetch call**

- Multiple Answer Correct Match the following
- Multiple Answer Correct Case study
- Single Answer Correct Match the following
- Single Answer Correct Case Study
- Descriptive Question Answers

---

- **For descriptive type questions**: One can type the answers. There is no word limit.

- **_For Match the following type questions:_**  
   First select the question and then its corresponding answer. Both the entities will be highlighted with the same colour after this is done. Repeat the process for all the options in the question.
  If you want to deselect your choice in Match the following type, click on that particular question.

- To answer any question regarding a **case study**, read through the case study thoroughly.

- One can use the **clear all** button, to deselect all the options incase you face any ambiguity.

- For moving to the **Next Question** ,one can click on Next Button to view next Question. Everytime user clicks on new button , answer of previous question from user will be send to backend and new question will appear on the user's Screen from backend.

- Once all the questions are finished, then a finish button will appear and once submitted, user will be directed to Thank You Page.

---

---

---

### 💀 Marking scheme for multiple options correct from Backend :

- If and only if all the correct options are selected, you'll be awarded 4 points.
- If even one incorrect option is selected, the team will lose 1 point.
- No points will be awarded if the question is left unanswered.

### 💀 Marking scheme for Single options correct from Backend :

- 4 points will be awarded if the correct option is selected.
- Team will lose 1 point if any incorrect option is selected.
- No points will be awarded if the question is left unanswered.

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
