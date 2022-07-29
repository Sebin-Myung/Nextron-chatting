import React from "react";
import Head from "next/head";
import { Title, CustomInput } from "../components/tailwindStyledComponents";
import Link from "next/link";

function Login() {
  return (
    <React.Fragment>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen">
        <Title>로그인</Title>
        <CustomInput type="text" placeholder="이메일을 입력하세요" />
        <CustomInput type="password" placeholder="비밀번호를 입력하세요" className="mt-2" />
        <button className="btn btn-primary btn-block mt-2">로그인</button>
        <div className="divider mb-0"></div>
        <p className="text-sm mb-12">
          회원이 아니신가요?
          <Link href="/join">
            <span className="ml-2 text-primary font-semibold cursor-pointer hover:underline hover:text-primary-focus">
              회원가입
            </span>
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
}

export default Login;
