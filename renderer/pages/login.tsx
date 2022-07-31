import React from "react";
import Head from "next/head";
import { Title, Warning } from "../components/tailwindStyledComponents";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { setAlertWithTimeOut } from "../store/slices/alertDataSlice";
import { useAppDispatch } from "../store/config";
import Router from "next/router";

interface SingInValidationProps {
  email?: string;
  password?: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SingInValidationProps>();

  const onSubmit: SubmitHandler<SingInValidationProps> = async (data) => {
    await setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
          const user = userCredential.user;
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ uid: user.uid, email: user.email, nickname: user.displayName }),
          );
          setAlertWithTimeOut(dispatch, `${user.displayName}님 환영합니다.`);
          Router.push("/main");
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/user-not-found") {
            setAlertWithTimeOut(dispatch, "존재하지 않는 아이디입니다.");
          } else if (errorCode === "auth/wrong-password") {
            setAlertWithTimeOut(dispatch, "비밀번호가 일치하지 않습니다.");
          } else {
            setAlertWithTimeOut(dispatch, `errorCode: ${errorCode}\n${errorMessage}`);
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlertWithTimeOut(dispatch, `errorCode: ${errorCode}\n${errorMessage}`);
      });
  };

  return (
    <React.Fragment>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="p-5 flex flex-col justify-center items-center h-screen">
        <Title>로그인</Title>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            className="input input-bordered w-full"
            {...register("email", { required: true, pattern: /^[A-Z0-9]+@[A-Z0-9]+\.[A-Z]{2,4}$/i })}
          />
          <Warning>
            {errors.email && errors.email.type === "required" && "이메일이 입력되지 않았습니다."}
            {errors.email && errors.email.type === "pattern" && "유효하지 않은 이메일 형식입니다."}
          </Warning>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            className="input input-bordered w-full mt-2"
            {...register("password", { required: true, minLength: 8 })}
          />
          <Warning>
            {errors.password && errors.password.type === "required" && "비밀번호가 입력되지 않았습니다."}
            {errors.password && errors.password.type === "minLength" && "최소 8자 이상의 비밀번호가 필요합니다."}
          </Warning>
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
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
