import React from "react";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { Title, Warning } from "../components/tailwindStyledComponents";
import Link from "next/link";
import BackButton from "../components/BackButton";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import Router from "next/router";
import { useAppDispatch } from "../store/config";
import { setAlertWithTimeOut } from "../store/slices/alertDataSlice";

interface SignUpValidationProps {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  displayName?: string;
}

function Join() {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpValidationProps>();

  const onSubmit: SubmitHandler<SignUpValidationProps> = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: data.displayName,
        }).then(() => {
          setAlertWithTimeOut(dispatch, "회원가입이 완료되었습니다!");
          Router.push("/login");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          setAlertWithTimeOut(dispatch, "이미 존재하는 이메일입니다.");
        } else {
          setAlertWithTimeOut(dispatch, `errorCode: ${errorCode}\n${errorMessage}`);
        }
      });
  };

  return (
    <React.Fragment>
      <Head>
        <title>Join Page</title>
      </Head>
      <BackButton />
      <div className="flex flex-col justify-center items-center h-screen">
        <Title>회원가입</Title>
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
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 한 번 더 입력하세요"
            className="input input-bordered w-full mt-2"
            {...register("passwordConfirm", { required: true, validate: (val: string) => watch("password") === val })}
          />
          <Warning>
            {errors.passwordConfirm && errors.passwordConfirm.type === "required" && "비밀번호가 입력되지 않았습니다."}
            {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && "비밀번호가 일치하지 않습니다."}
          </Warning>
          <input
            type="text"
            name="displayName"
            placeholder="닉네임을 입력하세요"
            className="input input-bordered w-full mt-2"
            {...register("displayName", { required: true })}
          />
          <Warning>
            {errors.displayName && errors.displayName.type === "required" && "닉네임이 입력되지 않았습니다."}
          </Warning>
          <button type="submit" className="btn btn-primary btn-block mt-2">
            회원가입
          </button>
        </form>
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
