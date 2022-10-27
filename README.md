<h1 style="text-align: center;">FuturePreneurs 8.0</h1>
<h3 style="text-align: center;">Entrepreneurship Cell, VIT brings to you Futurepreneurs 8.0, its business simulation competition.</h3>

<p align="center">
<img src="https://user-images.githubusercontent.com/73993394/197338929-809b52bd-1dcf-486c-9002-e975d79194bb.png" alt="drawing" width="80%"/>
</p>

## About

This backend platform for FuturePreneurs 8.0, hosted over **1800** participants for a multitude of different adventures. For over a month in production, with more than **600 commits** in toll, this virtual arena incorporates a legion of features including realtime `drag and drop` gameplay, and `synchronous, all-inclusive team formation`. From uniquely structured `RPG game rounds` to a melange of `quiz-based bouts`, it handled every activity in succession, for the journey of this event. Explore the whole project here!

## Tech Stack Used

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next JS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

## Team Creation and Joining Phase

Here the user can either choose to create a team as shown below:
![demo6](https://user-images.githubusercontent.com/92802904/197411959-549c0bda-ea66-4f8b-ac8b-6863766ec0b4.gif)

- Once a team is created by the user,he/she has the full control of the team(accept/decline user join requests, remove existing members, delete the team, invite users by sending them invite link)
![demo8](https://user-images.githubusercontent.com/92802904/197414220-bf0b803c-4678-4945-852d-fdfd946d3896.gif)

- Here the user is joining a team through an invite link shared by the leader of the team.
![demo9](https://user-images.githubusercontent.com/92802904/197414237-2f9d5777-c59a-4486-8702-91bb5d0811fa.gif)

### OR
<br/>
The user can join an existing team by sending a joining request to the respective team leader by searching the desired team.

- On approval by the team leader,the user will automatically join the team.
- The leader can also choose to decline the request.
- Each user can send only 4 requests at a given time,
  - If they wish to send requests to more that 4 teams,they can easily delete their previously sent requests and then send in new requests.

![demo7](https://user-images.githubusercontent.com/92802904/197413865-c227fc4b-1c95-4f6c-9248-f584eb88d3fe.gif)

## Round 0

Round 0 Or Qualifying Round was a round to filter out top teams. It was a quiz based round where team leader could answer the questions based on his team's behalf.
![gif5](https://user-images.githubusercontent.com/66114276/197701388-12825d29-5a6d-42c5-8c7d-4b65dc4fc5d0.gif)


### Quiz Round Features

- [![Timer Enabled](https://img.shields.io/badge/Timer-Enabled-yellow.svg)]()
- [![Auto Submit](https://img.shields.io/badge/Auto-Submit-dark.svg)]()
- [![MultipleChoiceQuestions Enabled](https://img.shields.io/badge/MultipleChoiceQuestions-Enabled-dark.svg)]()
- [![SingleCorrectAnswer Enabled](https://img.shields.io/badge/SingleCorrectAnswer-Enabled-purple.svg)]()
- [![MultipleCorrectAnswer Enabled](https://img.shields.io/badge/MultipleCorrectAnswer-Enabled-dark.svg)]()
- [![DescriptiveQuestions Enabled](https://img.shields.io/badge/DescriptiveQuestions-Enabled-purple.svg)]()
- [![QuestionsWithImages Enabled](https://img.shields.io/badge/QuestionsWithImages-Enabled-dark.svg)]()
- [![CaseStudyQuestions Enabled](https://img.shields.io/badge/CaseStudyQuestions-Enabled-purple.svg)]()

- Questions were fetched and answers were stored in the backend successively
- There was no free navigation in the quiz, once the user moves to the next question, they weren't allowed to move back.
- If one wasn't to solve all the questions in the given time period, answered questions will be auto saved and submitted.

### Workflow of the Quiz Portal 😊

![image](https://user-images.githubusercontent.com/66114276/197696153-0d5a5072-5938-4868-b4aa-aa855cccc0aa.png)

When the quiz instructions page loads, a callback is triggered to check whether the user has logged in and whether is a team leader, if the above conditions are fullfilled...the user is 
allowed to attempt quiz give the user has not previously submitted the quiz.

---

![gif1](https://user-images.githubusercontent.com/66114276/197695442-1399b892-c470-4126-8363-cf6f6e909e2d.gif)

---

Questions from backend consisted of multiple answer correct and single answer correct.Questions from backend may or may not contain Images.
These type of **Multiple choice questions are recieved from backend in response to a fetch call**

- Multiple Answer Correct Match the following
- Single Answer Correct Match the following
![gif3](https://user-images.githubusercontent.com/66114276/197699664-3a1c9d2d-d5df-4c2a-ab8d-27b28e466f58.gif)

- Single Answer Correct Case Study
- Multiple Answer Correct Case study
     ![gif6](https://user-images.githubusercontent.com/66114276/197701580-00e1fe11-5520-41ed-a31d-0e44cb58462a.gif)
- Descriptive Question Answers
  ![image](https://user-images.githubusercontent.com/66114276/197700437-f2e290f2-a564-4979-8544-71e5a190e2ba.png)
 
---
---
---

- **For descriptive type questions**: One can type the answers. There is no word limit. -:![last](https://user-images.githubusercontent.com/66114276/197700074-b3a25ebc-93b9-4be8-b7bf-824a33a4cf89.gif)

- **_For Match the following type questions:_**  
   First select the question and then its corresponding answer. Both the entities will be highlighted with the same colour after this is done. Repeat the process for all the options in the question.
  If you want to deselect your choice in Match the following type, click on that particular question.
![image](https://user-images.githubusercontent.com/66114276/197696142-adbaf77e-8322-4d5a-ac18-cdd2786598ca.png)

- To answer any question regarding a **case study**, read through the case study thoroughly.
    -:![gif6](https://user-images.githubusercontent.com/66114276/197695876-4411ca53-b807-4b67-a660-22c98a458b81.gif)
- One can use the **clear all** button, to deselect all the options incase you face any ambiguity.

- For moving to the **Next Question** ,one can click on Next Button to view next Question. Everytime user clicks on new button , answer of previous question from user will be send to backend and new question will appear on the user's Screen from backend.

- Once all the questions are finished, then a finish button will appear and once submitted, user will be directed to Thank You Page.
![image](https://user-images.githubusercontent.com/66114276/197696170-224584e7-97bf-4ab7-bcab-03fabcf535c8.png)

### ☑️ Marking scheme for multiple options correct from Backend :
![image](https://user-images.githubusercontent.com/66114276/197696149-0d391686-721d-440f-affc-3ac0c016c475.png)
- If and only if all the correct options are selected, you'll be awarded 4 points.
- If even one incorrect option is selected, the team will lose 1 point.
- No points will be awarded if the question is left unanswered.

### ☑️ Marking scheme for Single options correct from Backend :
![image](https://user-images.githubusercontent.com/66114276/197696163-942bfeac-e8a9-4b79-b75b-f57d674417eb.png)

- 4 points will be awarded if the correct option is selected.
- Team will lose 1 point if any incorrect option is selected.
- No points will be awarded if the question is left unanswered.

## Round 1.1

Here the user had to choose between five locations to place the resort into.

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

In this round we let the player choose where exactly do they want to place the resort. The green squares are the available places and the brown ones are the ones where your competetor has already placed one!

![round](/public/readme/two2.gif)

![round](/public/readme/two3.gif)

![round](/public/readme/two1.gif)

After every round we redirect to a dynamically rendered instructions page

## Round 1.3 - Placing Amenities Using Drag And Drop

In This Round The User Has To Place 10 Amenities From A Given Set of 30 Amenities.
Each Time A User Drags And Drops The Amenity A Request Is Made To The Backend.
The Backend On Initial Start Request Sends Us-Initial Balance,30 Amenities.
Each Amenities Price and isLeft Property is also recieved from the Backend.

### Placing An Amenity

![normaldrop](https://user-images.githubusercontent.com/88614335/197967519-f212d3db-4aa3-4e9c-9107-3e5466e48c4e.gif)

As we place an amenity directed in the gif above a request to the backend is made.
In the backend the amenity is added to the user list and the updated balance is sent back.

![dropbalanceexceed](https://user-images.githubusercontent.com/88614335/197966381-88ebf1aa-f744-41c7-ba28-8beffb32b486.gif)

In case of placing an amenity if the balance is not sufficient than an error popup will be showed.

### Removing An Amenity

![normalremove](https://user-images.githubusercontent.com/88614335/197966411-d046d1a8-8f76-44d1-9b2f-76fbcb8ba811.gif)

As we remove an amenity directed in the gif above a request to the backend is made.
In the backend the amenity is remove from the user list and the updated balance is sent back.
![lefttorightplace](https://user-images.githubusercontent.com/88614335/197966447-f0053255-7db3-4651-9cf2-d194888bd744.gif)


If we remove the Amenity which was orignally at left side and place it at right side or vice versa than it will be automatically handled and placed to its orignal position.
This is a frontend implementation and makes use of isLeft property sent from backend for each amenity in the beginning.

### Swapping An Amenity

![normalswap](https://user-images.githubusercontent.com/88614335/197966500-33000159-065f-4d32-8271-4648e533c562.gif)

If we swap an amenity with a new amenity ,two requests to the backend are made.One for removing the existing amenity and another for adding the new amenity.The balance is calculated respectively and sent back.

![preexistingswap](https://user-images.githubusercontent.com/88614335/197966531-63ba72f7-e7d9-4fca-9bb0-f481185c09ae.gif)

If we swap two position of two pre-existing amenity than there positionis switched on the frontend.No call to the backend is made.
![balancecheckswap](https://user-images.githubusercontent.com/88614335/197966561-812b7317-21f4-4aea-8380-5e3feeee2455.gif)

If we swap an amenity with a new amenity.
In this if the balance of the new amenity can be achieved after removing the old one than only it will be placed else an error popup will be showed.
