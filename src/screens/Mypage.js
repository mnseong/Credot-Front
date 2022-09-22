import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import AuthButton from "./../components/auth/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { update, HOST } from "./../redux/store.js";
import "../assets/css/my_page.css";

const Mypage = () => {
  const a = useSelector((state) => state.login);

  const tmpName = useSelector((state) => state.info.name);
  const tmpEmail = useSelector((state) => state.info.email);
  const tmpPhoneNum = useSelector((state) => state.info.phoneNum);
  const tmpBank = useSelector((state) => state.info.bank);
  const tmpAccount = useSelector((state) => state.info.account);
  const dispatch = useDispatch();

  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [subNewPassword, setSubNewPassword] = useState("");

  const handleOnChange1 = (e) => {
    setCurPassword(e.target.value);
  };
  const handleOnChange2 = (e) => {
    setNewPassword(e.target.value);
  };

  const handleOnChange3 = (e) => {
    setSubNewPassword(e.target.value);
  };

  useEffect(() => {
    console.log("현재 비밀번호: " + curPassword);
  }, [curPassword]);

  useEffect(() => {
    console.log("새 비밀번호: " + newPassword);
  }, [newPassword]);

  useEffect(() => {
    console.log("새 비밀번호 확인: " + subNewPassword);
  }, [subNewPassword]);

  if (a === false) {
    console.log("로그인 안됌");
    return <Navigate to="/" />;
  }
  return (
    <main className="container">
      <div className="inner">
        <section className="section-wrap my_page-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title font-eng">MY PAGE</span>
            </div>
            <div className="i-body">
              <div className="m-head myinfo-head">
                <div className="m-head-box">
                  <div className="m-head-profile">
                    <img className="m-head-profile-img" src="../assets/images/subpage-my_page/profile-img.svg" alt="" />
                    <div className="m-head-profile-div">
                      <span className="m-head-name">{tmpName}님</span>
                      <span className="m-head-email font-eng">{tmpEmail}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="m-info">
                <form action="">
                  <div className="m-info-box-wrap">
                    <div className="m-info-info">
                      <span className="info-ct">이메일</span>
                      <span className="info-if font-eng">{tmpEmail}</span>
                    </div>
                    <div className="m-info-info">
                      <span className="info-ct">연락처</span>
                      <span className="info-if font-eng">{tmpPhoneNum}</span>
                    </div>
                    <div className="m-info-info">
                      <span className="info-ct">계좌정보</span>
                      <span className="info-if font-eng">
                        {tmpBank} {tmpAccount}
                      </span>
                    </div>
                  </div>

                  <div className="m-info-box-wrap">
                    <div className="m-info-info">
                      <span className="info-ct">현재 비밀번호</span>
                      <input type="password" placeholder="현재 비밀번호를 입력해주세요" onChange={handleOnChange1} value={curPassword} />
                    </div>
                    <div className="m-info-info">
                      <span className="info-ct">새 비밀번호</span>
                      <input type="password" placeholder="새 비밀번호를 입력해주세요" onChange={handleOnChange2} value={newPassword} />
                    </div>
                    <div className="m-info-info">
                      <span className="info-ct">새 비밀번호 확인</span>
                      <input type="password" placeholder="새 비밀번호를 입력해주세요" onChange={handleOnChange3} value={subNewPassword} />
                    </div>
                  </div>
                </form>
                <div className="btn-wrap">
                  <button
                    className="logout-btn"
                    onClick={async () => {
                      await fetch(HOST + "/logout");
                      dispatch(update());
                      localStorage.clear();
                      alert("로그아웃 되었습니다");
                    }}
                  >
                    로그아웃
                  </button>
                  <button
                    className="change-btn"
                    onClick={() => {
                      if (curPassword === "" || newPassword === "" || subNewPassword === "") {
                        alert("빈 칸을 입력해주세요");
                        return;
                      }
                      if (newPassword !== subNewPassword) {
                        alert("새 비밀번호가 일치하지 않습니다.");
                        return;
                      }
                      fetch(HOST + `/database/updatepw?currentemail=${tmpEmail}&currentpw=${curPassword}&futurepw=${newPassword}`)
                        .then((response) => response.text())
                        .then((response) => {
                          alert(response);
                        });

                      setCurPassword("");
                      setNewPassword("");
                      setSubNewPassword("");
                    }}
                  >
                    개인정보 수정 <img src="../assets/images/icon/btn-arrow.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Mypage;
