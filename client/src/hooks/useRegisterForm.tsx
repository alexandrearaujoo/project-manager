import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { RegisterRequest, registerSchema } from '@/schemas/registerSchema';
import { fetchWrapper } from '@/utils/fetchWrapper';
import { zodResolver } from '@hookform/resolvers/zod';

export const useRegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterRequest>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterRequest) => {
    const user = await fetchWrapper<{ message: string; status: number }>(
      'users',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ ...data })
      }
    );
    if (user.status !== 201) {
      toast.error(user.message);
      return;
    }

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    if (res?.ok) {
      reset();
      toast.success('Login successful');
      router.push('/dashboard');
    }
    if (res?.error) {
      toast.error(res.error);
    }
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting };
};
