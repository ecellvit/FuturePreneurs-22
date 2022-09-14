import styled from "../styles/Sign.module.css";
import Image from "next/image";
import imgSrc from "../public/sign.png";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const SignLayout = () => {
  const regnoRef = useRef("");
  const mobileNumberRef = useRef("");
  const router = useRouter();

  const [hasError, setError] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(regnoRef.current.value);
    console.log(mobileNumberRef.current.value);
    regnoRef.current.value === "" || mobileNumberRef.current.value === ""
      ? setError(true)
      : setError(false);
  };
  useEffect(() => {
    hasError
      ? console.log("Please fill all the details")
      : router.push("/dashboard");
  }, [hasError]);

  return (
    <div className={styled.sign_in_wrapper}>
      <div className={styled.sign_section}>
        <div className={styled.img_div}>
          <div className={styled.img}>
            <Image src={imgSrc} alt="image" layout="intrinsic" />
          </div>
        </div>
        <div className={`${styled.sign_div} ${styled.w_form}`}>
          <form method="post" className={styled.sign_form}>
            <div className={styled.login_row}>
              <div className={`${styled.input_wrapper} ${styled.name_wrapper}`}>
                <label className={`${styled.label} ${styled.heading}`}>
                  FIll The following details to dive into FuturePreneurs
                </label>

                <label className={styled.label}>Name *</label>
                <input
                  type="text"
                  className={`${styled.input_signin} ${styled.w_input}`}
                  placeholder=""
                  id="field"
                  required={true}
                />
              </div>
            </div>
            <div className="input_wrapper">
              <label className={styled.label}>Mobile Number *</label>
              <input
                className={`${styled.input_signin} ${styled.w_input}`}
                name="mobile"
                type="text"
                ref={mobileNumberRef}
                placeholder=""
                required={true}
              />
            </div>
            <div className="input_wrapper">
              <label className={`${styled.label} ${styled.lable}`}>
                Registration Number *
              </label>
              <input
                type="text"
                name="regno"
                ref={regnoRef}
                //   onChange={e => setName(e.target.value)}

                className={`${styled.input_signin} ${styled.w_input}`}
                required={true}
              />
              <label className={`${styled.label} ${styled.block}`}>
                * These Fields are compulsory
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className={`${styled.sign_btn} ${styled.w_button}`}
            >
              Continue to dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignLayout;
