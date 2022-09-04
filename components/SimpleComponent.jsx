import React, { useEffect, useState } from "react";

function SimpleComponent(props) {
  const [question, setQuestion] = useState([]);

  const first = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER1}/api/team/quiz/631448e7f8e5566f86260030`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE0NDc4M2ViMWIxN2M5MzE5Y2YzNmYiLCJpYXQiOjE2NjIyODAzMzIsImV4cCI6MTY2MjI4MTIzMn0.2g73QtY2SrtjFkaRc6dp35pA8hglDgGzBSejYsR1iOM`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuestion((prevQuestion) => [...prevQuestion, data.questions[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(question);
  return (
    <div>
      <button onClick={first}>CLikc</button>
    </div>
  );
}

export default SimpleComponent;
