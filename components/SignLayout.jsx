import styled from "../styles/Sign.module.css";
import Image from "next/image";
import imgSrc from "../public/sign.png";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignLayout = () => {
  const regnoRef = useRef("");
  const lnameRef = useRef("");
  const fnameRef = useRef("");

  const mobileNumberRef = useRef("");
  const router = useRouter();
  const { data: session } = useSession();
  const errortoast = () => toast.error("Please fill correct details");
  const [hasError, setError] = useState(true);
  const regName = /^[a-zA-Z]+$/;
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const regtest = /^[1-9][0-9][a-zA-Z]{3}[0-9]{4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      mobileNumberRef.current.value === "" ||
      mobileNumberRef.current.value.length != 10
    ) {
      toast.error("Mobile number must be 10 digits only");
      setError(true);
    } else if (
      !re.test(String(mobileNumberRef.current?.value)) ||
      lnameRef.current?.value === "" ||
      !regName.test(lnameRef.current.value) ||
      !regName.test(fnameRef.current.value) ||
      fnameRef.current.value === ""
    ) {
      errortoast();
    } else if (
      regnoRef.current.value === "" ||
      !regtest.test(regnoRef.current.value)
    ) {
      errortoast();
    } else {
      setError(false);
    }
  };
  useEffect(() => {
    hasError
      ? toast("Please fill all details")
      : fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
          method: "PATCH",
          body: JSON.stringify({
            firstName: fnameRef.current.value,
            lastName: lnameRef.current.value,
            regNo: regnoRef.current.value,
            mobileNumber: mobileNumberRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((data) => data.json())
          .then((data) => router.push("/dashboard"));
  }, [hasError, router]);
  
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

                <label className={styled.label}>First Name *</label>
                <input
                  type="text"
                  className={`${styled.input_signin} ${styled.w_input}`}
                  placeholder=""
                  id="field"
                  ref={fnameRef}
                  required={true}
                />
                <label className={styled.label}>Last Name *</label>
                <input
                  type="text"
                  className={`${styled.input_signin} ${styled.w_input}`}
                  placeholder=""
                  ref={lnameRef}
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
                type="number"
                minLength="10"
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
                className={`${styled.input_signin} ${styled.w_input}`}
                required={true}
              />
              <label className={`${styled.label} ${styled.block}`}>
                * These Fields are compulsory
              </label>
            </div>
            <ToastContainer />
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
