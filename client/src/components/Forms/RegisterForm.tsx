'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Lottie from 'react-lottie';

import Button from '../Button';
import Input from '../Input';

import { useRegisterForm } from '@/components/hooks/useRegisterForm';
import SignUpAnimation from '@/lotties/38435-register.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: SignUpAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const RegisterForm = () => {
  const { errors, handleSubmit, isSubmitting, onSubmit, register } =
    useRegisterForm();
  return (
    <section className="flex items-center flex-row-reverse gap-x-20 transition">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-10 animate-fade-in md:animate-slide-left bg-white h-screen w-full min-w-[309px] md:w-2/5 flex flex-col items-center justify-center gap-8 transition"
      >
        <h2 className="text-black font-bold text-center text-3xl">Sign Up</h2>
        <Input
          label="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Password"
          icon
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" disabled={isSubmitting} bgWhite>
          Register
        </Button>
        <Button
          onClick={() => signIn('google')}
          type="button"
          disabled
          title="Coming soon..."
          bgWhite
        >
          <FcGoogle size={24} /> Continue with Google
        </Button>
        <Button
          onClick={() => signIn('github')}
          type="button"
          disabled
          title="Coming soon..."
          bgWhite
        >
          <AiFillGithub size={24} /> Continue with GitHub
        </Button>
        <p className="text-black text-center font-semibold">
          Don&apos;t have an account ?{' '}
          <Link
            href="/login"
            className="bg-clip-text text-transparent bg-button-gradient transition-colors duration-200 hover:opacity-80"
          >
            Login
          </Link>
        </p>
      </form>
      <div className="hidden md:block md:w-[60%]">
        <Lottie
          options={defaultOptions}
          isClickToPauseDisabled
          style={{ cursor: 'default', width: '60%' }}
        />
      </div>
    </section>
  );
};

export default RegisterForm;
