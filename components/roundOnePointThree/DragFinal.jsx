import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import styles from "../../styles/Drag.module.css";
import uuid from "uuid";
import { useSession } from "next-auth/react";

// // for getting user details
// const { session } = useSession();
// //token id
// useEffect(() => {
//   if (teamData?.teamId?._id) {
//     setIsLoading(true);
//     fetch(
//       `${process.env.NEXT_PUBLIC_SERVER}/api/team/token/${teamData.teamId._id}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.accessTokenBackend}`,
//           "Access-Control-Allow-Origin": "*",
//         },
//       }
//     )
//       .then((data) => data.json())
//       .then((data) => {
//         setTeamToken(data.teamToken);
//         setIsLoading(false);
//       });
//   }
// }, [session, teamData]);

//TODO :- POST REQUEST ON BACKEND ADD AND DELETE.
//ADD REQUEST IF SOMETHING GETS REMOVED FROM 1ST AND LAST COLUMN AND DELETE REQUEST IF SOMETHING GETS ADDED TO FIRST AND LAST COLUMN
//NO REQUEST IF REORDERING HAPPENS OR IF WE DRAG AND DROP WITHIN 1ST AND LAST COLUMN OR FROM WITHIN THOSE 6 COLUMNS IN CENTER.
const itemsFromBackend = [
  { id: uuid(), name: "First task", price: 50 },
  { id: uuid(), name: "Second task", price: 100 },
  { id: uuid(), name: "Third task", price: 200 },
  { id: uuid(), name: "Fourth task", price: 90 },
  { id: uuid(), name: "Fifth task", price: 70 },
];
const itemsFromBacken = [
  { id: uuid(), name: "5 task" },
  { id: uuid(), name: "f task" },
  { id: uuid(), name: "cx task" },
  { id: uuid(), name: "cxx task" },
  { id: uuid(), name: "cxx task" },
];

const columnsList = {
  ["1"]: {
    name: "",
    items: itemsFromBackend,

    style: "styles.shelf_left",
  },
  ["2"]: {
    name: "",
    items: [],

    style: "shelf_center",
  },
  ["3"]: {
    name: "",
    items: [],
    price: 200,
    style: "shelf_center",
  },
  ["4"]: {
    name: "",
    items: [],
    price: 300,
    style: "shelf_center",
  },
  ["5"]: {
    name: "",
    items: [],
    price: 100,
    style: "shelf_center",
  },
  ["6"]: {
    name: "",
    items: itemsFromBacken,
    price: 100,
    style: "shelf_center",
  },
};
const initialBal = 510;

const onDragEnd = (result, columns, setColumns, bal, setbal) => {
  if (!result.destination) return;
  const { source, destination } = result;
  //if source and destination different
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    console.log(destination.droppableId);

    if (destination.droppableId !== "1" && destination.droppableId !== "6") {
      //if user tries to put more than 1 ittem in the center containers, then swap the elements
      if (destItems.length !== 0) {
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        });
        const newBal = bal - removed.price;

        const [re] = destItems.splice(0, 1);
        console.log(re);
        console.log(sourceItems);
        console.log(source.index);
        console.log(destination.index, "dest in");

        sourceItems.splice(destination.index, 0, re);
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        });
        // console.log(columns);
        setbal(newBal + re.price);
        return;
      }
    }
    //if  destination id is 1 means those are columns which contains amenities from backend so we will increase the balance
    if (destination.droppableId === "1" || destination.droppableId === "6") {
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log(removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      setbal(bal + removed.price);
      return;
    }
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    console.log(removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });

    setbal(bal - removed.price);
  } else {
    //if source and destination same means we have to just reorder the divs in the same column
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function DragFinal() {
  const [columns, setColumns] = useState(columnsList);
  const [bal, setbal] = useState(initialBal);
  return (
    <>
      {" "}
      <div className={styles.sectiondragdrop}>
        <div className={styles.balance}>
          <div className={styles.bal}>
            <h1 className={styles.balance_h1}>Balance - {bal}</h1>
          </div>
        </div>
        <div className={styles.shelf_container}>
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, columns, setColumns, bal, setbal)
            }
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <h2>{column.name}</h2>
                  <div className={column.style}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                              padding: 4,
                              width: 250,
                              marginRight: 20,
                              minHeight: 500,
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.name} {item.price}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

export default DragFinal;
