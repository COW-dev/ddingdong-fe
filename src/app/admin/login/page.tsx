'use client';
import { useEffect } from 'react';

import {
  Flex,
  Title1,
  Input,
  Button,
  Body2,
  Body1,
} from 'ddingdong-design-system';

import { useCookie } from '@/app/_api/useCookie';

import { useLogin } from './_hooks/useLogin';

export default function LoginPage() {
  const {
    id,
    password,
    handleIdChange,
    handlePasswordChange,
    handleIdReset,
    handlePasswordReset,
    handleLogin,
  } = useLogin();

  const { cookie, resetCookie } = useCookie();

  useEffect(() => {
    async function checkRefreshToken() {
      if (await cookie.refresh_token) {
        resetCookie();
      }
    }
    checkRefreshToken();
  }, [cookie.refresh_token, resetCookie]);

  return (
    <Flex
      as="section"
      dir="col"
      alignItems="center"
      justifyContent="start"
      className="w-full"
    >
      <Flex dir="col" className="mt-8 w-full px-2 sm:max-w-md md:px-0">
        <Title1 as="h1" className="py-3" weight="bold">
          띵동 어드민 로그인
        </Title1>
        <Flex
          as="form"
          dir="col"
          gap={6}
          className="mt-12 sm:mt-14"
          onSubmit={(e) => handleLogin(e)}
        >
          <Flex as="label" dir="col" gap={2}>
            <Body2>아이디</Body2>
            <Input
              autoFocus
              type="text"
              value={id}
              onChange={handleIdChange}
              onClickReset={handleIdReset}
            />
          </Flex>
          <Flex as="label" dir="col" gap={2}>
            <Body2>비밀번호</Body2>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onClickReset={handlePasswordReset}
            />
          </Flex>
          <Button
            variant="primary"
            color="blue"
            size="lg"
            type="submit"
            className="mt-6 h-14"
          >
            <Body1 as="span" weight="semibold">
              로그인하기
            </Body1>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
