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

function DragFinal() {
  const [itemsFromBackend, setItemsFromBackend] = useState([]);
  const [itemsFromBacken, setItemsFromBacken] = useState([]);
  const [bal, setbal] = useState();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
        setbal(data.balance);
        // for (let i = 0; i < data.roundThreeData.length / 2; i++) {
        //   setItemsFromBackend((prevData) => {
        //     return [...prevData, { ...data.roundThreeData[i], isLeft: true }];
        //   });
        // }
        // for (
        //   let i = data.roundThreeData.length / 2 + 1;
        //   i < data.roundThreeData.length;
        //   i++
        // ) {
        //   setItemsFromBacken((prevData) => {
        //     return [...prevData, { ...data.roundThreeData[i], isLeft: false }];
        //   });
        // }
        setItemsFromBackend(data.roundThreeData);

        setIsLoading(false);
      });
  }, [session]);

  // const [columnsList, setcolumnsList] = useState();
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
  const onDragEnd = (result, columns, setColumns, bal, setbal) => {
    if (!result.destination) return;
    const { source, destination } = result;
    //if source and destination different
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      if (destination.droppableId !== "1" && destination.droppableId !== "8") {
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
          setbal(newBal + re.price);
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundthree/${TEAM_ID}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessTokenBackend}`,
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                item: removed.item,
                operation: 1,
              }),
            }
          );
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundthree/${TEAM_ID}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessTokenBackend}`,
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                item: re.item,
                operation: 0,
              }),
            }
          );

          return;
        }
      }
      //if  destination id is 1 means those are columns which contains amenities from backend so we will increase the balance
      if (destination.droppableId === "1" || destination.droppableId === "8") {
        if (source.droppableId === "1" || source.droppableId === "8") {
        } else {
          const [removed] = sourceItems.splice(source.index, 1);
          if (removed.isLeft === true) {
            destination.droppableId = 1;
            destination.index = 4;
            destColumn = columns[destination.droppableId];
            destItems = [...destColumn.items];
          } else {
            destination.droppableId = 8;
            destination.index = 5;
            destColumn = columns[destination.droppableId];
            destItems = [...destColumn.items];
          }
          setbal(bal + removed.price);

          destItems.splice(destination.index, 0, removed);
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundthree/${TEAM_ID}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessTokenBackend}`,
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                item: removed.item,
                operation: 1,
              }),
            }
          );
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
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundthree/${TEAM_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessTokenBackend}`,
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              item: removed.item,
              operation: 0,
            }),
          }
        );
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
  const [columns, setColumns] = useState({});
  // useEffect(() => {
  //   //console.log("WOahhhhhhhhhhhhhhhhhhhhhhhhhh");
  //   setcolumnsList({
  //     ["1"]: {
  //       name: "",
  //       items: itemsFromBackend,

  //       style: "styles.shelf_left",
  //     },
  //     ["2"]: {
  //       name: "",
  //       items: [],

  //       style: "shelf_center",
  //     },
  //     ["3"]: {
  //       name: "",
  //       items: [],
  //       price: 200,
  //       style: "shelf_center",
  //     },
  //     ["4"]: {
  //       name: "",
  //       items: [],
  //       price: 300,
  //       style: "shelf_center",
  //     },
  //     ["5"]: {
  //       name: "",
  //       items: [],
  //       price: 100,
  //       style: "shelf_center",
  //     },
  //     ["6"]: {
  //       name: "",
  //       items: [],
  //       price: 100,
  //       style: "shelf_center",
  //     },
  //     ["7"]: {
  //       name: "",
  //       items: [],
  //       price: 100,
  //       style: "shelf_center",
  //     },
  //     ["8"]: {
  //       name: "",
  //       items: itemsFromBacken,
  //       price: 100,
  //       style: "shelf_center",
  //     },
  //   });
  // }, [itemsFromBackend, itemsFromBacken]);
  useEffect(() => {
    setColumns(columnsList);
  }, [itemsFromBackend]);
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
                  <h2>{column.item}</h2>
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
                                  key={item._id}
                                  draggableId={item._id}
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
                                        {item.item} {item.price}
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
