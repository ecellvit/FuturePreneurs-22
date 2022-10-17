import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "../../styles/Drag.module.css";
import myContext from "../../store/myContext";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

function DragFinal() {
  const [itemsFromBackend, setItemsFromBackend] = useState([]);
  const [itemsFromBacken, setItemsFromBacken] = useState([]);
  const [bal, setbal] = useState();
  const [imgurl, setimgurl] = useState();
  const { data: session } = useSession();
  const router = useRouter();
  const TECH_URL =
    "https://ik.imagekit.io/nitishr/techpark_8mD6q0Qzf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666017275929";
  const BEACH_URL =
    "https://ik.imagekit.io/nitishr/beach_-Le24RbyJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666017256335";
  const TEMPLE_URL =
    "https://ik.imagekit.io/nitishr/pilgrimage_Wkk_Fm5ac.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666017087306";

  const [isLoading, setIsLoading] = useState(false);
  function Submit() {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundthree/submit/${TEAM_ID}`,
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
        if (data.message == "Round Three Submitted successfully.") {
          router.push("/thankyou");
        }
      });
  }
  useEffect(() => {
    if (session) {
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/roundone/${TEAM_ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          console.log("GetMap", data);
          if (data.mapChoice === 0) {
            setimgurl(TEMPLE_URL);
          } else if (data.mapChoice === 1) {
            setimgurl(BEACH_URL);
          } else {
            setimgurl(TECH_URL);
          }
        });
    }
  }, [session]);

  useEffect(() => {
    if (session) {
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
          console.log(data.roundThreeData);
          setItemsFromBackend(data?.roundThreeData?.slice(0, 15));
          // for (let i = 0; i < itemsFromBackend.length; i++) {
          //   itemsFromBackend[i] = { ...itemsFromBackend[i], isLeft: true };
          // }
          setItemsFromBacken(data?.roundThreeData?.slice(15, 30));
          // for (let i = 0; i < itemsFromBacken.length; i++) {
          //   itemsFromBacken[i] = { ...itemsFromBacken[i], isLeft: false };
          // }

          setIsLoading(false);
        });
    }
  }, [session]);

  // const [columnsList, setcolumnsList] = useState();
  const columnsList = {
    ["1"]: {
      name: "",
      items: itemsFromBackend,
    },
    ["2"]: {
      name: "",
      items: [],
    },
    ["3"]: {
      name: "",
      items: [],
    },
    ["4"]: {
      name: "",
      items: [],
    },
    ["5"]: {
      name: "",
      items: [],
    },
    ["6"]: {
      name: "",
      items: [],
    },
    ["7"]: {
      name: "",
      items: [],
    },
    ["8"]: {
      name: "",
      items: [],
    },
    ["9"]: {
      name: "",
      items: [],
    },
    ["10"]: {
      name: "",
      items: [],
    },

    ["11"]: {
      name: "",
      items: [],
    },
    ["12"]: {
      name: "",

      items: itemsFromBacken,
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
      if (destination.droppableId !== "1" && destination.droppableId !== "12") {
        //if user tries to put more than 1 ittem in the center containers, then swap the elements
        if (destItems.length !== 0) {
          if (source.droppableId == 1 || source.droppableId == 12) {
            console.log("Yeh wala hua 1");
            const [re] = destItems.splice(0, 1);
            console.log(re);
            const [removed] = sourceItems.splice(source.index, 1);
            console.log(removed);
            sourceItems.splice(destination.index, 0, re);
            if (bal + re.price >= removed.price) {
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
                    operation: 1,
                  }),
                }
              )
                .then((data) => data.json())
                .then((data) => {
                  console.log(data);
                  setbal(data.availableBalance);
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
                  )
                    .then((data) => data.json())
                    .then((data) => {
                      console.log(data);
                      setbal(data.availableBalance);
                    });
                });
              console.log(bal);
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

              return;
            } else {
              toast.error(
                `Not Enough Balance Will Be There To Perform This Operation`,
                {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 20,
                }
              );
              return;
            }
          } else {
            // if (
            //   destination.droppableId === "1" ||
            //   destination.droppableId === "12"
            // ) {
            //   if (source.droppableId === "1" || source.droppableId === "12") {
            //   } else {
            //     const [removed] = sourceItems.splice(source.index, 1);
            //     if (removed.isLeft === true) {
            //       console.log(destination);
            //       destination.droppableId = 1;
            //       destination.index = 4;
            //       destColumn = columns[destination.droppableId];
            //       destItems = [...destColumn.items];
            //     } else {
            //       console.log(destination);

            //       destination.droppableId = 12;
            //       destination.index = 5;
            //       destColumn = columns[destination.droppableId];
            //       destItems = [...destColumn.items];
            //     }
            //     // setbal(bal + removed.price);

            //     destItems.splice(destination.index, 0, removed);
            //     console.log(source, destination, " Yeh wala hua 3");

            //     fetch(
            //       `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundthree/${TEAM_ID}`,
            //       {
            //         method: "POST",
            //         headers: {
            //           "Content-Type": "application/json",
            //           Authorization: `Bearer ${session.accessTokenBackend}`,
            //           "Access-Control-Allow-Origin": "*",
            //         },
            //         body: JSON.stringify({
            //           item: removed.item,
            //           operation: 1,
            //         }),
            //       }
            //     )
            //       .then((data) => data.json())
            //       .then((data) => {
            //         setbal(data.availableBalance);
            //       });
            //     setColumns({
            //       ...columns,
            //       [source.droppableId]: {
            //         ...sourceColumn,
            //         items: sourceItems,
            //       },
            //       [destination.droppableId]: {
            //         ...destColumn,
            //         items: destItems,
            //       },
            //     });
            //   }

            //   return;
            // }
            console.log("Yeh hogaya");
            const [re] = destItems.splice(0, 1);
            console.log(re);
            const [removed] = sourceItems.splice(source.index, 1);
            console.log(removed);
            sourceItems.splice(destination.index, 0, re);

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
            return;
          }
        }
      }
      //if  destination id is 1 means those are columns which contains amenities from backend so we will increase the balance
      if (destination.droppableId === "1" || destination.droppableId === "12") {
        if (source.droppableId === "1" || source.droppableId === "12") {
        } else {
          const [removed] = sourceItems.splice(source.index, 1);
          if (removed.isLeft === true) {
            console.log(destination);
            destination.droppableId = 1;
            destination.index = 0;
            destColumn = columns[destination.droppableId];
            destItems = [...destColumn.items];

            // destination.droppableId = 12;
            // destination.index = 0;
            // destColumn = columns[destination.droppableId];
            // destItems = [...destColumn.items];
          } else {
            console.log(destination);

            destination.droppableId = 12;
            destination.index = 0;
            destColumn = columns[destination.droppableId];
            destItems = [...destColumn.items];
          }
          // setbal(bal + removed.price);

          destItems.splice(destination.index, 0, removed);
          console.log(source, destination, " Yeh wala hua 3");

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
          )
            .then((data) => data.json())
            .then((data) => {
              setbal(data.availableBalance);
            });
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
        console.log(source, destination, "Yeh wala hua 4");
        if (source.droppableId == 1 || source.droppableId == 12) {
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
          )
            .then((data) => data.json())
            .then((data) => {
              setbal(data.availableBalance);
            });
        }
      } else {
        toast.error(`Not Enough Balance`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 30,
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
  useEffect(() => {
    setColumns(columnsList);
  }, [itemsFromBackend]);
  return (
    <>
      <div className={styles.drag_drop_container}>
        <div className={styles.balance}>
          <div className={styles.bal}>
            <h1 className={styles.balance_h1}>
              Balance -<span style={{ color: "#CE4DA4" }}> {bal}E</span>
            </h1>
          </div>
        </div>
        <div className={styles.col}>
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, columns, setColumns, bal, setbal)
            }
          >
            {Object.entries(columns)
              .slice(0, 1)
              .map(([columnId, column], index) => {
                return (
                  <>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={styles.colopy}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "#5E5B71",
                              minWidth: "5vw",
                              borderColor: "#CE4DA4",
                            }}
                          >
                            {column.items?.map((item, index) => {
                              // console.log(item, index);
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
                                        className={styles.start}
                                        style={{
                                          userSelect: "none",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.item}{" "}
                                        <span style={{ color: "#CE4DA4" }}>
                                          {item.price}E
                                        </span>
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
                  </>
                );
              })}

            <div
              className={styles.center}
              style={{
                backgroundImage: `linear-gradient(
      180deg,
      rgba(19, 17, 26, 0.91),
      rgba(19, 17, 26, 0.91)
    ),
    url(${imgurl})`,
              }}
            >
              {Object.entries(columns)
                .slice(1, 11)
                .map(([columnId, column], index) => {
                  // console.log(columnId);
                  return (
                    <>
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={`${styles.colopy} ${styles.mid}`}
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                maxWidth: "15vw",
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "#5E5B71",
                              }}
                            >
                              <>
                                {column.items?.map((item, index) => {
                                  // console.log(item, index);
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
                                            className={`${styles.start} `}
                                            style={{
                                              userSelect: "none",
                                              borderRadius: 10,
                                              fontSize: "1rem",
                                              backgroundColor:
                                                snapshot.isDragging
                                                  ? "#263B4A"
                                                  : "#456C86",
                                              color: "white",
                                              maxWidth: "10vw",

                                              ...provided.draggableProps.style,
                                            }}
                                          >
                                            {item.item}{" "}
                                            <span style={{ color: "#CE4DA4" }}>
                                              {item.price}E
                                            </span>
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </>
                            </div>
                          );
                        }}
                      </Droppable>

                      {/* </div> */}
                    </>
                  );
                })}
              <div
                className={`${styles.colopy} ${styles.mid}`}
                style={{ border: "none" }}
              >
                <img
                  src={"finish.png"}
                  width="290px"
                  sizes="(max-width: 479px) 31vw, (max-width: 1919px) 145px, 290px"
                  alt=""
                  className={styles.image}
                  // style={{ display: isLoading ? "none" : "block" }}
                  onClick={() => {
                    Submit();
                  }}
                />
              </div>
            </div>
            {Object.entries(columns)
              .slice(11, 12)
              .map(([columnId, column], index) => {
                return (
                  <>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={styles.colopy}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "#5E5B71",

                              minWidth: "5vw",
                              borderColor: "#CE4DA4",
                            }}
                          >
                            {column.items?.map((item, index) => {
                              // console.log(item, index);
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
                                        className={styles.start}
                                        style={{
                                          userSelect: "none",

                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.item}{" "}
                                        <span style={{ color: "#CE4DA4" }}>
                                          {item.price}E
                                        </span>
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
                  </>
                );
              })}
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

export default DragFinal;
