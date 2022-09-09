import React, { useEffect, useState } from "react";

function Questions(props) {
  const [question, setQuestion] = useState([]);
  
  // test team id-631785e70d683d0db6c8204e

  useEffect(()=>{
    console.log(question)
  }, [question])

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/team/quiz/631785e70d683d0db6c8204e`,
      {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3NGE4NmU1YTI2NDJlZjc1YzYxMmYiLCJpYXQiOjE2NjI0NzA3OTAsImV4cCI6MTY2MjU1NzE5MH0.MoxFA_C0ICoTM9oPZnE6XYa1uN_UZckc_N1oauV99nU`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // setQuestion((prevQuestion) => data.question);
        console.log(data.question);
      })
      .catch((err) => {
        console.log('errrr',err);
      });
  }, [])


  return (
    <div className="questionsContainer">
      <div className="questions">
        {question}
      </div>
      <div className="answers">
        {question}
      </div>
      
    </div>
  );
}

export default Questions;
