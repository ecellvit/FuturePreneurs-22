import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "../../styles/Drag.module.css";
import myContext from "../../store/myContext";
import uuid from "uuid";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

// for getting user details

// //TODO :- POST REQUEST ON BACKEND ADD AND DELETE.
// //ADD REQUEST IF SOMETHING GETS REMOVED FROM 1ST AND LAST COLUMN AND DELETE REQUEST IF SOMETHING GETS ADDED TO FIRST AND LAST COLUMN
// //NO REQUEST IF REORDERING HAPPENS OR IF WE DRAG AND DROP WITHIN 1ST AND LAST COLUMN OR FROM WITHIN THOSE 6 COLUMNS IN CENTER.
// const itemsFromBackend = [
//   // { id: "3", name: "First task", price: 50, isLeft: true },
//   // { id: uuid(), name: "Second task", price: 100, isLeft: true },
//   // { id: uuid(), name: "Third task", price: 200, isLeft: true },
//   // { id: uuid(), name: "Fourth task", price: 90, isLeft: true },
//   // { id: uuid(), name: "Fifth task", price: 70, isLeft: true },
// ];
// const itemsFromBacken = [
//   // { id: uuid(), name: "5 task", price: 70, isLeft: false },
//   // { id: uuid(), name: "f task", price: 70, isLeft: false },
//   // { id: uuid(), name: "cx task", price: 70, isLeft: false },
//   // { id: uuid(), name: "cxx task", price: 70, isLeft: false },
//   // { id: uuid(), name: "cxx task", price: 70, isLeft: false },
// ];

function DragFinal() {
  const [itemsFromBackend, setItemsFromBackend] = React.useState([]);
  const [itemsFromBacken, setItemsFromBacken] = React.useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    console.log(TEAM_ID);
    setIsLoading(true);
    console.log(session.accessTokenBackend);
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundthree/start/${TEAM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        console.log(data.roundThreeData);
        setItemsFromBackend(data.roundThreeData);

        // data.roundThreeData.map((arr) => {
        //   console.log(arr);
        // });

        setIsLoading(false);
      });

    // .catch((error) => {
    //   console.error(
    //     "There has been a problem with your fetch operation:",
    //     error
    //   );
    // });
  }, [session]);

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
      items: [],
      price: 100,
      style: "shelf_center",
    },
    ["7"]: {
      name: "",
      items: [],
      price: 100,
      style: "shelf_center",
    },
    ["8"]: {
      name: "",
      items: itemsFromBacken,
      price: 100,
      style: "shelf_center",
    },
  };
  const initialBal = 510;
  const onDragEnd = (result, columns, setColumns, bal, setbal) => {
    console.log(columns);

    if (!result.destination) return;
    const { source, destination } = result;
    //if source and destination different
    console.log(source);
    console.log(destination);
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      console.log(destination.droppableId);

      if (destination.droppableId !== "1" && destination.droppableId !== "8") {
        console.log("Meow");
        //if user tries to put more than 1 ittem in the center containers, then swap the elements
        if (destItems.length !== 0) {
          const [removed] = sourceItems.splice(source.index, 1);
          // console.log(removed);
          destItems.splice(destination.index, 0, removed);
          // console.log(destItems);
          // console.log(removed.price);
          // if(removed.price<bal){
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
      if (destination.droppableId === "1" || destination.droppableId === "8") {
        console.log(source);
        if (source.droppableId === "1" || source.droppableId === "8") {
        } else {
          // console.log(source);
          // console.log(source.isLeft);
          const [removed] = sourceItems.splice(source.index, 1);
          console.log(removed);

          if (removed.isLeft === true) {
            console.log(destination);

            destination.droppableId = 1;
            destination.index = 4;
            console.log(destination);
            // sourceColumn = columns[source.droppableId];
            destColumn = columns[destination.droppableId];
            // sourceItems = [...sourceColumn.items];
            destItems = [...destColumn.items];
          } else {
            console.log(destination);

            destination.droppableId = 8;
            destination.index = 5;

            console.log(destination);
            // sourceColumn = columns[source.droppableId];
            destColumn = columns[destination.droppableId];
            // sourceItems = [...sourceColumn.items];
            destItems = [...destColumn.items];
          }
          setbal(bal + removed.price);
          console.log(destItems);
          console.log(destination);
          console.log(destination.index);
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
        }

        return;
      }

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log(removed);
      if (removed.price <= bal) {
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
        toast.error(`Not Enough Balance`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10,
        });
      }
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

  const myCtx = useContext(myContext);

  const TEAM_ID = myCtx.teamId;

  const [columns, setColumns] = useState(columnsList);
  const [bal, setbal] = useState(initialBal);

  const [isLoading, setIsLoading] = useState(false);
  //token id

  return (
    <>
      {" "}
      <div className={styles.sectiondragdrop}>
        <div className={styles.balance}>
          <div className={styles.bal}>
            <h1 className={styles.balance_h1}>Balance - {bal}</h1>
          </div>
        </div>
        <div className={styles.shelf_container} style={{ maxWidth: "90vw" }}>
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
                                : "#5E5B71",
                              padding: 4,
                              width: 200,
                              marginRight: 10,
                              borderRadius: 10,

                              minHeight:
                                columnId === "1" || columnId === "8"
                                  ? "90vh"
                                  : "10vh",
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                  // isDragDisabled={item.price > bal}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          borderRadius: 10,

                                          padding: 16,
                                          margin: "8px 2px 8px 2px",
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
