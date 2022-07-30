import React from "react";
import Head from "next/head";
import { Title, CustomInput } from "../components/tailwindStyledComponents";
import Link from "next/link";
import BackButton from "../components/BackButton";

function Join() {
  return (
    <React.Fragment>
      <Head>
        <title>Join Page</title>
      </Head>
      <BackButton />
      <div className="flex flex-col justify-center items-center h-screen">
        <Title>회원가입</Title>
        <CustomInput type="text" placeholder="이메일을 입력하세요" />
        <CustomInput type="password" placeholder="비밀번호를 입력하세요" className="mt-2" />
        <CustomInput type="password" placeholder="비밀번호를 한 번 더 입력하세요" className="mt-2" />
        <button className="btn btn-primary btn-block mt-2">회원가입</button>
        <div className="divider mb-0"></div>
        <p className="text-sm mb-12">
          회원이신가요?
          <Link href="/login">
            <span className="ml-2 text-primary font-semibold cursor-pointer hover:underline hover:text-primary-focus">
              로그인
            </span>
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
}

export default Join;
