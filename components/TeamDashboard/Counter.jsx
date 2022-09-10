import styled from "../../styles/Dashboard.module.css";
const Counter = () => {
  return (
    <div className={styled.ccounter_full_wrap}>
      <div className={styled.counter}>
        <div className={styled.counter_wrap}>
          <div id="days" className={styled.number}>
            Time Left:
            <br />
          </div>
        </div>
        <div className={styled.counter_wrap}>
          <div id="days" className={styled.number}>
            12
          </div>
          <div className={styled.counter_text}>DAYS</div>
        </div>
        <div className={styled.counter_wrap}>
          <div id="hours" className={styled.number}>
            12
          </div>
          <div className={styled.counter_text}>HOURS</div>
        </div>
        <div className={styled.counter_wrap}>
          <div id="minutes" className={styled.number}>
            12
          </div>
          <div className={styled.counter_text}>MINUTES</div>
        </div>
        <div className={styled.counter_wrap}>
          <div id="seconds" className={styled.number}>
            12
          </div>
          <div className={styled.counter_text}>SECONDS</div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Counter;
